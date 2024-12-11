<script lang="ts">
	import NavItem from './NavItem.svelte';
	import { routes, categories } from '$lib/routes';
</script>

{#each categories as category}
	<div class="details">
		<div class="summary">
			{category.name}
			<!-- <span>
				<svg
					class="opened"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 48 48"
					><path
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="4"
						d="M36 18L24 30L12 18"
					/></svg
				>
			</span> -->
		</div>
		<ul class="navItems">
			{#each routes.filter((item) => item.categoryId == category.id) as route}
				<NavItem name={route.name} href={route.href} target={route.newTab} />
			{/each}
		</ul>
	</div>
{/each}

<style>
	:global(.details a) {
		font-size: 14px;
	}
	.details .summary {
		font-size: 14px;
		user-select: none;
		padding: 8px 32px;
		color: var(--text-dimmed);
	}

	.details .summary {
		list-style: none;
		position: relative;
	}

	.details .summary span {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 32px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	span .opened {
		color: var(--text);
	}

	.navItems {
		/* padding-top: 8px; */
	}
</style>
