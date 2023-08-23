<script>
	import Iconie from "$lib/components/Iconie.svelte"
	import BeforeNext from "$lib/components/BeforeNext.svelte"
</script>

<svelte:head>
    <title>Data Control - Vixeny</title>
    <meta name="description" content="About this page" />
</svelte:head>

# Data Flow

Programming is about controlling the flow of data, independently of the paradigm that you use, Vixeny has 3 main tools to take advantage of this.

- **`Resolve:`** It chains a function to another, making the linked function resolve first passing those values to the next link, it has its own `context` and `return`.
- **`Branch:`** A Lazy function to branch out, that has its own `context`, `arguments`, `return`.
- **`Mutable:`** A mutable object that persist between context.

It's important to understand that all the functions, methods, and values in **`f`** are unique, and each context is pure (unless you use `Mutable`, where it will become a common link).This means that even though Vixeny creates new functions or values in each `context`, the `Mutable` object offers a carefully controlled way to introduce mutable state where necessary.

<br>


## Resolve
If a `resolve`, the `petition`, or `branch` has a `resolve`, this function will be resolved first and passed to `resolve.NAME`. This also applies to `promises`.
### Sync
```ts
{
    path: "/sync",
    resolve: {
        name: "nested",
        f: context => context.query?.hello ?? "not found"
    },
    //"nested" is accessible to "context"
    f: context => context.resolve.nested as string
}
```
### Async
```ts
{
    path: "/async",
    resolve: {
        name: "nested",
        //the blob is created before reaching the next step of the chain
        f: async context => await context.req.blob()
    },
    //this function is sync because of the way Vixeny unwraps and resolves
    f: context => context.resolve.hello as string
}
```
Also, you can resolve many elements at the same time.

```ts
{
    path: "/multiple",
    resolve: [
        {
            name: "blob",
            f: async context => await context.req.blob()
        },
        {
            name: "query",
            f: context => context.query?.hello ?? "no query"
        },
    ],
    f: f => f.resolve.blob
            ? "your query is: " + f.resolve.query as string
            : "no body"
}
```
Or you can `chain` them as a pseudo-pipe.
```ts
{
    path: "/nested/:id",
    //nested resolve that response (response)
    resolve: {
        name: "response",
        //nested resolve that response (param)
        resolve: {
            name: "param",
            f: context =>  " id : " + context.param.id
        },
        f : context => " query :" + (context.query?.hello ?? " no query ")
            + context.resolve.response as string
    },
    f:  context => context.resolve.response as string
}
```

So why do we need them? These functionalities are not merely a way to organize code; they represent a robust approach to crafting scalable and maintainable applications. By isolating code and creating powerful and customizable plugins, you're not only enhancing the current development process but also building a foundation that can easily adapt and grow with future needs.

- **`Almost Zero Cost Abstraction`**: These compositions don't really hurt performance, and in some cases, they're even faster. This efficiency means that you can structure your code in a way that makes sense to you without worrying about the overhead.
- **`Testable`**: As we will explore later, you can test your `petitions` in a pure form, where there's no need for databases or any external factors outside of Vixeny. This isolation makes testing more reliable and straightforward.
- **`Composable`**: Treating `petitions` as values allows you to reuse, modify, and merge them at your will. This composability fosters a more modular and adaptable codebase, enabling you to easily tweak or expand functionality.

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


## Mutable

In Vixeny, immutability is a core principle. However, there may be situations where mutable state is required. For those cases, Vixeny provides the `mutable` feature.

The `mutable` property is a powerful tool that can be used when mutable state is necessary. It is neither discouraged nor promoted but offered as a flexible solution to accommodate various needs.

To use `mutable`, you must declare it at the beginning of the petition, as shown below:

```ts
{
    path: "/mutable",
    mutable: true,
    //  the function is "example", resolves with name "hello", which mutates "result"
    resolve: {...example_r_$hello_m_$result_string},
    f: c => c.mutable.result as string,
}
```

The `mutable` object is global and works at any depth within your code:

```ts
{
    path: "/mutable",
    mutable: true,
    //  the function is "example", resolves with name "hello", which mutates "result"
    resolve: {...example_r_$hello_m_$result_string},
    f: c => c.branch.function("Hello") as string,
    branch: {
        name: "function",
        f: c => c.arguments + c.mutable.result as string
    }
}
```

This feature is designed for those specific scenarios where mutable state is required. While not a necessity for all Vixeny users, it provides flexibility for a broader range of developers, allowing them to adapt Vixeny to their specific needs and preferences.


## Conclusion

In Vixeny, the interplay between `Resolve`, `Branch`, and `Mutable` - exemplify the elegance of controlling data flow within the programming paradigm. These elements, while distinct, work in harmony to allow developers to craft scalable, efficient, and flexible applications. From the virtually zero-cost abstraction to the balance between immutability and mutable states, Vixeny encourages a robust approach tailored to individual needs and preferences. As developers familiarize themselves with these core concepts, they unlock the potential to write more composable, testable, and modular code in Vixeny, positioning them for success in both current and future projects.

<BeforeNext previous="/basics" next="/data_control" />
