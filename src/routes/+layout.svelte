<script lang="ts">
	import '../app.css';
	import '../theme.css';
	import Logo from '$lib/assets/vixenylogo-min.png';
	import Iconie from '$lib/components/Iconie.svelte';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import ProgressBar from 'svelte-progress-bar';
	import Navigation from '$lib/components/Navigation.svelte';
	import MobileMenu from '$lib/components/MobileMenu.svelte';
	let progress: HTMLElement;
	let sidebarButton: HTMLElement;

	beforeNavigate(() => {
		progress.start();
	});

	afterNavigate(() => {
		progress.complete();
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
<ProgressBar bind:this={progress} color="#6F5C9B" minimum="0.40" intervalTime="600" />
<main>
	{#if sidebar}
		<MobileMenu {closeSidebar} buttonElement={sidebarButton} />
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
		<aside>
			<div class="logoArea">
				<a href="/">
					<img src={Logo} alt="Logo" height="45" />
				</a>
			</div>
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
	}

	.logoArea {
		display: flex;
		justify-content: center;
		flex-shrink: 0;
	}

	footer {
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
		max-width: 120ch;
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
		}

		:global(section ul) {
			list-style-type: decimal;
			padding-left: 26px;
		}

		:global(section ul li::marker) {
			font-family: 'monospace';
		}
	}
</style>
