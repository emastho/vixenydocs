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
		padding: 0.5rem 1.2rem;
		border-radius: 6px;
		/* border: 2px solid #2f2f2f; */
		background: #2b2b2b;
		transition: 200ms all ease-out 50ms;
		color: white;
	}

	.details .summary {
		list-style: none;
		position: relative;
	}

	.details .summary:hover {
		background-color: #353535;
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
		color: #494949;
	}

	.navItems {
		padding-top: 8px;
	}
</style>
