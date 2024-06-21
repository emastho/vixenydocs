<script lang="ts">
	import NavItem from './NavItem.svelte';
	import { routes, categories } from '$lib/routes';
</script>

{#each categories as category}
	<div class="details">
		<div class="summary">
			{category.name}
			<span>
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
			</span>
		</div>
		<ul class="navItems">
			{#each routes.filter((item) => item.categoryId == category.id) as route}
				<NavItem name={route.name} href={route.href} target={route.newTab} />
			{/each}
		</ul>
	</div>
{/each}

<style>
	.details .summary {
		user-select: none;
		padding: 14px 32px;
		/* border: 2px solid #2f2f2f; */
		background: var(--front);
		transition: 200ms all ease-out 50ms;
		color: var(--text);
	}

	.details .summary {
		list-style: none;
		position: relative;
	}

	.details .summary:hover {
		background-color: var(--fronter);
	}

	.details .summary span {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 1.2rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	span .opened {
		color: var(--text);
	}

	.navItems {
		padding-top: 8px;
	}
</style>
