<script>
  import PreviousNext from "$lib/components/PreviousNext.svelte"
  import Heading from "$lib/components/Heading.svelte"
</script>

<svelte:head>
    <title>Basics - Vixeny</title>
    <meta name="description" content="about this page" />
</svelte:head>

# Basics

Welcome to Vixeny, a flexible web framework that supports purely functional programming, other paradigms, is easy to test, predictable, side effect free and safe while staying performant.

<Heading title="Basics" size="2" />

`Petitions` are the most basic component and allow us to declare a route.

Defining routes or `Petitions` in Vixeny involves `vixeny(options)([...petitions])`, where options configure the server and petitions are an array of `Petition`.

A "Hello World" `Petition` on `"/"`:
```ts
{
  path: "/",
  f: () => "hello world",
}
```

<Heading title="Environments" size="2" />

Setup a basic "hello world" server in Bun and Deno as follows:

### In Bun:
```ts
import vixeny from "vixeny/fun";

export default {
  port: 8080,
  hostname: "127.0.0.1",
  fetch: vixeny(
    { hasName: "http://127.0.0.1:8080/" }
    )
    ([{ path: "/", f: () => "hello world" }]) 
}

```

### In Deno:
```ts
import { serve } from "https://deno.land/std/http/server.ts";
import vixeny from "https://deno.land/x/endofunctor/fun.ts";

await serve(
  vixeny({ hasName: "http://127.0.0.1:8080/" })
    ([{ path: "/", f: () => "hello world" }]),
  { port: 8080, hostname: "127.0.0.1" },
);
```

<Heading title="Types" size="2" />

Vixeny has three basic types:

**Untyped**: Standard petitions without a `type`. The expecting return type is `BodyInit`.
   Example:
   ```ts
   {
     path: "/",
     f: () => "hello world",
   }
   ```

**Type Request**: Changes the return type to `Response`, allowing custom status codes and properties.
   Example:
   ```ts
   {
     path: "/response/who/:name",
     type: "request",
     f: (context) => (context.param.name === "Bun" || context.param.name === "Deno")
         ? new Response("Welcome", {status:200})
         : new Response("Only devs here", {status: 400})
   }
   ```

**Type Response**: Bypasses the optimizer, directly receiving and returning Request and Response objects, respectively.
   Example:
   ```ts
   {
     path: "/response/hello",
     type: "response",
     r: r => new Response("Hello world!")    
   }
   ```

<Heading title="Optimizer" size="2" />


Vixeny's optimizer stringifies the given function `f`, analyzes its tokens, and processes only the necessary elements, ensuring speed, safety, and alignment with modern web development best practices.

Adjust this behavior using `add`, `delete`, or `only` in `options`:

- `add` includes additional fields in the arguments.
- `delete` removes specific fields from the arguments.
- `only` forces to include only what is required.

Example:

```ts
{
  path: "/",
  options:{
    only: ["req"]
  },
  f:  context =>  externalFunctionThatNeedsReq(context)
}
```
It is important to understand that `externalFunctionThatNeedsReq` is outside of our `context`, thus, The optimizer can't reach it and infer what would be needed.

<Heading title="Distinctive Features" size="2" />

We will see in the `data flow` that Vixeny offers unique features like:
  - `Resolve` for state setup 
  - `Branch` for conditional execution
  - `Composing in Context` for cohesive and maintainable code
  - `Mutable` for mutable data handling, providing versatility and accommodating various paradigms and preferences.

