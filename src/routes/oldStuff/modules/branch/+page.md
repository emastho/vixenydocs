## Branch

As its name implies, **`branch`** gives us a way to create functions within the `context`, which will be `composed` by Vixeny. These functions are designed to handle different branches of logic.

The `context` will receive the arguments in `arguments`, and these functions can be **`asynchronous`**. This means you can use asynchronous operations like fetching data or performing calculations without blocking the main thread.

Here's a simple example of using a `branch`:

```ts
{
    path: "/branch",
    f: c => c.branch.hello("hi") as string,
    branch: {
        name: "hello",
        f: c => c.arguments
    }
}
```

Or even multiple branches:

```ts
{
    path: "/branches",
    f: c =>
        c.branch.left("Hello ") as string +
        c.branch.right("world!") as string,
    branch: [
        {
            name: "left",
            f: c => c.arguments
        },
        {
            name: "right",
            f: c => c.arguments
        }
    ]
}
```

### Interplay with Resolve

Thanks to Vixeny's functional behavior, branches can interact with the resolve property, allowing complex compositions:

```ts
{
    path: "/branch",
    f: c => c.branch.hello("world!") as string,
    branch: {
        resolve: {
            name: "prefix",
            f: () => "hello"
        },
        name: "hello",
        f: c =>
            c.resolve.prefix as string +
            c.arguments as string
    }
}
```

or

```ts
{
    path: "/branch",
    resolve: {
        name: "hello",
        f: c =>  c.branch.fun("hello"),
        branch: {
            name: "fun",
            f: c => c.arguments
        }
    },
    f: c => c.resolve.hello as string,
}
```

### Conditional Branching

Laziness, an essential concept in functional programming, allows invoking a function only if a condition is fulfilled. Here's an example using branch:

```ts
//assuming that the user name will be passed by query
{
    path: "/user/:runtime",
    f: c =>
        c.param.runtime === "bun"
            ? c.branch.deno() as string
            : c.param.runtime == "deno"
                ? c.branch.bun() as string
                : "Sorry, we are only working on bun or deno"
    branch: [
        {
            name: "bun",
            f: c =>
                "Hello Bun user: " +
                c.query?.user ?? "no user found"
        },
        {
            name: "deno",
            f: c =>
                "Hello Deno user: " +
                c.query?.user ?? "no user found"
        }
    ]
}
```

### Why Branch?

Branching in Vixeny brings several key benefits:

- **Flexibility**: You can define a variety of logical paths and handle them seamlessly.
- **Laziness**: Invoke functions only when needed, improving efficiency.
- **Modularity**: Isolate specific logic into branches, making your code easier to understand, test, and maintain.
  Composability: Interact with other functionalities like resolve to create complex yet elegant solutions.
  By embracing the branch feature, developers can achieve greater control and expressiveness in their Vixeny applications, managing the flow of data with precision and elegance.
