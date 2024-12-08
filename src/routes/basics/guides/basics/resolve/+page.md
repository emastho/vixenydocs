<script>
  import ListOfComponents from '$lib/components/listofBasic.svelte';
</script>

<svelte:head>


<title>Resolve - Vixeny</title>
  <meta name="description" content="Understanding resolve"/>
  <meta name="keywords" content="resolve, web development, Vixeny framework, FP, functional programming"/>
</svelte:head>

# Resolve

Resolves in Vixeny ensure that all necessary data dependencies are resolved
before the main function is executed. This mechanism simplifies asynchronous
data handling and composition, making your code more modular and maintainable.

#### Key Properties

- **SyncAgnostic**: The signature of your function remains unaffected by whether
  its dependencies are synchronous or asynchronous.
- **Mockable**: Simplifies the process of mocking dependencies for testing
  purposes without the need for actual calls.
- **Composable and Reusable**: Allows for the reuse and on-the-fly modification
  of any morphism.

### Example Usage

Below are some examples demonstrating the usage of resolves within Vixeny.

#### Basic Resolve

```javascript
import { petitions, wrap } from "vixeny";

// Setting up a resolution
const sayHello = petitions.resolve()({
  f: () => "hello",
});

// Creating a petition
const hey = petitions.add()({
  path: "/hey",
  resolve: {
    sayHello,
  },
  f: ({ resolve }) => `${resolve.sayHello} World!`,
});

const serve = wrap(options)()
  .addAnyPetition(hey);
```

#### Using Resolve with Asynchronous Functions

```javascript
import { petitions, wrap } from "vixeny";

// Defining an asynchronous resolve function
const hello = petitions.resolve()({
  f: async () => await Promise.resolve("Hello"),
});

// Using the resolve in a petition
wrap(options)()
  .get({
    path: "/helloWorld",
    resolve: {
      hello,
      world: { f: () => "world" },
    },
    f: (ctx) => `${ctx.resolve.hello} ${ctx.resolve.world}`,
  });
```

#### Nested Resolves

```javascript
import { petitions, wrap } from "vixeny";

// Nested resolve
const nested = petitions.resolve()({
  f: () => "hello",
});

// Handler with nested resolve
const handler = wrap()()
  .get({
    path: "/",
    resolve: {
      nested,
    },
    f: (ctx) => ctx.resolve.nested,
  })
  .compose();

console.log(
  await handler(new Request("http://localhost/"))
    .then((res) => res.text()),
);
```

## List

<ListOfComponents />
