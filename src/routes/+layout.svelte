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

<div class="outside">
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
		<section>
			<div class="contentTop">
				<div class="line">
					<Input placeholder="Search" />
					<Links />
					<SearchModal />
				</div>
			</div>
			<div class="cols">
				<aside>meow</aside>
				<main>
					<div class="content">
						<slot />
					</div>
				</main>
				<div class="empty" />
			</div>
		</section>
	</div>
</div>

<style>
	section {
		padding: 0 0 128px 0;
		color: var(--text);
	}

	.cols {
		width: 100%;
		display: flex;
	}

	aside,
	.empty {
		flex: 1;
	}

	main {
		width: 800px;
		display: flex;
		justify-content: center;
		flex-shrink: 0;
	}

	.content {
		/* width: 800px; */
	}

	.line {
		width: 800px;
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
		margin-bottom: 32px;
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

		.outside {
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
