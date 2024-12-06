<script>
  import { Tabs as Tab, TabItem } from 'flowbite-svelte';
  import ListOfGuides from '$lib/components/listofGuides.svelte';
    import Tabs from "$lib/components/Tabs.md"
    import Bash from "$lib/components/SmallComponents/Bash.md"
    import example0 from "$lib/examples/intro_core_0.md"
    import example1 from "$lib/examples/intro_core_1.md"
    import example2 from "$lib/examples/intro_core_2.md"
    import example3 from "$lib/examples/intro_core_3.md"
	import example4 from "$lib/examples/intro_core_4.md"
    //import FancyLink from '$lib/components/FancyLink.svelte';

    const install = [
        {title: "Bun", component: Bash, details: {runtime: "bun"}},
        {title: "Deno", component: Bash, details: {runtime: "deno"}}
    ]
    const tab0 = [
        {title: "example", component: example0, details: {runtime: "one"}},
        {title: "query validation", component: example0, details: {runtime: "two"}},
    ]

    const tab1 = [
        {title: "example", component: example1, details: {runtime: "main"}},
        {title: "query validation", component: example1, details: {runtime: "setup"}}
    ]

    const tab2 = [
        {title: "main.ts", component: example2, details: {runtime: "main"}},
        {title: "setup.ts", component: example2, details: {runtime: "setup"}}
    ]

    const tab3 = [
        {title: "wrap", component: example3, details: {runtime: "main"}},
        {title: "unit", component: example3, details: {runtime: "setup"}}
    ]

	const tab4 = [
        {title: "lotery", component: example4, details: {runtime: "main"}},
        {title: "weather forecast", component: example4, details: {runtime: "setup"}}
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

We’re happy to have you exploring our framework!. Vixeny is all about making web
development straightforward and enjoyable, no matter your background in coding.
Whether you're just starting out or looking to shift into a new style of
programming, we’ve designed Vixeny to be as welcoming as possible.

## So, What's this project?

An ecosystem of functional web tools, that aims to make code more:

- `Open` : All our tools are exportable and can be used in other frameworks or
  projects.

- `Reusable` : Make it once and use it again, because of the purity of `Vixeny`,
  every element can be reused and composed in many ways.

- `Testable` : Thanks to its monolithic structure, it can be tested at any
  state.

- `Smart` : Asyncronless with an integrated system that helps you to detect bugs
  and optimize your code on the fly.

- `Safe and maintainable` : Everything is deterministic, and its object-based
  structure allows the maintainers to easily add things without needing to push
  broken code changes.

- `Fast` : Holding the record of being the fastest framework when it comes to
  `(r: Request) => Response | Promise<Response>` handlers innot only Deno but
  also Bun.

<object type="image/svg+xml" data="/d2/ecosystem.svg"></object>

## How?

Actually, it all boils down to the functional paradigm, but let's keep things
straightforward. Vixeny was crafted with friendliness in mind for everyone! So,
you won’t be bogged down by complex tutorials on functional programming.
Instead, you’re here to explore the flexibility and to apply it wherever it
suits your needs.

## Why `Vixeny`?

Vixeny's name comes from seeing her like a style of coding, it's not difficult
to learn but rewarding, focusing more on the flow of your code, with that unique
ability to see everything at any point with full transparency.

And remember, you can copy, paste and run all the examples! and there are
examples for everything!.

Now, without further ado, let's embark on your journey from 'zero to hero' with
Vixeny!

## Quick start

Designed to be backward compatible and runtime agnostic, Vixeny ensures that
code you write today will continue to work seamlessly in the future, whether
you're using Deno, Bun, or any other environment.

To get started, you can install our fully-equipped templates from the next
commands below:

<Tab defaultClass="tab">
  <TabItem title="bun" open>

```bash
bun create vixeny
```

</TabItem>
  <TabItem title="deno">

```bash
npx create-vixeny
```

</TabItem>
</Tab>

## Petitions

In Vixeny, routes and are referred to as `petitions`. These are objects that
necessitate a function, denoted as `f`, and a `path`. The example below
illustrates how to define a basic petition:

```javascript
import { petitions } from "vixeny";

// Returning a `BodyInit`
const helloWorld = petitions.add()({
  path: "/hello",
  f: () => "hello World!",
});

// Returning a `Response`
const ping = petitions.add()({
  path: "/ping",
  f: () => new Response("pong"),
});

console.log(helloWorld);
```

<object type="image/svg+xml" data="/d2/petition_cycle.svg"></object>

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

This level of consistency in Vixeny’s architecture ensures that all petitions
work seamlessly across different versions right out of the box! This design
choice not only simplifies development but also enhances maintainability and
scalability.

### Reusability

Vixeny also offers two special petitions, `resolve` and `branch`, which we'll
delve into later. For now, here's a quick look at what you can do:

<Tabs data={tab0}/>

<object type="image/svg+xml" data="/d2/use_of_resolve.svg"></object>

In practice, you'll rarely need to manually declare petitions like this.
Instead, our `wrap` feature simplifies handling petitions and integrating all
our tools.

## Wrap

The `wrap` function in Vixeny is a pure function meticulously designed to the
handling and manipulation of petitions. With `wrap`, you can:

- **Avoid side effects** to ensure your code remains clean and predictable.
- **Test or mock** the entire wrap or individual petitions.
- **Debug on the spot**, Checking issues with just a line of code.
- **Deploy your application** efficiently with built-in support.
- **And much more...**

<Tabs data={tab1}/>

While this section acts more as a showcase, you can delve deeper and see `wrap`
in action with examples of each method here:

[Explore `wrap` Examples.](/library/wrap/)

### Testing

Vixeny can be tested without the need for a `serve`, allowing for individual or
comprehensive testing of wraps:

<Tabs data={tab3}/>

### Mocking

Supports testing individual petitions by injecting values while preserving their
structure:

<Tabs data={tab4}/>

Vixeny is fully typed, with JSDoc examples provided for ease of use. Hover over
the code in your IDE to check.


## Guides

Here some guides for you!

<ListOfGuides />

Thanks for your time!
