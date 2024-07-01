<script>
  import FancyLink from '$lib/components/FancyLink.svelte';
</script>

<svelte:head>

<title>Morphism - Vixeny</title>
<meta name="description" content="Understanding morphism" />
</svelte:head>

# Composing

Now that we know how to create routes and have some insights into what we can
do, let's discuss `petitions` and `composer` and explore why they exist.

The TL;DR is that `petitions` create `Morphic Objects` that maintain structure
across versions, think about it as an abstract route. You can link these objects
together like Legos, and also compose them into functional units with `composer`
to use within Vixeny or wherever else they may be needed.

```ts
import { composer, petitions } from "vixeny";

const req = new Request("http://localhost/");

// Creating a resolve
const getHello = petitions.resolve()({
  f: () => "hello",
});

// Creating a Petition
const response = petitions.standard()({
  // This function is the endpoint for the request
  path: "/THIS_FUNCTION_DOES_HAVE_A_ROUTER",
  resolve: {
    getHello,
  },
  f: ({ resolve }) => new Response(resolve.getHello),
});

// Composing the Petition
const composedPetition = composer.petition(response);

// Composing the Resolve
const composedResolve = composer.anyRequest()(getHello);

console.log(
  // Outputs "hello"
  composedResolve(req),
  // Returns true
  composedResolve(req) ===
    await Promise
      .resolve(composedPetition(req))
      .then((res) => res.text()),
);
```

You will find a detailed explanation of them in `library`.

## Maintainability

Until now, we've primarily focused on functions from `Vixeny`. This focus isn't
simply because the project is functional in nature, but also because Vixeny
ensures that all exported functions are self-contained, promoting:

- **Future-Proof**: Code written today in Vixeny will remain valid in the
  future.
- **Adaptability**: Bug corrections and extensions can be implemented without
  breaking existing code.

Consider the following example:

```ts
import { petitions } from "vixeny";

// Creating a resolve
const getHello = petitions.resolve()({
  f: () => "hello",
});

console.log(getHello);
```

Although `getHello` may seem to be just an object with the key `f`, logging this
function reveals:

```js
{
  f: [Function: f],
  type: "morphism",
  isUsing: [],
  isAsync: false,
  o: undefined,
  ... // and potentially more attributes in the future
}
```

It's crucial to understand that this object is `readonly`. Once `getHello` is
defined, its structure and behavior cannot be altered by any of Vixeny's tools,
which helps to safeguard the integrity and stability of your applications
against unexpected side effects.

## Types

Vixeny allows different types of petition handling to suit various application
needs. Here, we demonstrate the use of `custom` and `standard` petitions, as
well as a simplified approach that does not use the context object (`CTX`).

- **Custom Petition**: The headers are dynamically passed and set based on
  petition configurations and the provided options.
- **Standard Petition (common)**: Utilizes a predefined response format. Note
  that headers are set statically and cannot be altered dynamically within the
  function.
- **Petition Without CTX (response)**: This type bypasses the use of the
  `composer`, offering a straightforward way to return responses with predefined
  headers.

Let's add some CORS settings and see these petitions in action:

```ts
const opt = plugins.globalOptions({
  cors: {
    allowOrigins: "*",
    allowMethods: ["GET"],
  },
});

const handler = wrap(opt)()
  .customPetition({
    path: "/custom",
    headings: {
      headers: "text/html",
    },
    f: ({ headers }) =>
      new Response("<p>Hello World!</p>", {
        headers,
      }),
  })
  .stdPetition({
    path: "/std",
    headings: {
      headers: "text/html",
    },
    // Headers are fixed; there's no way to change them dynamically
    f: () =>
      new Response("<p>Hello World!</p>", {
        headers: new Headers([
          ["Content-Type", "text/html"],
        ]),
      }),
  })
  .petitionWithoutCTX({
    path: `/response`,
    r: () =>
      new Response("<p>Hello World!</p>", {
        headers: new Headers([
          ["Content-Type", "text/html"],
        ]),
      }),
  }).testRequests();

// Helper functions
const requestOf = (s: string) => new Request(s);
const logHead = (r: Response) => void console.log(r.headers);

// Results
await handler(requestOf("http://localhost/std"))
  .then(logHead);
await handler(requestOf("http://localhost/custom"))
  .then(logHead);
await handler(requestOf("http://localhost/response"))
  .then(logHead);
```

It's important to note that `petitionWithoutCTX` and `petitions.response` do not
have a `CTX` and are not composed like other functions. This isolation of code,
typically done with `at`, will be covered in the `extending` section.

<FancyLink href="/framework/extending">Next</FancyLink>
