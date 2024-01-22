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
	let sidebarButton: HTMLElement;

	beforeNavigate(() => {
		nprogress.start();
	});

	afterNavigate(() => {
		nprogress.done();
		// if ($page.url.pathname != '/') {
		// 	const currentCategory = routes.filter((route) => route.href == $page.url.pathname);
		// 	if (currentCategory.length > 0) {
		// 		accordion.set(currentCategory[0].categoryId);
		// 	}
		// }
	});

	let sidebar = false;

	const showSidebar = () => {
		sidebar = !sidebar;
	};

	const closeSidebar = () => {
		sidebar = false;
	};

	const maybeOpenSearch = (e) => {
		if (e.key == '/') {
			e.preventDefault();
			searchModal.update((prev) => !prev);
		} else if (e.key == 'Escape' && $searchModal == true) {
			searchModal.set(false);
		}
	};

	const openSearch = (e) => {
		e.preventDefault();
		searchModal.set(true);
	};

	$: if ($searchModal && browser) {
		document.body.classList.add('overflow');
	} else if (!$searchModal && browser) {
		document.body.classList.remove('overflow');
	}
</script>

<svelte:head>
	<link rel="preload" as="image" href={Logo} />
</svelte:head>
<svelte:body on:keydown={maybeOpenSearch} />
<div class="warning" style="margin-top: 0; position: fixed; z-index: 10;">
	<strong>Warning:</strong> Docs are currently under development, join us at
	<a href="https://discord.gg/PMXbQtDD3m">discord</a>.
</div>

<main style="padding-top: 40px;">
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
			<!-- <button class="search" on:click={openSearch}> -->
			<!-- 	<div> -->
			<!-- 		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" -->
			<!-- 			><path -->
			<!-- 				fill="currentColor" -->
			<!-- 				d="m18.031 16.617l4.283 4.282l-1.415 1.415l-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9s9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617Zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.867-3.133-7-7-7s-7 3.133-7 7s3.133 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15Z" -->
			<!-- 			/></svg -->
			<!-- 		> -->
			<!-- 		Search -->
			<!-- 		<span>/</span> -->
			<!-- 	</div> -->
			<!-- </button> -->
			<div class="alternative" />
			<Navigation />
			<footer>
				<a href="https://github.com/mimiMonads/vixeny" target="_blank">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
						/></svg
					>
				</a>
				<a href="https://github.com/emastho/vixenydocs" target="_blank">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="m4.929 21.482l5.846-5.846a1.999 1.999 0 0 0 1.932-3.346a2 2 0 0 0-3.346 1.932l-5.846 5.846l-1.06-1.06c2.828-3.3 3.888-6.954 5.302-13.082l6.364-.707l5.657 5.657l-.707 6.363c-6.128 1.415-9.782 2.475-13.081 5.304l-1.061-1.06ZM16.596 2.037l6.347 6.346a.5.5 0 0 1-.277.848l-1.474.23l-5.656-5.657l.212-1.485a.5.5 0 0 1 .848-.282Z"
						/></svg
					>
				</a>
			</footer>
		</aside>
		<section>
			<slot />
		</section>
	</div>
</main>

<style>
	.alternative {
		padding: 3rem;
	}

	aside {
		flex-shrink: 0;
		width: 270px;
		/* height: 100vh; */
		background-color: #252525;
		padding: 3rem 1.6rem 2rem 1.6rem;
		display: flex;
		flex-direction: column;
		position: fixed;
		height: 100%;
		overflow-y: scroll;
	}

	.search {
		padding-block: 32px;
		font-size: 16px;
		color: #464646;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		user-select: none;
		display: flex;
		column-gap: 16px;
		background: none;
		outline: none;
		border: none;
	}

	.search div {
		border: 2px solid #2b2b2b;
		padding: 8px;
		width: 100%;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.search span {
		background: #2b2b2b;
		border-radius: 3px;
		padding-inline: 8px;
		padding-block: 2px;
		font-size: 12px;
	}

	.logoArea {
		display: flex;
		justify-content: center;
		flex-shrink: 0;
	}

	footer {
		margin-top: 64px;
		text-align: center;
		color: #464646;
	}

	footer a {
		color: inherit;
	}

	section {
		flex: 1;
		padding: 3rem 4rem;
		color: white;
		/* height: 100vh; */
		padding-left: calc(270px + 4rem);
		/* overflow-y: scroll; */
		/*max-width: 120ch;*/
		max-width: 85%;
	}

	header {
		width: 100%;
		display: none;
		background: #252525;
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
		background: #383838;
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
			padding-inline: 2rem;
			max-width: 100%;
		}
	}

	:global(.overflow) {
		height: 100%;
		overflow-y: hidden;
	}
</style>
