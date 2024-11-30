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
const testHandler = await handler.testRequests();

// "helloWorld"
console.log(
  await testHandler(new Request("http://localhost/helloWorld"))
    .then((response) => response.text()),
);
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
console.log(
  await testHandler(new Request("http://localhost/helloWorld"))
    .then((response) => response.text()),
);

```

{/if}
