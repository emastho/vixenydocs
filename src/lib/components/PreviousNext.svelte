<script lang="ts">
	import { routes } from '$lib/routes';
	import { page } from '$app/stores';
	import { accordion } from '$lib/stores/main';

	export let previous: string = '';
	export let next: string = '';
	export let nameNext: string = '';

	const maybeChangeCategory = (beforeOrAfter: number) => {
		const currentRouteObject = routes //
			.filter((route) => route.href == $page.url.pathname);

		if (currentRouteObject.length < 1) {
			// if route wasnt found then just dont touch this, because uhh
			return;
		} else {
			const indexOfCurrentRoute = routes.indexOf(currentRouteObject[0]);

			const RouteObject =
				routes[beforeOrAfter == 1 ? indexOfCurrentRoute - 1 : indexOfCurrentRoute + 1];
			accordion.set(RouteObject.categoryId);
		}
	};
</script>

<div>
	{#if previous != ''}
		<a href={previous} on:click={() => maybeChangeCategory(1)}>Previous</a>
	{/if}
	{#if next != ''}
		<a href={next} on:click={() => maybeChangeCategory(2)}>{nameNext === '' ? 'Next' : nameNext}</a>
	{/if}
</div>

<style>
	div {
		margin-top: 120px;
		display: flex;
		column-gap: 8px;
	}

	a {
		width: 100%;
		border: 2px solid #2f2f2f;
		padding: 1.6rem;
		border-radius: 8px;
	}

	a:hover {
		background: #6f5c9b;
		border-color: #6f5c9b;
	}
</style>
