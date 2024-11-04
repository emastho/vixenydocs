<script lang="ts">
	import '../app.css';
	import '../theme.css';
	import '../nprogress.css';
	import Input from '$lib/components/Input.svelte';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import Navigation from '$lib/components/Navigation.svelte';
	import MobileMenu from '$lib/components/MobileMenu.svelte';
	import { accordion, sidebar } from '$lib/stores/main';
	import nprogress from 'nprogress';
	import Links from '$lib/components/Links.svelte';
	import SearchModal from '$lib/components/SearchModal.svelte';
	import Aside from '$lib/components/Aside.svelte';

	let sidebarButton: HTMLElement;

	beforeNavigate(() => {
		nprogress.start();
	});

	afterNavigate(() => {
		nprogress.done();
	});
</script>

<div class="outside">
	{#if $sidebar}
		<MobileMenu />
	{/if}

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
				<aside>
					<Aside />
				</aside>
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

	aside {
		display: flex;
		justify-content: center;
		padding-top: 8px;
	}

	main {
		width: 800px;
		max-width: 800px;
		display: flex;
		justify-content: center;
		flex-shrink: 0;
	}

	.content {
		/* width: 800px; */
		width: 100%;
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
			padding-inline: 16px;
		}

		.content {
			width: calc(100% - 40px);
		}

		:global(.logo) {
			height: 50px;
		}
	}

	:global(.overflow) {
		height: 100%;
		overflow-y: hidden;
	}
</style>
