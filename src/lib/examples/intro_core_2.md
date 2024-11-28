<script>
    export let runtime = "main";
</script>

{#if runtime == "main"}

```javascript
import { otherWrap } from "./setup.ts";
import { wrap } from "vixeny";

const testHandler = await handler.testRequests();

const handler = wrap()()
  .get({
    path: "/one",
    f: () => "one",
  })
  // [ "/one" ]
  .logPaths()
  .get({
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

```javascript
import { wrap } from "vixeny";

const otherWrap = wrap()().get({
  path: "/three",
  f: () => "three",
});

export { otherWrap };
```

{/if}
