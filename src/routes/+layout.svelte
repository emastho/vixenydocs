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
	import { accordion } from '$lib/stores/main';
	import nprogress from 'nprogress';
	import Links from '$lib/components/Links.svelte';
	import SearchModal from '$lib/components/SearchModal.svelte';

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
</script>

<svelte:head>
	<link rel="preload" as="image" href={Logo} />
</svelte:head>
<main style="">
	{#if sidebar}
		<MobileMenu {closeSidebar} buttonElement={sidebarButton} />
	{/if}

	<header>
		<div class="header-container">
			<div>
				<a href="/">
					<img class="logo" src={Logo} alt="Logo" height="50" />
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
		<aside style="padding-bottom: 80px;">
			<div class="logoArea">
				<a href="/" on:click={() => accordion.set(1)}>
					<img src={Logo} alt="Logo" height="90" />
				</a>
			</div>
			<Navigation />
		</aside>
		<section>
			<div class="contentTop">
				<div class="line">
					<Input placeholder="Search" />
					<Links />
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
		/* height: 100vh; */
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

	section {
		padding: 0 0 128px 0;
		color: var(--text);
		/* height: 100vh; */
		padding-left: calc(270px);
		/* overflow-y: scroll; */
		/* max-width: 120ch;*/
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
		/* background: var(--side); */
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

	/* :global(section ul li::marker) {
		font-family: 'monospace';
	} */

	@media (width < 1100px) {
		aside {
			display: none;
		}

		header {
			display: block;
		}

		section {
			height: auto;
			padding-inline: 0;
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
