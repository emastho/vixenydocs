<script>
  import BeforeNext from "$lib/components/BeforeNext.svelte"
</script>

<svelte:head>
    <title>Basics - Vixeny</title>
    <meta name="description" content="about this page" />
</svelte:head>

# Introduction

Welcome to Vixeny, a web framework that offers both the strengths of functional programming and extensive support for other paradigms. Whether you're a seasoned functional programmer, new to the concept, or even if you choose to take a different path altogether, Vixeny has something to offer you.

### Embracing Different Styles

Vixeny is about flexibility, expressiveness, and the joy of coding. Our philosophy embraces various programming approaches, all supported by key features:

- **Functional, but Not Exclusive:** Functional programming is a tool, not a mandate, within Vixeny. If you prefer other paradigms, you'll find support and features to suit your needs. It's about providing different avenues to success, not making things difficult.

- **Modular and Predictable:** Thanks to its functional nature, Vixeny ensures easy testing with predictable and immutable structures. This design fosters a robust and reliable development environment.

- **Opt-in Side Effects:** In Vixeny, side effects are an option, not a given. You have the control to explicitly create them when needed. Vixeny can't be mutated without your direct intention.

- **High-Performance, Elegance, and More:** Whether functional principles or other paradigms guide you, Vixeny's commitment to performance, safety, readability, and community remains strong.

In Vixeny, your way of coding is embraced, and your unique approach is celebrated. Dive into our Getting Started guide and discover how Vixeny can meet you where you are and help you build extraordinary web applications.


### The Basics of Vixeny

In Vixeny, defining routes or **`Petitions`** is straightforward. You'll make use of: 
```ts
vixeny(options)([...petitions])
``` 
Where options allow you to configure the server, and petitions are an **`Array`** of routes.

A simple example of a "Hello World" **`petition`** on `"/"`:

```typescript
{
  path: "/",
  f: () => "hello world",
}
```

#### Hello World in Different Environments

Vixeny can be used with Deno and Bun. Here's how you can set up a basic "hello world" server:

**In Bun:**

```typescript
import vixeny from "vixeny/fun";

export default {
  port: 8080,
  hostname: "127.0.0.1",
  fetch: vixeny(
    //Options
    { hasName: "http://127.0.0.1:8080/" }
    )(
    /Petitions
    [
    //Petition on "/"
    {
      path: "/",
      f: () => "hello world",
    },
  ]) 
}

```

**In Deno:**

```ts
import { serve } from "https://deno.land/std/http/server.ts";
import vixeny from "https://deno.land/x/endofunctor/fun.ts";
//import vixeny from "npm:vixeny/fun";

await serve(
  vixeny(
    //Options
    { hasName: "http://127.0.0.1:8080/" }
    )(
    //Petitions
    [
    //Petition on "/"
    {
      path: "/",
      f: () => "hello world",
    },
  ]
  ),
  { port: 8080, hostname: "127.0.0.1" },
);
```


## Types

There are 3 basic types that we should care at the beginning:

### Untyped

Untyped petitions are the standard way of defining routes in Vixeny. They don't explicitly define the response type and provide flexibility in handling the request. You can easily set up routes, parameters, queries, and headers without any specific type information. This gives you a lot of freedom but can potentially lead to issues if you're expecting specific types and don't receive them.

Examples of untyped petitions are found throughout the documentation, such as basic route definition:

```typescript
{
  path: "/",
  f: () => "hello world",
}
```

### Type Request

Type request petitions change the return type from `BodyInit` to `Response`. This means that the route must return a Response object. It gives you more control over the HTTP response, allowing you to set specific status codes, headers, and other properties.

Here's an example:

```typescript
{
    path: "/response/who/:name",
    type: "request",
    f: (context) => (context.param.name === "Bun" || context.param.name === "Deno")
        ? new Response("Welcome", {status:200})
        : new Response("Only devs here", {status: 400})
}
```

### Type Response

When the petition type is set to "response," the optimizer is bypassed. A Request object is directly received, and a Response object is returned. This gives full control over the request and response cycle, allowing for direct manipulation of the HTTP objects. It can be beneficial when you need complete control over the HTTP processing.

Here's an example:

```typescript
{
  path: "/response/hello",
  type: "response",
  r: r => new Response("Hello world!")    
}
```

### Summary

- **Untyped**: General-purpose petitions that don't require explicit typing. Flexible but can be less precise.
- **Type Request**: Changes the return type to `Response`, allowing more control over the response, such as custom status codes.
- **Type Response**: Bypasses the optimizer, receiving a Request object and returning a Response object directly, offering full control over the HTTP request-response cycle.

## Optimizer

Vixeny's approach begins with taking the given function (f) and stringifying it. This process of converting the function into a string representation allows Vixeny to analyze its tokens and predict what will be required for its execution. This ensures that only the necessary elements are processed, leading to:

 - **Increased Speed**: Faster execution by minimizing unnecessary overhead.
 - **Tailored Execution**: Providing exactly what's needed for the function without extraneous elements.

 There are 3 ways to adjust this behavior: 

### add

In Vixeny, `add` is used to include additional fields in the arguments for a specific route. By using `add`, you can enable parsing for specific aspects of the request that are otherwise out of scope.

Here's an example from your code:

```typescript
{
  path:"/example/:id",
  add: ["req","param"],
  f: context => functionOutOFContext(context)
}
```

In this example, the fields `"req"` and `"param"` are added to the arguments, and they can now be accessed within the function handling this route.

### delete

Conversely, the `delete` option allows you to remove specific fields from the arguments. This is useful if you want to exclude certain aspects of the request that are not needed, potentially optimizing performance and enhancing security.

Here's an example from the code you provided:

```typescript
{
  path: '/example/:id',
  delete: ['param'],
  f: () =>  "Hello world"
}
```

In this case, the `delete` option is used to remove the `param` field from the arguments, so it cannot be accessed within the route's handling function.

### only

In the context of Vixeny, the `only` keyword is specifically related to bypass everything and `only` include what is required

Here's the example from your code:

```typescript
{
  path: '/query/onlyName',
  only: ["query"],
  f: context => `Hello ${context.query?.name || 'default'}`
}
```

These features (`add`, `delete`, and `only`) allow for fine-grained control over what information is made available to route handling functions, enabling better performance and safety.

### Debugging (work in progress)

Understanding and monitoring how Vixeny operates within a given context is made easier with the DebugOptions type. This allows for console logging of the current state. Defined as:

```ts
  {
      path: "/",
      debug: {name: "main", type:"list"},
      f: async context => await context.req.blob()
  }
  // Vixeny in path "/" with the name "main" that is a "function" uses: ["req"]
```
The name field is crucial, as it uniquely identifies what Vixeny is utilizing at that particular context. This provides developers with clear insights into the process and facilitates effective debugging.


### Summary

- **Stringification**: Vixeny's optimizer starts by converting the given function into a string to analyze its tokens, predicting the necessary elements for execution.

- **add**: Used to include additional fields in the arguments, enabling specific parsing aspects.

- **delete**: Allows the removal of specific fields from the arguments, optimizing performance and security.

- **only**: Ignoring anything else forcing to add only what is required.

- **debug**: `Outputs` information of the `context`



## Vixeny's Distinctive Features

Unlike other frameworks, Vixeny introduces a set of unique and powerful concepts that cater to a wide range of development preferences. Here's an overview of what's next:

 
 - **Resolve**:Resolves one or multiple functions before another context requires them, setting up an state.

- **Branch**: Enable conditional execution to provide granular control and flexibility.

- **Composing in Context**: Build complex functionalities by **`chaining`** simpler components within a shared or unique context for cohesive and maintainable code.

- **All together at the same time**: Controlling the flow of data with predictable and modular control.

- **Order Execution**: Control the sequence in which `f`, `resolve`, or `branch` will execute.

- **Mutable (non-functional support)**: Offer support for modifying data structures, in contrast to the immutable approach typical of functional programming. This provides additional flexibility for those who prefer or require it.



<BeforeNext next="/data_flow" />
