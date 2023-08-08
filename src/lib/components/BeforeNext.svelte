<script lang="ts">
	export let previous: string;
	export let next: string;
</script>

<div>
	{#if previous}
		<a href={previous}>Before</a>
	{/if}
	{#if next}
		<a href={next}>Next</a>
	{/if}
</div>

<style>
	div {
		margin-top: 120px;
		display: flex;
		column-gap: 8px;
	}

	a {
		width: 100%;
		border: 2px solid #2f2f2f;
		padding: 1.6rem;
		border-radius: 8px;
	}

	a:hover {
		background: #6f5c9b;
		border-color: #6f5c9b;
	}
</style>
