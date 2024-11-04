<script>
	import Collapsible from './Collapsible.svelte';
	import { routes, categories } from '$lib/routes';
</script>

<nav>
	<ul>
		{#each categories as category}
			<li>
				<Collapsible title={category.name}>
					{#each routes.filter((r) => r.categoryId == category.id) as route}
						<a href={route.href} class="navCollapsible" class:navActive={false}>{route.name}</a>
					{/each}
				</Collapsible>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		width: 220px;
	}

	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
		line-height: normal;
	}

	li {
	}
</style>
