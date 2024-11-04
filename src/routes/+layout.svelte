<script lang="ts">
	import '../app.css';
	import '../theme.css';
	import '../nprogress.css';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import MobileMenu from '$lib/components/MobileMenu.svelte';
	import { sidebar } from '$lib/stores/main';
	import nprogress from 'nprogress';
	import Aside from '$lib/components/Aside.svelte';
	import ButtonToTop from '$lib/components/ButtonToTop.svelte';

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
	<ButtonToTop />

	<div class="container">
		<section>
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
	.cols {
		max-width: 1920px;
		margin-inline: auto;
	}

	section {
		padding: 0 0 128px 0;
		color: var(--text);
		padding-top: 80px;
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
		max-width: 100%;
		display: flex;
		justify-content: center;
		flex-shrink: 0;
	}

	.content {
		/* width: 800px; */
		width: 100%;
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

		section {
			height: auto;
			padding-inline: 0;
		}

		.outside {
			padding-top: 0;
		}

		.content {
			width: calc(100% - 40px);
		}
	}

	:global(.overflow) {
		height: 100%;
		overflow-y: hidden;
	}
</style>
