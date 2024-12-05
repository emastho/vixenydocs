## Resolution

Unlike traditional frameworks that rely on life cycles for code execution and
rendering management, Vixeny employs a concept called "resolution." A resolution
is defined as:

> A resolution involves chaining the resolution of any morphism (petition) by
> its resolve.

Still wondering what that means? In simpler terms, anything defined with a
`resolve` must be fully resolved before its caller can access it. This creates a
chain of dependencies that are resolved in sequence.

At the heart of Vixeny lies a fundamental type known as a "Morphism." While this
concept is abstracted away to keep things simple. Essentially, anything with an
`f` (a functor) is considered a "Morphism", and for simpicity, we will bundle
both terms as `petition`.

> Any `resolve` or `branch` can be utilized within a `Morphism`, but there are
> not considered `petitions`, meaning, you can not use them directly in a
> `wrap`.

Let's break it down with more examples.

<object type="image/svg+xml" data="/d2/resolution.svg"></object>

## Resolve Properties

Vixeny's resolution mechanism ensures that data dependencies are resolved before
the main function is executed (Basically an import for the ctx). Simplifying
asynchronous data handling and composition. Below, we explore key properties of
resolution in Vixeny.

### SyncAgnostic

Vixeny's design ensures that the signature of your functor (function), `f`,
remains unaffected by whether its dependencies, declared in `resolve`, are
synchronous or asynchronous. This allows for greater flexibility and simplicity,
specially when it comes to testing:

```javascript
import { wrap } from "vixeny";

const hello = petitions.resolve()({
  f: async () => await Promise.resolve("Hello"),
});

wrap(options)().get({
  path: "/helloWorld",
  resolve: {
    // Adding `hello`.
    hello,
    // Everything in vixeny is nameless and stateless by nature.
    world: { f: () => "world" },
  },
  // Important to notice that `f` is synchronous even if the resolve `hello` is not.
  f: ({ resolve }) => `${resolve.hello} ${resolve.world}`,
});
```
