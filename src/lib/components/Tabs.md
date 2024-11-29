<script>
  import { afterUpdate } from 'svelte';
  import Prism from 'prismjs';

  // Import the Prism.js components and plugins you need
  import 'prismjs/components/prism-javascript'; // Replace with your language(s)
  import 'prismjs/plugins/toolbar/prism-toolbar';
  import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';

  // Import a dark theme for Prism.js
  import 'prismjs/themes/prism-okaidia.css'; // Choose a dark theme
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

{#if data[index].component}
  <svelte:component this={data[index].component} {...data[index].details} />
{:else}
  <pre>
    <code class="language-typescript">{data[index].text}</code> <!-- Add the language class -->
  </pre>
{/if}

<style>
  :global(body) {
    --text: #ffffff;      /* Light text for dark background */
    --bg: #1e1e1e;        /* Dark background color */
    --closest: #2d2d2d;   /* Slightly lighter for contrast */
  }

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

  /* Custom styles for code blocks */
  pre {
    background-color: var(--bg);
    padding: 16px;
    overflow-x: auto;
    border-radius: 4px;
  }

  code {
    color: var(--text);
    font-family: 'Fira Code', monospace;
  }

  /* Adjust Prism.js toolbar for dark theme */
  :global(.prism-toolbar) {
    background: var(--bg);
    border: none;
  }

  :global(.prism-toolbar-button) {
    color: var(--text);
    background: transparent;
    border: none;
    padding: 0 8px;
    cursor: pointer;
  }

  :global(.prism-toolbar-button:hover) {
    background: var(--closest);
  }
</style>
