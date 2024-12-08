<script>
    export let runtime = "main";
</script>

{#if runtime == "main"}

```javascript
import { wrap } from "vixeny";

const handler = wrap()()
  .get({
    path: "/helloWorld",
    f: () => "helloWorld",
  })

// Making a testable unit
const testHandler = await handler.testPetitions();

// "helloWorld"
await testHandler("/helloWorld")
  .then(async (response) => await response.text())
  .then(console.log)
```

{:else}

```javascript
import { wrap } from "vixeny";

const handler = wrap()()
  .get({
    path: "/helloWorld",
    f: () => "helloWorld",
  })

// Making a testable unit
const testHandler = await handler.handleRequest('/helloWorld')({});

// "helloWorld"
await testHandler("/helloWorld")
  .then((response) => response.text())
  .then(console.log)
```

{/if}
