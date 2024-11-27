<script>
    export let runtime = "main";
</script>

{#if runtime == "main"}

```ts
import { handler } from "./setup.ts";

const testHandler = await handler.testRequests();

// "helloWold"
console.log(
  await testHandler(new Request("http://localhost/helloWold"))
    .then((response) => response.text()),
);
```

{:else}

```ts
import { wrap } from "vixeny";

const handler = wrap()()
  .get({
    path: "/helloWold",
    f: () => "helloWold",
  })
  .get({
    path: "/one",
    f: () => "one",
  })
  .get({
    path: "/two",
    f: () => "two",
  })

export handler
```

{/if}
