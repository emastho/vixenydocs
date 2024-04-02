<script lang="ts">
	import { fade } from 'svelte/transition';
	import { searchModal } from '$lib/stores/main';
	import SearchFunction from '$lib/components/SearchFunction.svelte';

	let target: HTMLElement;

	const clickOutside = (e: Event) => {
		//@ts-ignore
		if (e.target == target) {
			searchModal.set(false);
		}
	};
</script>

<svelte:body on:click={clickOutside} />
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events-->
<div class="modal" bind:this={target} transition:fade={{ duration: 10 }}>
	<div class="modal-content">
		<SearchFunction />
	</div>
</div>

<style>
	.modal {
		position: fixed;
		display: flex;
		justify-content: center;
		z-index: 10;
		width: 100%;
		height: 100svh;
		backdrop-filter: blur(2px);
		padding-top: 64px;
	}

	.modal-content {
		display: flex;
		flex-direction: column;
		width: 700px;
		max-width: 700px;
		min-height: 200px;
		background: #252525;
		color: white;
		border-radius: 8px;
		max-height: 70%;
		box-shadow: 0 4px 8px #15151550;
		padding: 32px;
	}

	@media (width < 1100px) {
		.modal {
			padding-top: 0;
		}

		.modal-content {
			border-radius: 0;
			max-height: 100%;
		}
	}
</style>
