<script lang="ts">
	import '../app.css';
	import '../theme.css';
	import '../nprogress.css';
	import Logo from '$lib/assets/vixenylogo-min.png';
	import Iconie from '$lib/components/Iconie.svelte';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import Navigation from '$lib/components/Navigation.svelte';
	import MobileMenu from '$lib/components/MobileMenu.svelte';
	import SearchModal from '$lib/components/SearchModal.svelte';
	import { accordion, searchModal } from '$lib/stores/main';
	import nprogress from 'nprogress';
	import { browser } from '$app/environment';
	import Links from '$lib/components/Links.svelte';
	import { page } from '$app/stores';

	let sidebarButton: HTMLElement;

	beforeNavigate(() => {
		nprogress.start();
	});

	afterNavigate(() => {
		nprogress.done();
	});

	let sidebar = false;

	const showSidebar = () => {
		sidebar = !sidebar;
	};

	const closeSidebar = () => {
		sidebar = false;
	};

	const maybeOpenSearch = (e: KeyboardEvent) => {
		if (e.key == '/') {
			e.preventDefault();
			searchModal.update((prev) => !prev);
		} else if (e.key == 'Escape' && $searchModal == true) {
			searchModal.set(false);
		}
	};

	const openSearch = (e: Event) => {
		e.preventDefault();
		searchModal.set(true);
	};

	$: if (($searchModal || sidebar) && browser) {
		document.body.classList.add('overflow');
	} else if ((!$searchModal || !sidebar) && browser) {
		document.body.classList.remove('overflow');
	}
</script>

<svelte:head>
	<link rel="preload" as="image" href={Logo} />
</svelte:head>
<svelte:body on:keydown={maybeOpenSearch} />

<main style="">
	{#if sidebar}
		<MobileMenu {closeSidebar} buttonElement={sidebarButton} />
	{/if}
	{#if $searchModal}
		<SearchModal />
	{/if}
	<header>
		<div />
		<div>
			<a href="/">
				<img src={Logo} alt="Logo" height="45" />
			</a>
		</div>
		<div>
			<button on:click={showSidebar} bind:this={sidebarButton}>
				<Iconie which="menu" />
			</button>
		</div>
	</header>
	<div class="container">
		<aside style="padding-bottom: 80px;">
			<div class="logoArea">
				<a href="/" on:click={() => accordion.set(1)}>
					<img src={Logo} alt="Logo" height="45" />
				</a>
			</div>

			<button class="search" on:click={openSearch}>
				<div>
					<span>
						<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="m18.031 16.617l4.283 4.282l-1.415 1.415l-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9s9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617Zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.867-3.133-7-7-7s-7 3.133-7 7s3.133 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15Z"
							/></svg
						></span
					>
					Search
					<span><div class="block">/</div></span>
				</div>
			</button>

			<!-- <div class="alternative" /> -->
			<Navigation />
			<footer>
				<Links />
			</footer>
		</aside>
		<section>
			<slot />
			{#if $page.url.pathname != '/'}
				Hey
			{/if}
		</section>
	</div>
</main>

<style>
	/* .alternative {
		padding: 3rem;
	} */

	aside {
		flex-shrink: 0;
		width: 270px;
		/* height: 100vh; */
		background-color: var(--side);
		padding: 3rem 1.6rem 2rem 1.6rem;
		display: flex;
		flex-direction: column;
		position: fixed;
		height: 100%;
		overflow-y: scroll;
	}

	.search {
		padding-block: 48px;
		padding-inline: 0;
		font-size: 16px;
		color: var(--text);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		user-select: none;
		background: none;
		outline: none;
		border: none;
	}

	.search div:not(.block) {
		padding: 8px 16px;
		width: 100%;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: var(--closer);
	}

	.search div:hover:not(.block) {
		background: var(--closest);
	}

	.search span {
		background: var(--closest);
		border-radius: 4px;
		padding: 8px;
		font-size: 12px;
		display: flex;
		align-items: center;
	}

	.block {
		font-size: 12px;
		line-height: 12px;
	}

	.search span > * {
		width: 12px;
		height: 12px;
	}

	.logoArea {
		display: flex;
		justify-content: center;
		flex-shrink: 0;
	}

	footer {
		margin-top: 64px;
		text-align: center;
	}

	section {
		flex: 1;
		padding: 3rem 4rem;
		color: var(--text);
		/* height: 100vh; */
		padding-left: calc(270px + 4rem);
		/* overflow-y: scroll; */
		/* max-width: 120ch;*/
		max-width: 85%;
	}

	header {
		width: 100%;
		display: none;
		background: var(--side);
		padding: 1.5rem;
		align-items: center;
	}

	header div:nth-child(2) {
		flex-shrink: 0;
		text-align: center;
	}

	header > * {
		flex: 1;
	}

	header div:last-child {
		text-align: right;
	}

	header button {
		background: var(--side);
		border: none;
		padding: 0.4rem;
		aspect-ratio: 1/1;
		border-radius: 4px;
	}

	header button:focus-visible {
		outline: 2px solid #6f5c9b;
	}

	:global(section ul) {
		list-style-type: decimal;
		padding-left: 30px;
	}

	:global(section ul li::marker) {
		font-family: 'monospace';
	}

	@media (width < 1100px) {
		aside {
			display: none;
		}

		header {
			display: flex;
		}

		section {
			height: auto;
			padding-inline: 24px;
			max-width: 100%;
		}

		main {
			padding-top: 0;
		}
	}

	:global(.overflow) {
		height: 100%;
		overflow-y: hidden;
	}
</style>
