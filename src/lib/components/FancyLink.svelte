<script lang="ts">
	export let href: string;
	export let disable: boolean = false;
</script>

<a {href} class:hidden={disable}><slot /></a>

<style>
	a {
		width: 100%;
		/* border: 4px solid var(--side); */
		border: 4px solid transparent;
		background-color: var(--closer);
		padding: 1.6rem;
		border-radius: 8px;
		margin: 0;
	}

	a:hover {
		background: transparent;
		border-color: var(--closer);
	}

	.hidden {
		cursor: auto;
		pointer-events: none;
		opacity: 0.5;
	}
</style>
