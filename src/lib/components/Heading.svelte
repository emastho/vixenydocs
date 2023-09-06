<script lang="ts">
	export let title: string;
	export let size: 1 | 2 | 3;

	let elem: string = `h${size}`;
</script>

<svelte:element this={elem} id={title} class="block">{title}</svelte:element>
<a href={`#${title}`}>#</a>

<style>
	.block {
		scroll-margin-top: 64px;
		display: inline-block;
	}

	a {
		display: inline-block;
		margin-left: 8px;
		color: #696868;
		margin-block: 0;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
