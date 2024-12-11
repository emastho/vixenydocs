<script>
	import Details from '$lib/components/Details.svelte';
</script>

<nav>
	<div class="items">
		<Details />
	</div>
</nav>

<style>
	/* nav .title {
		color: var(--subtext);
		display: block;
		font-size: small;
		padding-bottom: 8px;
		padding-left: 0.4rem;
		padding-inline: 32px;
	} */

	/* nav .items > :global(*:not(:last-child)) {
		margin-bottom: 8px;
	} */

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
