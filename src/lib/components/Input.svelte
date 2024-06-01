<script>
	export let placeholder;
</script>

<input type="text" {placeholder} disabled />

<style>
	input {
		border: none;
		padding: 10px 16px;
		font-size: 14px;
		background-color: var(--further);
		color: var(--text);
		border-radius: 4px;
	}

	input:focus {
		outline: 1px solid var(--closest);
	}
</style>
