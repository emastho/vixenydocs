<script>
	import Iconie from "$lib/components/Iconie.svelte"
	import BeforeNext from "$lib/components/BeforeNext.svelte"
</script>

<svelte:head>
    <title>Data Control - Vixeny</title>
    <meta name="description" content="About this page" />
</svelte:head>

# Data Control


## Resolve
If a `resolve`, `f`, or `branch` has a `resolve`, this function will be resolved first. This also applies to `promises`.
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
Also, you can resolve many elements at the same time; there will be a better explanation of the order in which this unwrapping occurs later on.
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



<BeforeNext previous="/basics" next="/data_control" />
