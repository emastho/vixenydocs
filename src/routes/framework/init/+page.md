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

<title>Quick start - Vixeny</title>
<meta name="description" content="How to install Vixeny" />
</svelte:head>

# Introduction

Welcome to Vixeny! We're glad you're here. We're not just about coding—we're
about bringing people together. Making web development easier for everyone, no
matter your experience level. Let's get started and see how Vixeny can help you
create something amazing with ease!

## So, What's this project?

An ecosystem of functional web tools, that aims to make code more:

- `Open` : All our tools are exportable and can be used in other frameworks and
  projects

- `Reusable` : Make it once and use it again, because of the purity of `Vixeny`,
  every element can be reused and composed in many ways.

- `Testable` : Thanks to its monolithic structure, it can be tested in any state

- `Smart` : Asyncronless with an integrated system that helps you to detect bugs
  and optimize your code on the fly.

- `Safe and maintainable` : Everything is deterministic, and its object-based
  structure allows the maintainers to easily add things without needing to push
  broken code changes.

- `Fast` : Holding the record of being the fastest framework when it comes to
  `(r: Request) => Response | Promise<Response>` handlers innot only Deno but
  also Bun.

## How?

Well, it's all thanks to the functional paradigm, but don't get it twisted,
Vixeny was designed to be as friendly as possible with everyone! so don't expect
a tutorial on how to learn FP, you are here to enjoy the flexibility of Vixeny
and to use it wherever you need it.

## Why `Vixeny`?

Vixeny's name comes from seeing her like a style of coding, it's not difficult
to learn but different and rewarding, focusing more on the flow of your code,
with that unique ability to see everything at any point with full transparency.

Without more delays, let's start with our basics~

# Quick start

Ready to install?.

<Tabs data={install}/>

<br>

# Creating Your First Petition

In Vixeny, routes are referred to as `petitions`. These are objects that necessitate a function, denoted as `f`, and a `path`. The example below illustrates how to define a basic petition:

```javascript
import { petitions } from "vixeny";

// Returning a `BodyInit`
const helloWorld = petitions.common()({
  path: "/hello",
  f: () => "helloWorld",
});


```

There are some special petitions `resolve` and `branch` that will cover
later but here a quick snapshot of the you can do:

<Tabs data={tab0}/>

<br>

# Wrap

The `wrap` is a pure function designed to facilitate the handling and
manipulation of petitions. It allows you to configure options, and incorporate a
suite of tools for debugging, testing, and more.

<Tabs data={tab1}/>

## Debugging

With `wrap`, you can easily inspect the current state at any point between
methods:

<Tabs data={tab2}/>

## Testing

Vixeny can be tested without the need for a handler, allowing for individual or
comprehensive testing of wraps:

<Tabs data={tab3}/>

## Mocking

Vixeny supports testing individual petitions by injecting values while
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

# Resolution

Unlike traditional frameworks that rely on life cycles for code execution and
rendering management, Vixeny employs a concept called "resolution." A resolution
is defined as:

> The chaining of the resolution of any morphism by its `resolve`.

What does that even mean?! well, anything with a `resolve`, has to be resolved
before its caller accesses to it, making a chain, let's see more examples.

## Morphism

The most fundamental type in Vixeny is a "Morphism." Something extends to
anything that has an `f`, and they can be linked together making powerful
monolithic structures (All code interconnected and tightly integrated).

```javascript
import { composer, petitions } from "vixeny";

const request = new Request("http://localhost/");

const nested = petitions.resolve()({
  f: () => "hello",
});

const hello = composer.anyRequest()({
  resolve: {
    // Nested resolve
    nested,
  },
  f: (f) => f.resolve.nested,
});

console.log(
  //hello
  hello(request),
);
```

> Any `resolve` or `branch` can be utilized within a `morphism`, but there are
> not considered `petitions`, meaning, you can not use them directly in a
> `wrap`.

Let's break it down with more examples.

## Resolve Properties

Vixeny's resolution mechanism ensures that data dependencies are resolved before
the main function is executed. Simplifying asynchronous data handling and
composition. Below, we explore key properties of resolution in Vixeny.

### Resolves

The resolution process guarantees that all necessary data is fetched and
available for use within your petitions.

```javascript
import { wrap } from "vixeny";

wrap(options)().stdPetition({
  path: "/withResolve",
  resolve: {
    hi: { f: () => "Hello world" },
  },
  f: (ctx) => ctx.resolve.hi,
});
```

### SyncAgnostic

Vixeny's design ensures that the signature of your functor (function), `f`,
remains unaffected by whether its dependencies, declared in `resolve`, are
synchronous or asynchronous. This allows for greater flexibility and simplicity
in defining your application's logic:

```javascript
import { wrap } from "vixeny";

const hello = petitions.resolve()(
  { f: async () => await Promise.resolve("Hello") },
);

wrap(options)().stdPetition({
  path: "/helloWorld",
  resolve: {
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
purposes, as shown below:

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
