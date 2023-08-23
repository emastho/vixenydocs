<script lang="ts">
	import { fly } from 'svelte/transition';
	import { routes } from '$lib/routes';
	import { page } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';

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
			{#each routes as { href, name }}
				<li>
					<a {href} on:click={closeSidebar} class:active={$page.url.pathname.includes(href)}
						>{name}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
</div>

<style>
	a {
		font-size: 20px;
		display: block;
		padding-block: 8px;
	}

	.active {
		text-decoration: underline;
	}

	.menu {
		background: #222;
		position: fixed;
		width: 270px;
		height: 100%;
		padding: 2rem;
		z-index: 100;
	}
</style>
