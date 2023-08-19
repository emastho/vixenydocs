<script>
	import Iconie from "$lib/components/Iconie.svelte"
	import BeforeNext from "$lib/components/BeforeNext.svelte"
</script>

<svelte:head>
    <title>Data Control - Vixeny</title>
    <meta name="description" content="About this page" />
</svelte:head>

# Data Flow

Programming is about controlling the flow of data independently of the paradigm that you use, Vixeny has 3 main tools to take advantage of this

- **`Resolve:`** It chains a function to another, making the linked function resolve first passing those values to the next link, it has its own `context` and `return`.
- **`Branch:`** A Lazy function to branch out, that has its own `context`, `arguments`, `return`.
- **`Mutable:`** A mutable object that persist between context.

It's important to understand that all the functions, methods, and values in **`f`** are unique, and each context is pure (unless you use `Mutable`, where it will become a common link). This means that while Vixeny maintains her purely functional nature, the `Mutable` object offers a carefully controlled way to introduce mutable state where needed.
<br>

Also it is important to understand that `Data Flow` is the foundation for plug-ins , helpers and more.
## Resolve
If a `resolve`, the main `f`, or `branch` has a `resolve`, this function will be resolved first and passed to `resolve.NAME`. This also applies to `promises`.
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
        f: async f => await f.req.blob()
    },
    //this function is sync because of the way Vixeny unwraps and resolves
    f: f => f.resolve.hello as string
}
```
Also, you can resolve many elements at the same time.

```ts
{
    path: "/multiple",
    resolve: [
        {
            name: "blob",
            f: async f => await f.req.blob()
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
            f: f =>  " id : " + f.param.id
        },
        f : f => " query :" + (f.query?.hello ?? " no query ")
            + f.resolve.response as string
    },
    f:  f => f.resolve.response as string
}
```

There's a lot to take in but you might be asking, why do I have to do this if I could use a procedure (which is a valid way to do it)?	
Well, there are 3 reasons:

 - **`Almost cero cost abstraction`**: this kind of compositions doesn't really hurt performance and in some cases it's faster.
 - **`Testable`**: Later on, we will see how we can test your `petitions` in a `pure` form where there is not need of databases or any factor outside of Vixeny.
 - **`Composable`**: Treating `petitions` as values allow us to reuse, modify and merge them at our will.

## Branch

As its name implies, **`branch`** gives us a way to create function in the context which would be `composed` by Vixeny, the `context` will get the arguments in `arguments` , this functions can be **`asynchronous`**

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
or
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
Thanks to Vixeny's functional behavior, a `resolve` can `branch` out and `branch` can use `resolve` in any pattern or deepness that we need or until we call to the stack.

```ts
{
    path: "/branch",
    f: f => f.branch.hello("world!") as string,
    branch: {
        resolve: {
            name: "prefix",
            f: () => "hello"
        },
        name: "hello",
        f: f => 
            f.resolve.prefix as string +  
            f.arguments as string
    }
}
```
or
```ts
{
    path: "/branch",
    resolve: {
        name: "hello",
        f: c =>  c.branch.return("hello"),
        branch: {
            name: "return",
            f: c => c.arguments
        }
    },
    f: f => c.resolve.hello as string,
}
```
So why do we need them? Laziness is an important concept in functional programming and sometimes we only want to invoke a function if a condition is fullfil, for example:
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
In this way, we can control the data flow using only what is needed.


## Mutable

In the world of functional programming, immutability is often prized, and Vixeny adheres strictly to this principle. However, that doesn't mean there's no room for mutability in certain contexts. 
<br>

Vixeny is purely functional, and by design, she can't alter anything. For those who come from a non-functional programming background, this may seem restrictive or unfamiliar. But there's a deliberate reason for this design choice. In functional programming, we avoid mutations because they can lead to unpredictable behavior and make the code harder to understand and maintain. 
<br>

The use of `mutable` is neither discouraged nor promoted; it's a tool provided for those specific scenarios where mutable state is necessary. While it might not be a requirement for using Vixeny, especially for those deeply rooted in functional programming principles, it offers flexibility for various use cases and allows a broader range of developers to adapt Vixeny to their needs and preferences.
<br>

To use `mutable` you have to declare it at the beginning in the petition, also, we going to cover naming conventions in the next chapter

```ts
{
    path: "/mutable",
    mutable: true,
    //  the function is "example", resolves with name "hello", which mutates "result"
    resolve: {...example_r_$hello_m_$result_string},
    f: f => f.mutable.result as string,
}
```
Mutable is global and it works at any deepness

```ts
{
    path: "/mutable",
    mutable: true,
    //  the function is "example", resolves with name "hello", which mutates "result"
    resolve: {...example_r_$hello_m_$result_string},
    f: f => f.branch.function("Hello") as string,
    branch: {
        name: "function",
        f: c => c.arguments + c.mutable.result as string
    }
}
```
<BeforeNext previous="/basics" next="/data_control" />
