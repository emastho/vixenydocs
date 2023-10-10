<svelte:head>
    <title>Vixeny - Unleash the Power of Multi-Paradigm Programming</title>
    <meta name="description" content="Vixeny is a multi-paradigm web development framework, optimizing developer experience, application speed, and functional programming capabilities. Start your journey with Vixeny to create robust, maintainable, and efficient web applications.">
</svelte:head>
<script>
  import PreviousNext from "$lib/components/PreviousNext.svelte"
  import FancyLink from "$lib/components/FancyLink.svelte"
</script>

# Welcome to Vixeny!

<div class="warning">
  <strong>Warning:</strong> Vixeny is currently in Alpha stage. We appreciate your <a href="https://github.com/mimiMonads/vixeny/issues">feedback</a>!
</div>

## Welcome to Vixeny

Where modern web development meets elegant design, Vixeny effortlessly merges flexibility with function. Step into a realm where functional purity is at its core, and immutable structures champion robustness. With Vixeny, you hold the reins, deciding when and how to introduce controlled side effects. Prioritizing performance, code clarity, and safety, we ensure your development journey is fast and seamless. Plus, our inherent functional nature makes testing a breeze, consistently delivering reliable results. And the cherry on top? Vixeny's versatility shines bright, performing effortlessly across diverse JavaScript runtimes. Dive in and experience the Vixeny difference. 🌟

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
</div>

<style>
div > :global(*:not(:last-child)) {
margin-bottom: 8px;
}
a { display: inline-block;margin: 0; }
</style>
