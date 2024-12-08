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

</svelte:head>

# Welcome to Vixeny!

We’re happy to have you exploring our framework!. Vixeny is all about making web
development straightforward and enjoyable, no matter your background in coding.
Whether you're just starting out or looking to shift into a new style of
programming, we’ve designed Vixeny to be as welcoming as possible.

## So, What's this project?

An ecosystem of functional web tools, that aims to make code more:

- `Open`: All our tools are exportable and can be used in other project.
- `Reusable`: Make it once and use it again, every element can be reused and composed in many ways.
- `Testable`: Thanks to its monolithic structure, it can be tested at any
  state.
- `Smart`: Asyncronless with an integrated system that helps you to detect bugs
  and optimize your code on the fly.

- `Safe and maintainable`: Everything is deterministic, and its object-based
  structure allows the maintainers to easily add things without needing to push
  broken code changes.

- `Fast`: Fastest framework when it comes to `Request -> Response` handlers in not only Deno but
  also Bun.

<object type="image/svg+xml" data="/d2/ecosystem.svg"></object>

## How?

Don't sweat the fancy "functional programming" stuff. Vixeny is made to be friendly for everyone. Our guides are split into simple levels, so you only pick up what you actually need, step by step.

## Why `Vixeny`?

It got its name because it’s like a coding style that’s easy to learn and still super rewarding. It helps you see everything clearly at any point.

You can copy, paste, and run all the examples. There’s an example for everything!

Now, let’s go from zero to hero with Vixeny!

## Quick start

Designed to be backward compatible and runtime agnostic, ensures that
code you write today will continue to work seamlessly in the future, whether
you're using Deno or Bun.

Ready to start? Just run these commands to install our templates:

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

Routes are called petitions. A petition is just an object with a path and a function f that does something when someone visits that path. Here’s a simple example:

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

Vixeny’s architecture ensures that all petitions work across different versions right out of the box!

### Reusability

Vixeny also offers two special petitions, `resolve` and `branch`, which we’ll show you later. For now, here's a quick look at what you can do:

<Tabs data={tab0}/>

<object type="image/svg+xml" data="/d2/use_of_resolve.svg"></object>

In practice, you'll rarely need to manually declare petitions like this, that's why we have `wrap`


## Wrap

The `wrap` function helps you work with petitions without hassle. With `wrap`, you can:

- Keep things clean and avoid side effects.
- Test petitions without starting a server.
- Debug easily.
- Deploy quickly.
- And much more!


<Tabs data={tab1}/>


### Testing

You can test everything without running a server and even mock parts of your code to try out different scenarios. 

<Tabs data={tab3}/>

### Mocking

Supports testing individual petitions by injecting values while **preserving their structure**:

<Tabs data={tab4}/>

Vixeny is fully typed, so you get tooltips and hints right in your editor.

## Keyboard mode

Do you like to use your keyboard? Here some tips:

| Shortcut | Action             |
|----------|--------------------|
| Shift + S | Focus search bar  |
| Shift + A | Focus first element |
| Shift + Z | Zen mode          |
| Shift + L | Light / Dark mode |
| Tab       | Jump faster!      |


## Guides

Want to learn more? We’ve got guides to help you with everything:

<ListOfGuides />

Thanks for stopping by!
