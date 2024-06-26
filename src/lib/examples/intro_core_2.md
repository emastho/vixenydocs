<script>
    export let runtime = "main";
</script>

{#if runtime == "main"}

```ts
import { otherWrap } from "./setup.ts";
import { wrap } from "vixeny";

const testHandler = handler.testRequests();

const handler = wrap()()
  .stdPetition({
    path: "/one",
    f: () => "one",
  })
  // [ "/one" ]
  .logPaths()
  .stdPetition({
    path: "/two",
    f: () => "two",
  })
  // [ "/one" , "/two" ]
  .logPaths()
  // Adding another wrap
  .union(otherWrap.unwrap())
  // [ "/one" , "/two" , "/three"]
  .logPaths()
  // Debug console
  .debugLast();
```

{:else}

```ts
import { wrap } from "vixeny";

const otherWrap = wrap()().stdPetition({
  path: "/three",
  f: () => "three",
});

export { otherWrap };
```

{/if}
