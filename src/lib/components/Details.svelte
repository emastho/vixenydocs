<script lang="ts">
	import NavItem from './NavItem.svelte';
	import { routes, categories } from '$lib/routes';
	import { accordion } from '$lib/stores/main';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const toggleDetails = (
		e: MouseEvent | KeyboardEvent,
		id: number,
		isKeyEvent: boolean = false
	) => {
		if (isKeyEvent && (e as KeyboardEvent).key !== 'Tab') {
			return;
		}
		if ($accordion == id) {
			//current = null;
			accordion.set(null);
			return;
		}
		//current = id;
		accordion.set(id);
	};

	onMount(() => {
		const currentRoute = routes.filter((route) => route.href == $page.url.pathname);

		if (currentRoute.length > 0) {
			accordion.set(currentRoute[0].categoryId);
		}
	});
</script>

{#each categories as category}
	<div class="details" class:open={$accordion == category.id}>
		<div
			class="summary"
			on:click={(e) => toggleDetails(e, category.id)}
			on:keydown={(e) => toggleDetails(e, category.id, true)}
			role="button"
			tabindex="0"
		>
			{category.name}
			<span>
				{#if $accordion !== category.id}
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"
						><path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="4"
							d="m13 30l12-12l12 12"
						/></svg
					>
				{:else}
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
				{/if}
			</span>
		</div>
		{#if $accordion === category.id}
			<ul class="navItems">
				{#each routes.filter((item) => item.categoryId == category.id) as route}
					<NavItem name={route.name} href={route.href} />
				{/each}
			</ul>
		{/if}
	</div>
{/each}

<style>
	.details .summary {
		cursor: pointer;
		user-select: none;
		padding: 0.6rem 1.2rem;
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

	.open .summary {
		border-color: #6f5c9b;
		background: #6f5c9b;
		transition: 200ms all ease-in 0s;
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

	span svg {
		color: #494949;
	}

	span .opened {
		color: white;
	}

	.navItems {
		padding-top: 8px;
	}
</style>
