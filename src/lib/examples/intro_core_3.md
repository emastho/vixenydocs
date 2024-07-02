<script>
    export let runtime = "main";
</script>

{#if runtime == "main"}

```ts
import { handler } from "./setup.ts";

const testHandler = handler.testRequests();

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
  .stdPetition({
    path: "/helloWold",
    f: () => "helloWold",
  })
  .stdPetition({
    path: "/one",
    f: () => "one",
  })
  .stdPetition({
    path: "/two",
    f: () => "two",
  })

export handler
```

{/if}
