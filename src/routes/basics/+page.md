<script>
  import BeforeNext from "$lib/components/BeforeNext.svelte"
</script>

## Introduction

Welcome to Vixeny, a web framework that offers both the strengths of functional programming and extensive support for other paradigms. Whether you're a seasoned functional programmer, new to the concept, or even if you choose to take a different path altogether, Vixeny has something to offer you.

### Embracing Different Styles

Vixeny is about flexibility, expressiveness, and the joy of coding. Our philosophy embraces various programming approaches, all supported by key features:

- **Functional, but Not Exclusive:** Functional programming is a tool, not a mandate, within Vixeny. If you prefer other paradigms, you'll find support and features to suit your needs. It's about providing different avenues to success, not making things difficult.
<br>
- **Modular and Predictable:** Thanks to its functional nature, Vixeny ensures easy testing with predictable and immutable structures. This design fosters a robust and reliable development environment.
<br>
- **Opt-in Side Effects:** In Vixeny, side effects are an option, not a given. You have the control to explicitly create them when needed. Vixeny can't be mutated without your direct intention.
<br>
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

### 1. Untyped

Untyped petitions are the standard way of defining routes in Vixeny. They don't explicitly define the response type and provide flexibility in handling the request. You can easily set up routes, parameters, queries, and headers without any specific type information. This gives you a lot of freedom but can potentially lead to issues if you're expecting specific types and don't receive them.

Examples of untyped petitions are found throughout the documentation, such as basic route definition:

```typescript
{
  path: "/",
  f: () => "hello world",
}
```

### 2. Type Request

Type request petitions change the return type from `BodyInit` to `Response`. This means that the route must return a Response object. It gives you more control over the HTTP response, allowing you to set specific status codes, headers, and other properties.

Here's an example:

```typescript
{
    path: "/response/who/:name",
    type: "request",
    f: (req) => (req.param.name === "Bun" || req.param.name === "Deno")
        ? new Response("Welcome", {status:200})
        : new Response("Only devs here", {status: 400})
}
```

### 3. Type Response

When the petition type is set to "response," the optimizer is bypassed. A Request object is directly received, and a Response object is returned. This gives full control over the request and response cycle, allowing for direct manipulation of the HTTP objects. It can be beneficial when you need complete control over the HTTP processing.

Here's an example:

```typescript
{
  path: "/response/hello",
  type: "response",
  r: (request) => new Response("Hello world!")    
}
```

### Summary

- **Untyped**: General-purpose petitions that don't require explicit typing. Flexible but can be less precise.
- **Type Request**: Changes the return type to `Response`, allowing more control over the response, such as custom status codes.
- **Type Response**: Bypasses the optimizer, receiving a Request object and returning a Response object directly, offering full control over the HTTP request-response cycle.



<BeforeNext next="/two" />