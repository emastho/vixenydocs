<script lang="ts">
	import Iconie from '$lib/components/Iconie.svelte';
	import { searchStore } from '$lib/stores/main';
	export let placeholder: string;
	console.log(searchStore);
</script>

<div>
	<Iconie which="search" />
	<input bind:value={$searchStore} type="text" {placeholder} />
</div>

<style>
	div {
		background-color: var(--further);
		padding: 10px 16px;
		border-radius: 4px;
		display: flex;
		align-items: center;
		column-gap: 8px;
	}
	input {
		border: none;
		background-color: transparent;
		font-size: 14px;
		color: var(--text);
	}

	input:focus {
		outline: 1px solid var(--closest);
	}
</style>
