<script lang="ts">
import {writable} from "svelte/store"
	// export let data: { title: string; content: string; code?: boolean }[];
	//
	// let tab = 0;
	// $: content = data[tab].content;
</script>

<!-- {#each data as item, i} -->
<!-- 	<button on:click={() => (tab = i)}>{item.title}</button> -->
<!-- {/each} -->


<slot />

