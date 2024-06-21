<script>
    import Tabs from "$lib/components/Tabs.md"
    import Bash from "$lib/components/SmallComponents/Bash.md"
    import example1 from "$lib/examples/intro_core_0.md"
    const tab1 = [
        {title: "Bun", component: Bash, details: {runtime: "bun"}},
        {title: "Deno", component: Bash, details: {runtime: "deno"}}
    ]

    const tab2 = [
        {title: "main.ts", component: example1, details: {runtime: "main"}},
        {title: "setup.ts", component: example1, details: {runtime: "setup"}}
    ]
</script>
<svelte:head>
    <title>Quick start - Vixeny</title>
    <meta name="description" content="How to install Vixeny" />
</svelte:head>

# Introduction

Welcome to Vixeny! We're glad you're here. We're not just about coding—we're about bringing people together. Making web development easier for everyone, no matter your experience level. Let's get started and see how Vixeny can help you create something amazing with ease!

## So, What's this project?

An ecosystem of functional web tools, that aims to make code more: 

- Open: All our
tools are exportable and can be used in other frameworks and projects

- Reusable: Make it once and use it again, because of the purity of `Vixeny`,
every element can be reused and composed in many ways. 

- Testable: Thanks to its monolithic structure, it can be tested in any state 

- Smart: Asyncronless with an integrated system that helps you to detect bugs and optimize your code on the
fly. 

- Safe and maintainable: Everything is deterministic, and its object-based structure allows the maintainers to easily add things without needing to push
broken code changes. 

- Fast: Holding the record of being the fastest framework when it comes to `(r: Request) => Response | Promise<Response>` handlers innot only Deno but also Bun

## How?

Well, it's all thanks to the functional paradigm, but don't get it twisted, Vixeny was designed to be as friendly as possible with everyone! so don't expect a tutorial on how to learn FP, you are here to enjoy the flexibility of Vixeny and to use it wherever you need it.

## Why `Vixeny`?

Vixeny's name comes from seeing her like a style of coding, it's not difficult to learn but different and rewarding, focusing more on the flow of your code, with that unique ability to see everything at any point with full transparency.

Without more delays, let's start with our basics~

# Petitions

In Vixeny, routes are referred to as "petitions." These are objects that in almost all cases necessitate a function, denoted as `f`, and a `path`. The example below illustrates how to define a basic petition:

```javascript
import { petitions } from "vixeny";

// Returning a `BodyInit` 
const helloWorld = petitions.common()({
  path: "/hello",
  f: () => "helloWorld",
});

// Returning a `Response` 
const ping = petitions.standard()({
  path: "/ping",
  f: () => new Response("Pong"),
});

```

This there are some special petitions `resolve` and `branch` that will cover later but here a quick snapshot of the you can do:

```ts
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
```



# Wrap

The `wrap` is a pure function designed to facilitate the handling and manipulation of petitions. It allows you to configure options, and incorporate a suite of tools for debugging, testing, and more.

```javascript
const options = {...}; // Optional configuration

  export const root = wrap(options)()
  .stdPetition({
    path: "/ping",
    f: () => "pong"
  })
  .addAnyPetition(helloWorld)
  ;
```

### Debugging

With `wrap`, you can easily inspect the current state at any point between methods:

```javascript
const server = wrap()()
  .stdPetition({
    path: "/one",
    f: () => "one",
  })
  // Logging the paths after adding the first petition:
  .logPaths()
  .stdPetition({
    path: "/two",
    f: () => "two",
  })
  // Logging the paths after adding the second petition:
  .logPaths()
  .union(root.unwrap())
  .logPaths();
// Logging the paths including `/hello`
```

### Testing

Vixeny can be tested without the need for a server, allowing for individual or comprehensive testing of wraps:

<Tabs data={tab2}/>

### Mocking

Vixeny supports testing individual petitions by injecting values while preserving their structure:

```javascript
const request = new Request("http://localhost/one");
const paths = wrap()()
  .stdPetition({
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

### Join

You can combine petitions from another `wrap` instance with the current one, allowing for the reuse of petitions across different parts of your application:

```javascript
// Assuming `server`
export default wrap()()
  .union(server.unwrap())
  .stdPetition({
    path: "/hello",
    f: () => "helloWorld",
  })
  .logPaths(); // Outputs paths from both the current wrap and the imported `extension`.
```

Vixeny is fully typed, with JSDoc examples provided for ease of use. Hover over the code in your IDE to check.

# Resolution

Unlike traditional frameworks that rely on life cycles for code execution and
rendering management, Vixeny employs a concept called "resolution." A resolution
is defined as:

> The chaining of the resolution of any morphism by its `resolve`.


What does that even mean?! well, anything with a `resolve`, has to be resolved before its caller accesses to it, making a chain, let's see more examples.

## Morphism

The most fundamental type in Vixeny is a "Morphism." Something extends to anything that has an `f`, and they can be linked together making powerful monolithic structures (All code combined, tightly linked).

```javascript
// Resolve
const hello = petitions.resolve()(
  {
    resolve: {
      // Nested resolve
      nested: {
        f: () => "hello",
      },
    },
    f: (f) => f.resolve.nested,
  },
);
```

> Any `resolve` or `branch` can be utilized within a `morphism`, but there are
> not considered `petitions`, meaning, you can not use them directly in a
> `wrap`.

## Resolve Properties

Vixeny's resolution mechanism ensures that data dependencies are resolved before
the main function is executed. Simplifying asynchronous data handling. Below, we
explore key properties of resolution in Vixeny.

### Resolves

The resolution process guarantees that all necessary data is fetched and
available for use within your petitions.

```javascript
wrap(options)()
  .stdPetition({
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
wrap(options)()
  .stdPetition({
    path: "/helloWorld",
    resolve: {
      hello: { f: async () => await Promise.resolve("Hello") },
      world: { f: () => "world" },
    },
    // Important to notice that `f` is synchronous even if the resolve `hello` is not.
    f: (ctx) => `${ctx.resolve.hello} ${ctx.resolve.world}`,
  });
```

### Mockable

This design also simplifies the process of mocking dependencies for testing
purposes, as shown below:

```javascript
// Define the original asynchronous resolve function for fetching weather data
const routes = wrap(options)()
  .stdPetition({
    path: "/weather",
    resolve: {
      currentWeather: {
        f: async () =>
          await fetch("https://api.weather.com/current").then((res) =>
            res.json()
          ),
      },
    },
    f: (c) =>
      c.resolve.currentWeather.temperature > 75
        ? "It's warm outside"
        : "It's cool outside",
  });

// Mock the resolve function for testing
const mockedWeatherResolve = () => ({ temperature: 80 });

// Inject the mocked resolve
const mockRoutes = routes.handleRequest("/weather")({
  resolve: {
    currentWeather: mockedWeatherResolve,
  },
});

// Test the behavior with mocked data
test("/weather", async () => {
  expect(
    await mockRoutes(new Request("/weather")).then((res) => res.text()),
  ).toStrictEqual("It's warm outside");
});
```

### Composable and Reusable

The resolution mechanism allows for the reuse and on-the-fly modification of any
morphism, making your code more modular and maintainable:

```javascript

// Setting up a resolution
const sayHello = petitions.resolve()({
  f: () => "hello",
});

const hey = petitions.common()({
  path: "/hey",
  resolve: {
    sayHello,
  }
  f: ({ resolve , branch }) => `${resolve.sayHello} World!`,
});

const serve = wrap(options)()
  .addAnyPetition(hey)

```

> This feature underscores the importance of utilizing `morphism` to ensure type
> safety within your functions.

# Composer

The `composer` in Vixeny plays a crucial role by overseeing the `ctx` within
functions, composing petitions, chaining `resolve` and `branch`, and efficiently
handling both asynchronous and synchronous operations. But what exactly does
this entail? Let's delve into the concept of `ctx` and its role in TypeScript,
which exposes all native functions (including plugins, not covered here):

```typescript
export default wrap()()
  .stdPetition({
    path: "/",
    f: () => "helloWorld",
  })
  // Console logging: []
  .logLastCheck()
  .stdPetition({
    path: "/hello/:id",
    f: (c) => c.param.id,
  })
  // Console logging: ["param"]
  .logLastCheck();
```

The composer analyzes your petitions and selectively adds only the necessary elements to the `CTX`. This process ensures optimal performance and cleaner code by avoiding unnecessary inclusions. However, the optimizer's automated nature means it might not automatically include external function requirements. You can manually specify these as needed:

```typescript
export default wrap()()
  .stdPetition({
    path: "/hello/query1",
    f: (c) => functionOutsideOfContext(c),
  })
  // Console logging: []
  .logLastCheck()
  .stdPetition({
    path: "/hello/query2",
    f: (c) => functionOutsideOfContext(c),
    options: {
      add: ["query"],
    },
  })
  // Console logging: ["query"]
  .logLastCheck();
```

Customization options include `only`, which bypasses the optimizer to add only specified functions; `add`, which includes additional functions; and `remove`, which excludes.

# Quick start

Ready to install it?.

<Tabs data={tab1}/>