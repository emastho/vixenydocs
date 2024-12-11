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

	let sidebarButton: HTMLElement;

	beforeNavigate(() => {
		nprogress.start();
	});

	afterNavigate(() => {
		nprogress.done();
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
			<div>
				<a href="/">
					<img class="logo" fetchpriority="high" src={Logo} alt="Logo" height="50" />
				</a>
			</div>
			<div>
				<button on:click={showSidebar} bind:this={sidebarButton}>
					<Iconie which="menu" />
				</button>
			</div>
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
			<div class="contentTop">
				<div class="line">
					<Input placeholder="Shift + S" id="SEARCH_BAR" />
					{#if asideVisible} 
					<Links /> 
					{:else}
					<span  class="clickable" on:click={hideBar} >DOCS</span>
					{/if}
					<SearchModal />
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
		border-right: 2px solid var(--side);
		padding: 3rem 0;
		display: flex;
		flex-direction: column;
		position: fixed;
		height: 100%;
		overflow-y: scroll;
		scrollbar-width: thin;
		scrollbar-color: var(--fronter) var(--side);
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
		width: 60%;
	}

	.line {
		width: 60%;
		display: flex;
		padding-block: 12px;
		justify-content: space-between;
		align-items: center;
	}

	.contentTop {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-bottom: 48px;
		position: sticky;
		top: 0;
		background-color: var(--bg-opacity);
		backdrop-filter: blur(8px);
		border-bottom: 2px solid var(--side);
		z-index: 1;
	}

	header {
		width: 100%;
		display: none;
		border-bottom: 2px solid var(--side);
		padding-block: 16px;
		align-items: center;
	}

	.header-container {
		width: 80%;
		margin: 0 auto;
		display: flex;
	}

	.header-container div:nth-child(2) {
		flex-shrink: 0;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: end;
	}

	.header-container > * {
		flex: 1;
	}

	.header-container div:last-child {
		text-align: right;
	}

	header button {
		background: var(--bg);
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
		padding-left: calc(17px + 32px);
	}

	:global(section ul p) {
		padding-block: 4px;
	}

	@media (width < 1100px) {
		aside {
			display: none;
		}

		header {
			display: block;
		}

		section {
			height: auto;
			padding-inline: 0 !important;
			max-width: 100%;
		}

		main {
			padding-top: 0;
		}

		.line {
			width: 100%;
		}

		.content {
			width: calc(100% - 40px);
		}

		.logo {
			height: 50px;
		}
	}

	@media (width < 1500px) {
		.content {
			width: 80%;
		}
		.line {
			width: 80%;
		}
	}

	:global(.overflow) {
		height: 100%;
		overflow-y: hidden;
	}
</style>
