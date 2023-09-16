<script lang="ts">
	import { fade } from 'svelte/transition';
	import { searchModal } from '$lib/stores/main';

	let target: HTMLElement;

	const clickOutside = (e: Event) => {
		if (!target.contains(e.target as Node) && !e.defaultPrevented) {
			searchModal.set(false);
		}
	};

	const Something = () => import('$lib/components/SearchFunction.svelte');
</script>

<svelte:body on:click={clickOutside} />
<div class="modal" transition:fade={{ duration: 10 }}>
	<div bind:this={target} class="modal-content">
		{#await Something() then something}
			<svelte:component this={something.default} />
		{:catch e}
			Wow, I am really bad at javascript, error
		{/await}
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
		backdrop-filter: blur(3px);
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
		padding: 2rem;
		max-height: 70%;
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
