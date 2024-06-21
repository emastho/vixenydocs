<script>
    export let runtime = "main";
</script>

{#if runtime == "main"}

```ts
import { serve } from "./setup.ts"

const testServer = server.testRequests();

// Simulate requests and test responses
testServer(new Request("/helloWold")).then(response => {
  // Perform assertions or checks on the response
});

```

{:else}

```ts
const server = wrap()()
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