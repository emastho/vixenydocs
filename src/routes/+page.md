<svelte:head>
    <title>Vixeny - Unleash the Power of Multi-Paradigm Programming</title>
    <meta name="description" content="Vixeny is a multi-paradigm web development framework, optimizing developer experience, application speed, and functional programming capabilities. Start your journey with Vixeny to create robust, maintainable, and efficient web applications.">
</svelte:head>
<script>
  import PreviousNext from "$lib/components/PreviousNext.svelte"
  import FancyLink from "$lib/components/FancyLink.svelte"
</script>

# Welcome to Vixeny!

<div style="border: 1px solid #FFA500; padding: 10px; margin-block: 16px; background-color: #333; color: #FFA500;">
  <strong>Warning:</strong> Vixeny is currently in Alpha stage. The Beta version is dropping soon. Stay tuned!
</div>

## Quick start

```ts
import vixeny from "vixeny/fun";

export default {
  port: 8080,
  hostname: "127.0.0.1",
  fetch: vixeny({ hasName: "http://127.0.0.1:8080/" })([
    { 
      path: "/",
      f: () => "hello world"
    }
  ]) 
}
```

## Continue

<div>
<FancyLink href="/basics">Introduction</FancyLink>
<FancyLink href="/docs">Documentation</FancyLink>
</div>

<style>
div > :global(*:not(:last-child)) {
margin-bottom: 8px;
}
</style>
