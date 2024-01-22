<script>
    import PreviousNext from "$lib/components/PreviousNext.svelte"
</script>
<svelte:head>
    <title>Quick start - Vixeny</title>
    <meta name="description" content="How to install Vixeny" />
</svelte:head>

# Quick start

Setup a basic "hello world" server in Bun and Deno as follows:

### In Bun:

```
bun add vixeny
```

```ts
import vixeny from "vixeny/fun";

export default {
  port: 4000,
  hostname: "127.0.0.1",
  fetch: vixeny({ hasName: "http://127.0.0.1:4000/" })([
    { 
      path: "/",
      f: () => "hello world"
    },
    {
      path: "/meow",
      method: "POST",
      f: (ctx) => ctx.req.body ?? ":("
    }
  ]) 
}

```

### In Deno:
```ts
import { serve } from "https://deno.land/std/http/server.ts";
import vixeny from "https://deno.land/x/endofunctor/fun.ts";

await serve(
  vixeny({ hasName: "http://127.0.0.1:4000/" })([
    {
      path: "/",
      f: () => "hello world"
    }
  ]),
  { port: 4000, hostname: "127.0.0.1" },
);
```   

<PreviousNext previous="/" next="/framework/routing" />
