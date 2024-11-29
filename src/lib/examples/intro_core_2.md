<script>
    export let runtime = "main";
</script>

{#if runtime == "main"}

```javascript
import { otherWrap } from "./setup.ts";
import { wrap } from "vixeny";

const otherWrap = wrap()().get({
  path: "/three",
  f: () => "three",
});


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


  const testHandler = await handler.testRequests();
```

{/if}
