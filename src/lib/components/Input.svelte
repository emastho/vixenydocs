<script>
	export let placeholder;
</script>

<input type="text" {placeholder} />

<style>
	input {
		border: none;
		padding: 8px 16px;
		font-size: 14px;
		background-color: var(--further);
		color: var(--text);
		border-radius: 2px;
	}

	input:focus {
		outline: 1px solid var(--closest);
	}
</style>
