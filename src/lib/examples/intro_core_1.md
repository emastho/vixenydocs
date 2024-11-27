<script>
    export let runtime = "main";
</script>

{#if runtime == "main"}

```ts
import { wrap } from "vixeny";
import { helloWorld, options } from "./setup.ts";

const root = wrap(options)()
  .add({
    path: "/ping",
    f: () => "pong",
  })
  .addAnyPetition(helloWorld);
```

{:else}

```ts
import { petitions, plugins } from "vixeny";

const options = plugins.globalOptions({});

const helloWorld = petitions.add()({
  path: "/hello",
  f: () => "helloWorld",
});

export { helloWorld, options };
```

{/if}
