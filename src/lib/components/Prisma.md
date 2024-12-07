<script>
    import { afterUpdate } from 'svelte';
    import Prism from 'prismjs';
  
    // Import the languages, plugins, and theme you need
    import 'prismjs/components/prism-javascript';
    import 'prismjs/plugins/toolbar/prism-toolbar';
    import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
    // import 'prismjs/themes/prism-okaidia.css'; // or another theme
    // import 'prismjs/plugins/toolbar/prism-toolbar.css';
  
    // Run Prism highlighting after each update
    afterUpdate(() => {
      Prism.highlightAll();
    });
  </script>
  

  <slot />
  