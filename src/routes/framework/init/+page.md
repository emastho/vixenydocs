<script>
    import PreviousNext from "$lib/components/PreviousNext.svelte"
</script>
<svelte:head>
    <title>Quick start - Vixeny</title>
    <meta name="description" content="How to install Vixeny" />
</svelte:head>

# Quick start
### In Bun:

```bash
bun add vixeny
bun main.ts
```

```ts
import { vixeny , wrap } from "vixeny";

const options = { hasName: "http://127.0.0.1:4000/" };

const paths = wrap(options)()
  .stdPetition({
      path: "/",
      f: () => "hello world"
  });

export default {
  port: 4000,
  hostname: "127.0.0.1",
  fetch: vixeny(options)(paths.unwrap())
}

```

### In Deno:

add a `deno.json` :

```json
{
  "imports": {
    "vixeny": "https://deno.land/x/endofunctor/main.ts"
  }
}
```

```ts
import { vixeny } from "vixeny";

const options = { hasName: "http://127.0.0.1:4000/" };

const paths = wrap(options)()
  .stdPetition({
      path: "/",
      f: () => "hello world"
  });

Deno.serve(
    { port: 4000, hostname: "127.0.0.1" },
    vixeny(options)(paths.unwrap())
 )
 
```   

```bash
deno run -A main.ts
```

<PreviousNext previous="/" next="/framework/routing" />
