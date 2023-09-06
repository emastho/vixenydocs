<script lang="ts">
	export let href: string;
	export let disable: boolean;
</script>

<a {href} class:hidden={disable}><slot /></a>

<style>
	a {
		width: 100%;
		border: 2px solid #2f2f2f;
		padding: 1.6rem;
		border-radius: 8px;
		margin: 0;
	}

	a:hover {
		background: #6f5c9b;
		border-color: #6f5c9b;
	}

	.hidden {
		cursor: auto;
		pointer-events: none;
		opacity: 0.5;
	}
</style>
