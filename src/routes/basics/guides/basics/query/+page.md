<script>
  import ListOfComponents from '$lib/components/listofBasic.svelte';
</script>

<svelte:head>

<script src='/prism.mjs' defer></script>
<title>Query - Vixeny</title>
  <meta name="description" content="Understanding query parameters"/>
  <meta name="keywords" content="query parameters, web development, Vixeny framework, FP, functional programing, HTTP queries"/>
</svelte:head>

# Query

This is the standard method to retrieve query parameters from a request.

## Optimization

In the Vixeny framework, there's a component called `the checker`, which
actively tries to optimize your functions.

### Default Behavior

In this example, it understands that we are only using `id`.

```javascript
import { wrap } from "vixeny";

const handler = wrap()()
  .get({
    path: "/",
    f: ({ query }) => query.id ?? "not found",
  })
  // `debugLast` shows all components used in the last request
  // query: [id?]
  .debugLast()
  .testRequests();

await handler(new Request("http://localhost/?id=123"))
  .then((x) => x.text())
  // Logging : 123
  .then(console.log);
```

There are cases where the checker will not be able to infer the elements used,
which will trigger a default case. You can check this at any time using
`debugLast`.

```javascript
import { wrap } from "vixeny";

const handler = wrap()()
  .get({
    path: "/",
    f: ({ query }) => JSON.stringify(query) ?? "not found",
  })
  // `debugLast` shows all components used in the last request
  // query: Record<string, string|null> | null
  .debugLast()
  .testRequests();

await handler(new Request("http://localhost/?id=123&user=Avant"))
  .then((x) => x.text())
  // Logging : {"id":"123","user":"Avant"}
  .then(console.log);
```

### Only

The `only` option restricts query parameters to only accept the parameters
specified in it.

```javascript
import { wrap } from "vixeny";

const handler = wrap()()
  .get({
    path: "/",
    query: {
      // Locking this path to use only the specified parameters
      only: ["id"],
    },
    f: ({ query }) => JSON.stringify(query) ?? "not found",
  })
  // `debugLast` shows all components used in the last request
  // query: [id?]
  .debugLast()
  .testRequests();

await handler(new Request("http://localhost/?id=123&user=Avant"))
  .then((x) => x.text())
  // Logging : {"id":"123"}
  .then(console.log);
```

Here's a more naturally phrased version of your documentation:

### Unique

This option simplifies handling by replacing the `query` object with the value
of the specified `name` key, if present. This is a targeted optimization to
streamline access to important parameters.

```javascript
import { wrap } from "vixeny";

const handler = wrap()()
  .get({
    path: "/",
    query: {
      // Enabling unique
      unique: true,
      // Key to target
      name: "user",
    },
    // Directly returning the value of the specified query parameter
    f: ({ query }) => query ?? "not found",
  })
  // `debugLast` visualizes which components were utilized in the last request
  // query: [user?]
  .debugLast()
  .testRequests();

await handler(new Request("http://localhost/?id=123&user=Avant"))
  .then((x) => x.text())
  // Outputs the value of 'user', i.e., 'Avant'
  .then(console.log);
```

## List

<ListOfComponents />
