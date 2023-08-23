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
			<div class="other-links">
				<li>
					<a class="other" href="https://github.com/mimiMonads/vixeny" target="_blank">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
							/></svg
						>
					</a>
				</li>
				<li>
					<a class="other" href="https://github.com/emastho/vixenydocs" target="_blank">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="m4.929 21.482l5.846-5.846a1.999 1.999 0 0 0 1.932-3.346a2 2 0 0 0-3.346 1.932l-5.846 5.846l-1.06-1.06c2.828-3.3 3.888-6.954 5.302-13.082l6.364-.707l5.657 5.657l-.707 6.363c-6.128 1.415-9.782 2.475-13.081 5.304l-1.061-1.06ZM16.596 2.037l6.347 6.346a.5.5 0 0 1-.277.848l-1.474.23l-5.656-5.657l.212-1.485a.5.5 0 0 1 .848-.282Z"
							/></svg
						>
					</a>
				</li>
			</div>
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

	.other {
		color: inherit;
	}

	.other-links {
		color: #464646;
		padding-top: 16px;
	}
</style>
