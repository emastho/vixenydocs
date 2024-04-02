<script>
	import Details from '$lib/components/Details.svelte';
</script>

<nav>
	<div class="title">Unleash the functional beast~</div>
	<div class="items">
		<Details />
	</div>
</nav>

<style>
	nav .title {
		color: rgb(206, 206, 206);
		display: block;
		font-size: small;
		padding-bottom: 16px;
		padding-left: 0.2rem;
	}

	nav .items > :global(*:not(:last-child)) {
		margin-bottom: 8px;
	}

	nav {
		align-items: start;
		flex-grow: 1;
	}

	nav :global(ul) {
		width: 100%;
		margin: 0;
		user-select: none;
	}
</style>
