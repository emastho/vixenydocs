<script>
  import ListOfComponents from '$lib/components/listofBasic.svelte';
 import Prisma from '$lib/components/Prisma.md';

</script>
<Prisma />

<svelte:head>


<title>Param - Vixeny</title>
  <meta name="description" content="Understanding URL parameters"/>
  <meta name="keywords" content="URL parameters, FP, functional programing, web development, Vixeny framework, HTTP parameters"/>
</svelte:head>

# Param

This is the standard method to retrieve URL parameters from a request.

## Optimization

In the Vixeny framework, there's a component called `the checker`, which
actively tries to optimize your functions.

### Default Behavior

In this example, it understands that we are only using `id`.

```javascript
import { wrap } from "vixeny";

const handler = await wrap()()
  .get({
    path: "/user/:id",
    f: ({ param }) => param.id ?? "not found",
  })
  // `debugLast` shows all components used in the last request
  // param: [id?]
  .debugLast()
  .testPetitions();

await handler(new Request("http://localhost/user/123"))
  .then((x) => x.text())
  // Logging: 123
  .then(console.log);
```

Checking always the `path` to get the valid keys for `param`.

```javascript
import { wrap } from "vixeny";

const handler = await wrap()()
  .get({
    path: "/user/:id/:token",
    f: ({ param }) => JSON.stringify(param) ?? "not found",
  })
  // `debugLast` shows all components used in the last request
  // param: [id,token]
  .debugLast()
  .testPetitions();

await handler(new Request("http://localhost/user/123/456"))
  .then((x) => x.text())
  // Logging: {"id":"123","token":"456"}
  .then(console.log);
```

### Only

The `only` option restricts URL parameters to only accept the parameters
specified in it.

```javascript
import { wrap } from "vixeny";

const handler = await wrap()()
  .get({
    path: "/user/:id",
    param: {
      // Locking this path to use only the specified parameters
      only: ["id"],
    },
    f: ({ param }) => JSON.stringify(param) ?? "not found",
  })
  // `debugLast` shows all components used in the last request
  // param: [id]
  .debugLast()
  .testPetitions();

await handler(new Request("http://localhost/user/123"))
  .then((x) => x.text())
  // Logging: {"id":"123"}
  .then(console.log);
```

### Unique

This option simplifies handling by replacing the `param` object with the value
first `:$VALUE`. This is a targeted optimization to streamline access to
important parameters.

```javascript
import { wrap } from "vixeny";

const handler = await wrap()()
  .get({
    path: "/user/:id",
    param: {
      // Enabling unique parameter simplification
      unique: true,
    },
    // Directly returning the value of the specified URL parameter
    f: ({ param }) => param ?? "not found",
  })
  // `debugLast` visualizes which components were utilized in the last request
  // param: unique
  .debugLast()
  .testPetitions();

await handler(new Request("http://localhost/user/123"))
  .then((x) => x.text())
  // Outputs the value of 'id', i.e., '123'
  .then(console.log);
```

## List

<ListOfComponents />
