<script lang="ts">
	import { fly } from 'svelte/transition';
	import { routes, categories } from '$lib/routes';
	import { page } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';
	import Links from './Links.svelte';

	let menuZone: HTMLElement;

	export let closeSidebar: () => void;
	export let buttonElement: HTMLElement;

	const handleClick = (event: MouseEvent) => {
		if (
			menuZone &&
			!menuZone.contains(event.target as Node) &&
			!buttonElement.contains(event.target as Node) &&
			!event.defaultPrevented
		) {
			closeSidebar();
		}
	};

	onMount(() => {
		document.addEventListener('click', handleClick, true);
	});

	onDestroy(() => {
		document.removeEventListener('click', handleClick, true);
	});
</script>

<div transition:fly={{ x: -300, duration: 150, opacity: 1 }} class="menu" bind:this={menuZone}>
	<nav>
		<ul>
			<li>
				{#each categories as category}
					<div class="title">{category.name}</div>
					{#each routes.filter((item) => item.categoryId == category.id) as { href, name, newTab }}
						<li>
							<a
								{href}
								on:click={newTab ? () => {} : closeSidebar}
								class:active={$page.url.pathname == href}
								target={newTab ? '_blank' : ''}>{name}</a
							>
						</li>
					{/each}
				{/each}
				<div>
					<Links mobile={true} />
				</div>
			</li>
		</ul>
	</nav>
</div>

<style>
	ul {
		margin: 0;
	}

	a {
		font-size: 18px;
		display: block;
		padding-block: 8px;
	}

	a:active {
		text-decoration: underline;
	}

	.active {
		text-decoration: underline;
	}

	.title {
		font-size: 20px;
		color: #464646;
		padding-block: 16px;
	}

	.title:first-child {
		padding-top: 0;
	}

	.menu {
		background: var(--side);
		position: fixed;
		width: 270px;
		height: 100%;
		padding: 2rem;
		z-index: 100;
		border-right: 2px solid #252525;
		top: 0;
		overflow: scroll;
	}

	/* .other {
		color: inherit;
	} */

	/* .searchButton {
		font-size: 20px;
		width: 100%;
		border: none;
		outline: none;
		background-color: #444444;
		color: white;
		border-radius: 3px;
		padding-block: 4px;
	} */
</style>
