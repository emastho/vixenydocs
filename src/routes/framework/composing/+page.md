<svelte:head>

<title>Morphism - Vixeny</title>
<meta name="description" content="Understanding morphism" />
</svelte:head>

# Composing

Now that we know how to create routes and have some insights into what we can do, let's discuss `petitions` and `composer` and explore why they exist.

The TL;DR is that `petitions` create `typed objects` that maintain structure across versions, think about it as an abstract route. You can link these objects together like Legos, and also compose them into functional units with `composer` to use within Vixeny or wherever else they may be needed.

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

Your explanation about the maintainability of Vixeny code offers valuable insights into the benefits of the framework. I'll refine your text for better clarity and grammatical correctness. Here’s an improved version:

---

## Maintainability

Until now, we've focused primarily on functions from `vixeny`. This emphasis isn't merely because the project is functional in nature, but also because this approach ensures:

- **Future-Proof**: Code written today in Vixeny will remain valid in the future.
- **Adaptability**: Bug corrections and extensions can be made without breaking existing code.

```ts
import { petitions } from "vixeny";

const getHello = petitions.resolve()({
  f: () => "hello",
});

console.log(getHello);
```

Even though `getHello` appears as an object with a key `f`:

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

It's crucial to understand that this is a `readonly` object. This means that once `getHello` is defined, its structure and behavior cannot be altered, which helps to safeguard the integrity and stability against weird side effects, also, this behavior extends `wrap` and other applications like `plugins` and `templates`.


## Types

# Composer
