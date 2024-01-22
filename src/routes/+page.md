<script>
  import PreviousNext from "$lib/components/PreviousNext.svelte"
  import FancyLink from "$lib/components/FancyLink.svelte"
  import Tabs from "$lib/components/Tabs.svelte"

  let tab = 0;
</script>
<svelte:head>
    <title>Vixeny - Unleash the Power of Multi-Paradigm Programming</title>
    <meta name="description" content="Vixeny is a multi-paradigm web development framework, optimizing developer experience, application speed, and functional programming capabilities. Start your journey with Vixeny to create robust, maintainable, and efficient web applications.">
</svelte:head>


<div class="warning">
  <strong>Warning:</strong> Vixeny is currently in Alpha stage. We appreciate your <a href="https://github.com/mimiMonads/vixeny/issues">feedback</a>!
</div>

# Welcome to Vixeny!

<p style="margin-top: -32px;">
Multi-paradigm web development framework, optimizing developer experience, application speed, and functional programming capabilities. Start your journey with Vixeny to create robust, maintainable, and efficient web applications.</p>

<h2 style="margin-top: 48px;">
Quick start
</h2>

```ts
import vixeny from "vixeny/fun";

export default {
  port: 4000,
  hostname: "127.0.0.1",
  fetch: vixeny({ hasName: "http://127.0.0.1:4000/" })([
    { 
      path: "/",
      f: () => "hello world"
    }
  ]) 
}
```

## Continue

<div>
<FancyLink href="/framework/init">Let's begin</FancyLink>
<FancyLink href="/examples">Examples</FancyLink>
</div>

<style>
div > :global(*:not(:last-child)) {
margin-bottom: 8px;
}
a { display: inline-block;margin: 0; }
</style>
