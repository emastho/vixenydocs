<script>
    import Tabs from "$lib/components/Tabs.md"
    import Bash from "$lib/components/SmallComponents/Bash.md"
    import example0 from "$lib/examples/intro_core_0.md"
    import example1 from "$lib/examples/intro_core_1.md"
    import example2 from "$lib/examples/intro_core_2.md"
    import example3 from "$lib/examples/intro_core_3.md"
	import example4 from "$lib/examples/intro_core_4.md"
 import FancyLink from '$lib/components/FancyLink.svelte';
    const install = [
        {title: "Bun", component: Bash, details: {runtime: "bun"}},
        {title: "Deno", component: Bash, details: {runtime: "deno"}}
    ]
    const tab0 = [
        {title: "main.ts", component: example0, details: {runtime: "main"}},
        {title: "setup.ts", component: example0, details: {runtime: "setup"}}
    ]

    const tab1 = [
        {title: "main.ts", component: example1, details: {runtime: "main"}},
        {title: "setup.ts", component: example1, details: {runtime: "setup"}}
    ]

    const tab2 = [
        {title: "main.ts", component: example2, details: {runtime: "main"}},
        {title: "setup.ts", component: example2, details: {runtime: "setup"}}
    ]

    const tab3 = [
        {title: "main.ts", component: example3, details: {runtime: "main"}},
        {title: "setup.ts", component: example3, details: {runtime: "setup"}}
    ]

	const tab4 = [
        {title: "main.ts", component: example4, details: {runtime: "main"}},
        {title: "setup.ts", component: example4, details: {runtime: "setup"}}
    ]
</script>

<svelte:head>
    <title>Quick Start with Vixeny Framework - Installation and Examples</title>
    <meta name="description" content="Learn how to quickly start with the Vixeny framework. Find installation guides and code examples for Bun and Deno runtimes." />
    <meta name="keywords" content="Vixeny, web development, framework, installation, Bun, Deno, JavaScript, TypeScript, coding examples, petitions, wrap function, functional programming, reusable code" />
    <meta name="author" content="Vixeny Team" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src='/prism.mjs'></script>
</svelte:head>

# Welcome to Vixeny!

We’re thrilled to have you explore our framework. Vixeny is all about making web development straightforward and enjoyable, no matter your background in coding. Whether you're just starting out or looking to shift into a new style of programming, we’ve designed Vixeny to be as welcoming as possible.

## So, What's this project?

An ecosystem of functional web tools, that aims to make code more:

- `Open` : All our tools are exportable and can be used in other frameworks or 
  projects.

- `Reusable` : Make it once and use it again, because of the purity of `Vixeny`,
  every element can be reused and composed in many ways.

- `Testable` : Thanks to its monolithic structure, it can be tested in any state.

- `Smart` : Asyncronless with an integrated system that helps you to detect bugs
  and optimize your code on the fly.

- `Safe and maintainable` : Everything is deterministic, and its object-based
  structure allows the maintainers to easily add things without needing to push
  broken code changes.

- `Fast` : Holding the record of being the fastest framework when it comes to
  `(r: Request) => Response | Promise<Response>` handlers innot only Deno but
  also Bun.

## How?

Actually, it all boils down to the functional paradigm, but let's keep things straightforward. Vixeny was crafted with friendliness in mind for everyone! So, you won’t be bogged down by complex tutorials on functional programming. Instead, you’re here to explore the flexibility and to apply it wherever it suits your needs.

## Why `Vixeny`?

Vixeny's name comes from seeing her like a style of coding, it's not difficult
to learn but different and rewarding, focusing more on the flow of your code,
with that unique ability to see everything at any point with full transparency.

Now, without further ado, let's embark on your journey from 'zero to hero' with Vixeny!

## Quick start

The best way to dive into Vixeny is by jumping straight into examples. Feel free to copy and run any of the examples provided. Designed to be backward compatible and runtime agnostic, Vixeny ensures that code you write today will continue to work seamlessly in the future, whether you're using Deno, Bun, or any other environment.

To get started, you can install our fully-equipped templates from the links below:

<Tabs data={install}/>

It's recommended to learn how the template engine  works, via the link below.

>  [Template engine](https://vixeny.dev/perspective/create-vixeny)

Enjoy exploring and have fun coding!


## Petitions

In Vixeny, routes are referred to as `petitions`. These are objects that
necessitate a function, denoted as `f`, and a `path`. The example below
illustrates how to define a basic petition:

```javascript 
import { petitions } from "vixeny";

// Returning a `BodyInit`
const helloWorld = petitions.common()({
  path: "/hello",
  f: () => "hello World!",
});

// Returning a `Response`
const ping = petitions.common()({
  path: "/ping",
  f: () => new Response("pong"),
});

console.log(
  helloWorld
)
```

Notice that even if you specify only `path` and `f`, the log output is:

```javascript
  {
    path: "/hello",
    f: [Function: f],
    type: "base",
    o: undefined,
    ... // More in the future
  }
```

This level of consistency in Vixeny’s architecture ensures that all petitions work seamlessly across different versions right out of the box! This design choice not only simplifies development but also enhances maintainability and scalability.

### Reusability

Vixeny also offers two special petitions, `resolve` and `branch`, which we'll delve into later. For now, here's a quick look at what you can do:


<Tabs data={tab0}/>

In practice, you'll rarely need to manually declare petitions like this. Instead, our `wrap` feature simplifies handling petitions and integrating all our tools.


## Wrap


The `wrap` function in Vixeny is a pure function meticulously designed to the handling and manipulation of petitions. With `wrap`, you can:

- **Avoid side effects** to ensure your code remains clean and predictable.
- **Test or mock** the entire wrap or individual petitions.
- **Debug on the spot**, Checking issues with just a line of code.
- **Deploy your application** efficiently with built-in support.
- **And much more...**

<Tabs data={tab1}/>

While this section acts more as a showcase, you can delve deeper and see `wrap` in action with examples of each method here:

[Explore `wrap` Examples.](/library/wrap/)

### Testing

Vixeny can be tested without the need for a `serve`, allowing for individual or
comprehensive testing of wraps:

<Tabs data={tab3}/>

### Mocking

Supports testing individual petitions by injecting values while
preserving their structure:

```javascript
import { wrap } from "vixeny";

const request = new Request("http://localhost/one");

const paths = wrap()().stdPetition({
  path: "/one",
  f: (c) => c.date.toString(),
});

// Handling the request without modifications
const handles = paths.handleRequest("/one")({});

// Handling the request with a mock date injected
const mocked = paths.handleRequest("/one")({
  options: {
    setDate: 1710592645075,
  },
});

// Outputs the current date
console.log(await handles(request).then((r) => r.text()));

// Outputs the mocked date: "1710592645075"
console.log(await mocked(request).then((r) => r.text()));
```

Vixeny is fully typed, with JSDoc examples provided for ease of use. Hover over
the code in your IDE to check.


## Resolution

Unlike traditional frameworks that rely on life cycles for code execution and
rendering management, Vixeny employs a concept called "resolution." A resolution
is defined as:

> A resolution involves chaining the resolution of any morphism (petition) by its resolve.

Still wondering what that means? In simpler terms, anything defined with a `resolve` must be fully resolved before its caller can access it. This creates a chain of dependencies that are resolved in sequence.

## Morphism

At the heart of Vixeny lies a fundamental type known as a "Morphism." While this concept is abstracted away to keep things simple. Essentially, anything with an `f` (a functor) is considered a "Morphism", and for simpicity, we will bundle both terms as `petition`.


```javascript

import { petitions, wrap } from "vixeny";

const request = new Request("http://localhost/");

const nested = petitions.resolve()({
  f: () => "hello",
});


const handler = wrap()()
    .stdPetition({
        path: '/',
        resolve: {
            // Nested resolve
            nested,
          },
          f: (f) => f.resolve.nested,
    })
    // Creates a handler
    .compose()

console.log(
  //hello
  handler(request),
);
```

> Any `resolve` or `branch` can be utilized within a `Morphism`, but there are
> not considered `petitions`, meaning, you can not use them directly in a
> `wrap`.

Let's break it down with more examples.

## Resolve Properties

Vixeny's resolution mechanism ensures that data dependencies are resolved before
the main function is executed (Basically an import for the ctx). Simplifying asynchronous data handling and
composition. Below, we explore key properties of resolution in Vixeny.

### Resolves

The resolution process guarantees that all necessary data is fetched and
available for use within your petitions.

```javascript
import { wrap } from "vixeny";

const request = new Request("http://localhost/");

const handler = wrap()().stdPetition({
  path: "/withResolve",
  resolve: {
    hi: { f: () => "Hello world" },
  },
  f: (ctx) => ctx.resolve.hi,
})
.compose();


console.log(
  handler(request),
);
```

### SyncAgnostic

Vixeny's design ensures that the signature of your functor (function), `f`,
remains unaffected by whether its dependencies, declared in `resolve`, are
synchronous or asynchronous. This allows for greater flexibility and simplicity, 
specially when it comes to testing:

```javascript
import { wrap } from "vixeny";

const hello = petitions.resolve()(
  { f: async () => await Promise.resolve("Hello") },
);

wrap(options)().stdPetition({
  path: "/helloWorld",
  resolve: {
    // Adding `hello`.
    hello,
    // Everything in vixeny is nameless and stateless by nature.
    world: { f: () => "world" },
  },
  // Important to notice that `f` is synchronous even if the resolve `hello` is not.
  f: (ctx) => `${ctx.resolve.hello} ${ctx.resolve.world}`,
});

```

### Mockable

This design also simplifies the process of mocking dependencies for testing
purposes, where we do not need to make the call to test the behaviour, as shown below:

<Tabs data={tab4}/>

### Composable and Reusable

The resolution mechanism allows for the reuse and on-the-fly modification of any
morphism, making your code more modular and maintainable:

```javascript
import { wrap , petitions } from 'vixeny';

// Setting up a resolution
const sayHello = petitions.resolve()({
  f: () => "hello",
});

// Creating a petition
const hey = petitions.common()({
  path: "/hey",
  resolve: {
    sayHello,
  }
  f: ({ resolve }) => `${resolve.sayHello} World!`,
});

const serve = wrap(options)()
  .addAnyPetition(hey)
```

> This feature underscores the importance of utilizing `morphism` to ensure type
> safety within your functions.



<FancyLink href="/framework/routing">Next</FancyLink>
