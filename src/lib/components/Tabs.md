<script>
  import { afterUpdate } from 'svelte';
  import Prism from 'prismjs';

  // Import the Prism.js components and plugins you need
  import 'prismjs/components/prism-javascript'; 
  import 'prismjs/plugins/toolbar/prism-toolbar';
  import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';

  // Import a dark theme for Prism.js
  //import 'prismjs/themes/prism-okaidia.css'; // Choose a dark theme
  import 'prismjs/plugins/toolbar/prism-toolbar.css'; // Plugin CSS

  export let data;
  let index = 0;

  // Combine the content of the first two tabs for the third tab if not provided
  if (data.length >= 3 && !data[2].text) {
    data[2].text = data[0].text + '\n\n' + data[1].text;
  }

  // Re-apply syntax highlighting after each update

  afterUpdate(
    () => {
      Prism.highlightAll();
    }
  )

</script>

<div class="buttons">
  {#each data as item, i}
    <button on:click={() => index = i} class:active={index == i}>{item.title}</button>
  {/each}
</div>

{#if data[index].component} <svelte:component this={data[index].component}
{...data[index].details} /> {:else}

<pre>
    <code class="language-typescript">{data[index].text}</code> <!-- Add the language class -->
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
