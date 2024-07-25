<script>
  import ListOfComponents from '$lib/components/listOfComponets.svelte';
</script>

<svelte:head>

<script src='/prism.mjs' defer></script>
<title>branch - Vixeny</title>
  <meta name="description" content="Understanding cookies"/>
  <meta name="keywords" content="cookies, web development, Vixeny framework, HTTP cookies"/>
</svelte:head>

# Cookie

This is the standard method to retrieve cookies from a request.

## Optimization

In the Vixeny framework, there's a component called `the checker`, which
actively tries to optimize your functions.

### Default Behavior

In this example, it understands that we are only using `hello`.

```ts
import { wrap } from "vixeny";

const handler = wrap()()
  .stdPetition({
    path: "/",
    f: ({ cookie }) => cookie.hello ?? "not found",
  })
  // `debugLast` shows all components used in the last request
  // cookie: [hello?]
  .debugLast()
  .testRequests();

await handler(
  new Request("http://localhost/", {
    // Sending two cookies: `hello` and `user`
    headers: {
      Cookie: "hello=world; user=Avant",
    },
  }),
)
  .then((x) => x.text())
  // Logging : world
  .then(console.log);
```

There are cases where the checker will not be able to infer the elements used,
which will trigger a default case. You can check this at any time using
`debugLast`.

```ts
import { wrap } from "vixeny";

const handler = wrap()()
  .stdPetition({
    path: "/",
    f: ({ cookie }) => JSON.stringify(cookie) ?? "not found",
  })
  // `debugLast` shows all components used in the last request
  // cookie: Record<string, string|null> | null
  .debugLast()
  .testRequests();

await handler(
  new Request("http://localhost/", {
    // Sending two cookies: `hello` and `user`
    headers: {
      Cookie: "hello=world; user=Avant",
    },
  }),
)
  .then((x) => x.text())
  // Logging : {"hello":"world","user":"Avant"}
  .then(console.log);
```

### Only

The `only` option restricts cookies to only accept the cookies specified in it.

```ts
import { wrap } from "vixeny";

const handler = wrap()()
  .stdPetition({
    path: "/",
    cookie: {
      // Locking this path to use only the specified cookies
      only: ["hello"],
    },
    f: ({ cookie }) => JSON.stringify(cookie) ?? "not found",
  })
  // `debugLast` shows all components used in the last request
  // cookie: [hello?]
  .debugLast()
  .testRequests();

await handler(
  new Request("http://localhost/", {
    // Sending two cookies: `hello` and `user`
    headers: {
      Cookie: "hello=world; user=Avant",
    },
  }),
)
  .then((x) => x.text())
  // Logging : {"hello":"world"}
  .then(console.log);
```

## List

<ListOfComponents />
