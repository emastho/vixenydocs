<script lang="ts">
	import '../app.css';
	import '../theme.css';
	import '../nprogress.css';
	import Logo from '$lib/assets/vixenylogo-2.png';
	import Iconie from '$lib/components/Iconie.svelte';
	import Input from '$lib/components/Input.svelte';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import Navigation from '$lib/components/Navigation.svelte';
	import MobileMenu from '$lib/components/MobileMenu.svelte';
	import { accordion, searchModal, theme } from '$lib/stores/main';
	import nprogress from 'nprogress';
	import Links from '$lib/components/Links.svelte';
	import SearchModal from '$lib/components/SearchModal.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import loadCopy from '$lib/utils/copyButton';

	let sidebarButton: HTMLElement;

	beforeNavigate(() => {
		nprogress.start();
	});

	afterNavigate(() => {
		nprogress.done();
		loadCopy();
	});

	let sidebar = false;
	let asideVisible = true; // Track aside visibility

	const showSidebar = () => {
		sidebar = !sidebar;
	};

	const closeSidebar = () => {
		sidebar = false;
	};

	const hideBar = () => {
		asideVisible = !asideVisible;
	};

	let keydownHandler: (e: KeyboardEvent) => void;

	if ($page.url.pathname === '/') {
		asideVisible = !asideVisible;
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			keydownHandler = (e: KeyboardEvent) => {
				// Shift + S focuses the search bar
				if (e.shiftKey && (e.key === 'S' || e.key === 's')) {
					e.preventDefault();
					e.stopPropagation();
					const searchBar = document.getElementById('SEARCH_BAR') as HTMLInputElement;
					searchBar?.focus();
				}

				// Shift + A focuses the first element with .toc-link.toc-link-h1
				if (e.shiftKey && (e.key === 'A' || e.key === 'a')) {
					const firstTocLink = document.querySelector('.toc-link.toc-link-h1') as HTMLAnchorElement;
					if (firstTocLink) {
						searchModal.set(false);
						firstTocLink.focus();
					} else {
						console.warn('No element with class "toc-link toc-link-h1" found.');
					}
				}

				// Shift + F toggles the aside
				if (e.shiftKey && (e.key === 'Z' || e.key === 'z')) {
					asideVisible = !asideVisible;
				}

				// Shift + L toggles the theme between light and dark
				if (e.shiftKey && (e.key === 'L' || e.key === 'l')) {
					const currentTheme = document.documentElement.dataset.theme;
					if (currentTheme === 'light') {
						// Switch to dark
						document.documentElement.removeAttribute('data-theme');
					} else {
						// Switch to light
						document.documentElement.dataset.theme = 'light';
					}
				}
			};

			window.addEventListener('keydown', keydownHandler);
		}

		//@ts-ignore
		if (isLightTheme()) {
			theme.set(true);
		}

		loadCopy();
	});

	onDestroy(() => {
		if (typeof window !== 'undefined' && keydownHandler) {
			window.removeEventListener('keydown', keydownHandler);
		}
	});
</script>

<main>
	{#if sidebar}
		<MobileMenu {closeSidebar} buttonElement={sidebarButton} />
	{/if}

	<header>
		<div class="header-container">
			<a href="/">
				<img class="logo" fetchpriority="high" src={Logo} alt="Logo" height="50" />
			</a>
		</div>
	</header>
	<div class="container">
		{#if asideVisible}
			<aside style="padding-bottom: 80px;">
				<div class="logoArea">
					<a href="/" on:click={() => accordion.set(1)}>
						<img src={Logo} alt="Logo" height="90" />
					</a>
				</div>
				<Navigation />
			</aside>
		{/if}
		<!-- Apply conditional padding based on asideVisible -->
		<section style={`padding-left: ${asideVisible ? '270px' : '0'}`}>
			<div class="taskbar">
				<div class="line">
					<Input placeholder="Shift + S" id="SEARCH_BAR" />
					<Links />
					<!-- <SearchModal /> -->
					<div class="mobile-menu-button">
						<button on:click={showSidebar} bind:this={sidebarButton}>
							<Iconie which="menu" />
						</button>
					</div>
				</div>
			</div>
			<div class="contentContainer">
				<div class="content">
					<slot />
				</div>
			</div>
		</section>
	</div>
</main>

<style>
	aside {
		flex-shrink: 0;
		width: 270px;
		background-color: var(--bg);
		border-right: 2px solid var(--border);
		padding: 3rem 0;
		display: flex;
		flex-direction: column;
		position: fixed;
		height: 100%;
		overflow-y: scroll;
		scrollbar-width: none;
		scrollbar-color: var(--fronter) var(--border);
	}

	.logoArea {
		display: flex;
		justify-content: center;
		flex-shrink: 0;
		padding-bottom: 64px;
	}

	.contentContainer {
		display: flex;
		justify-content: center;
	}

	.content {
		width: 850px;
		max-width: 850px;
	}

	.mobile-menu-button {
		display: none;
	}

	.line {
		width: 850px;
		max-width: 850px;
		display: flex;
		padding-block: 12px;
		justify-content: space-between;
		align-items: center;
	}

	.taskbar {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-bottom: 48px;
		position: sticky;
		top: 0;
		background-color: var(--bg-opacity);
		backdrop-filter: blur(8px);
		border-bottom: 2px solid var(--border);
		z-index: 2;
	}

	header {
		width: 100%;
		display: none;
		border-bottom: 2px solid var(--border);
		padding-block: 16px;
		align-items: center;
	}

	.header-container {
		max-width: 850px;
		margin: 0 auto;
	}

	.mobile-menu-button button {
		background: var(--bg);
		border: none;
		padding: 0.4rem;
		aspect-ratio: 1/1;
		border-radius: 4px;
		transition: 100ms all ease-out;
	}

	.mobile-menu-button button:focus-visible {
		outline: 2px solid #6f5c9b;
	}

	.mobile-menu-button:active {
		transform: scale(0.9);
	}

	:global(section ul) {
		list-style-type: decimal;
		padding-left: calc(17px + 32px);
	}

	:global(section ul p) {
		padding-block: 4px;
	}

	@media (width < 1200px) {
		aside {
			display: none;
		}

		header {
			display: block;
		}

		.mobile-menu-button {
			display: block;
		}

		section {
			height: auto;
			padding-inline: 0 !important;
		}

		main {
			padding-top: 0;
		}
	}

	@media (width < 910px) {
		header,
		.line,
		.contentContainer {
			padding-inline: 32px;
		}
	}
	:global(.overflow) {
		height: 100%;
		overflow-y: hidden;
	}
</style>
