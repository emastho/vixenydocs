<script>
    export let runtime = "main";
</script>

{#if runtime == "main"}

```ts
import { server } from "./setup.ts";

const testServer = server.testRequests();

// "helloWold"
console.log(
  await testServer(new Request("http://localhost/helloWold"))
    .then((response) => response.text()),
);
```

{:else}

```ts
import { wrap } from "vixeny";

const server = wrap()()
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

export server
```

{/if}
