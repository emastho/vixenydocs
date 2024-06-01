<script>
	import Iconie from '$lib/components/Iconie.svelte';
	export let placeholder;
</script>

<div>
	<Iconie which="search" />
	<input type="text" {placeholder} disabled />
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
