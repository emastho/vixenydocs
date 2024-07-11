<script lang="ts">
	import Iconie from '$lib/components/Iconie.svelte';
	import { searchStore } from '$lib/stores/main';

	export let placeholder: string;
</script>

<div>
	<Iconie which="search" />
	<input tabindex="5" bind:value={$searchStore} type="text" {placeholder} />
</div>

<style>
	div {
		/* background-color: var(--closest); */
		background-color: var(--bg);
		border: 2px solid var(--side);
		padding: 10px 16px;
		/* border-radius: 4px; */
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

	div:focus-within {
		border: 2px solid var(--closest);
	}

	input:focus {
		outline: none;
	}
</style>
