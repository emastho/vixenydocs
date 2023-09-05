<script lang="ts">
	import { fade } from 'svelte/transition';
	import { searchModal } from '$lib/stores/main';

	let target: HTMLElement;

	const clickOutside = (e: Event) => {
		if (!target.contains(e.target as Node) && !e.defaultPrevented) {
			searchModal.set(false);
		}
	};
</script>

<svelte:body on:click={clickOutside} />
<div class="modal" transition:fade={{ duration: 10 }}>
	<div bind:this={target} class="modal-content">meow</div>
</div>

<style>
	.modal {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 10;
		width: 100%;
		height: 100svh;
		backdrop-filter: blur(3px);
	}

	.modal-content {
		min-width: 700px;
		height: 200px;
		background: darkgray;
		border-radius: 8px;
		padding: 2rem;
	}
</style>
