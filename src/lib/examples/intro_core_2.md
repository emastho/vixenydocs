<script>
    export let runtime = "main";
</script>

{#if runtime == "main"}

```javascript
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
  .get({
    path: "/two",
    f: () => "two",
  })
  // Adding another wrap
  .union(otherWrap.unwrap())
  // Logging paths
  .logPaths()

 await handler.testPetitions()
  .then(async serve => console.log(await serve('/three')))
 
```

{/if}
