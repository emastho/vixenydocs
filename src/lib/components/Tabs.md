<script>

	export let data;
	let index = 0;

</script>

<div class="buttons">
	{#each data as item, i}
		<button on:click={() => (index = i)} class:active={index == i}>{item.title}</button>
	{/each}
</div>
{#if data[index].component}
	<svelte:component this={data[index].component} {...data[index].details} />
{:else}
	<pre>
    <code class="language-typescript">{data[index].text}</code> 
  </pre>
{/if}

<style>
	.buttons {
		font-size: 16px;
		display: inline-block;
		border: 2px solid var(--closest);
		overflow: hidden;
		background-color: var(--closest);
	}

	button {
		color: var(--text);
		border: none;
		padding: 8px 16px;
		background-color: transparent;
		cursor: pointer;
	}

	.active {
		background-color: var(--bg);
		color: var(--text);
	}
</style>
