<script lang="ts">
	import '../app.css';
	import '../theme.css';
	import '../nprogress.css';
	import Logo from '$lib/assets/vixenylogo-min.png';
	import Iconie from '$lib/components/Iconie.svelte';
	import Input from '$lib/components/Input.svelte';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import Navigation from '$lib/components/Navigation.svelte';
	import MobileMenu from '$lib/components/MobileMenu.svelte';
	import SearchModal from '$lib/components/SearchModal.svelte';
	import { accordion, searchModal } from '$lib/stores/main';
	import nprogress from 'nprogress';
	import { browser } from '$app/environment';
	import Links from '$lib/components/Links.svelte';

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
			<Navigation />
		</aside>
		<section>
			<div class="contentTop">
				<div class="line">
					<Input placeholder="Search" />
					<Links />
				</div>
			</div>
			<div class="content">
				<slot />
			</div>
		</section>
	</div>
</main>

<style>
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

	.logoArea {
		display: flex;
		justify-content: center;
		flex-shrink: 0;
		padding-bottom: 64px;
	}

	section {
		flex: 1;
		padding: 0 0 24px 0;
		color: var(--text);
		/* height: 100vh; */
		padding-left: calc(270px);
		/* overflow-y: scroll; */
		/* max-width: 120ch;*/
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.content {
		width: 70%;
	}

	.line {
		width: 70%;
		display: flex;
		padding-block: 16px;
		justify-content: space-between;
		align-items: center;
	}

	.contentTop {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		border-bottom: 2px solid var(--side);
		margin-bottom: 48px;
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
