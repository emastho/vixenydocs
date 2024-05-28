<script>
// I couldnt find a better way, you could help me
export let data;
let index = 0;
</script>

<div class="buttons">
{#each data as item, i}
<button on:click={() => index = i} class:active={index == i}>{item.title}</button>
{/each}
</div>
{#if typeof data[index].content == "function"}
<svelte:component this={data[index].content} />
{:else}

{data[index].content}

{/if}

<style>
.buttons {
font-size: 16px;
display: inline-block;

border: 2px solid var(--closest);
border-radius: 6px;
overflow: hidden;
box-shadow: 0 0 5px white;
}
button {
    background-color: var(--closest);
    color: var(--text);
    border: none;
    padding: 8px 16px;
}

.active {
background-color: transparent;
color: var(--text);
}
</style>

