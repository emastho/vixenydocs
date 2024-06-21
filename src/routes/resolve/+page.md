<script>
	import Iconie from "$lib/components/Iconie.svelte";
    import PreviousNext from "$lib/components/PreviousNext.svelte"
    import Heading from "$lib/components/Heading.svelte"
</script>

<svelte:head>
<title>Data Control - Vixeny</title>
<meta name="description" content="About this page" />
</svelte:head>

# Data Flow

Vixeny provides 3 main tools for controlling data flow: `Resolve`, `Branch`, and `Mutable`.

- `Resolve`: Chains functions, resolving the linked function first and passing its values to the next link, with its own `context`, `return`.
- `Branch`: A lazy function to branch out, with its own `context`, `arguments`, `return`.
- `Mutable`: A mutable object that persists between `contexts`.

In Vixeny, functions, methods, and values in **`f`** are unique, and each context is pure unless `Mutable` is used.

<Heading title="Resolve" size="2" />

`resolve`, `petition`, or `branch` can have a `resolve`, which is resolved first and passed to `resolve.NAME`. It applies to `promises` too.

### Sync

```ts
{
    path: "/sync",
    resolve: {
        name: "nested",
        f: context => context.query?.hello ?? "not found"
    },
    f: context => context.resolve.nested as string
}
```

### Async

```ts
{
    path: "/async",
    resolve: {
        name: "nested",
        f: async context => await context.req.blob()
    },
    f: context => context.resolve.hello as string
}
```

**_important:_** Even if this `resolve` is async, it will be resolved and passed as value to the next element in the chain.

Multiple elements can be resolved at the same time or chained as a pseudo-pipe, more about it <a href="/docs/modules/resolve" class="inline-block underline">here</a>.

### Benefits

- `Almost Zero Cost Abstraction`: Efficient code structuring without performance overhead.
- `Testable`: Pure `petitions` allow reliable testing without external factors.
- `Composable`: Reuse, modify, and merge `petitions` for a modular codebase.

<Heading title="Branch" size="2" />

`branch` creates functions within the `context`, composed by Vixeny, to handle different logic branches.

```ts
{
    path: "/branch",
    branch: {
        name: "length",
        f: c => c.length
    },
    f: c => c.branch.length("hello") as string,
}
```

Branches can interact with the resolve property and be conditional, where you can have one or many.

### Benefits

- `Flexibility`: Handle various logical paths seamlessly.
- `Laziness`: Invoke functions only when needed.
- `Modularity`: Isolate logic into branches for easier understanding, testing, and maintenance.
- `Composability`: Interact with functionalities like resolve for elegant solutions.

<Heading title="Mutable" size="2" />

Vixeny promotes immutability but provides `mutable` for necessary mutable states.

```ts
{
    path: "/mutable",
    mutable: true,
    resolve: {...resolveCookies},
    f: c => c.mutable.result as string,
}
```

`mutable` is global and works at any code depth.

<Heading title="Conclusion" size="2" />

Vixeny's `Resolve`, `Branch`, and `Mutable` allow crafting scalable, efficient, and flexible applications. They balance virtually zero-cost abstraction with the need for mutable states, promoting a robust approach tailored to individual needs. Understanding these core concepts enables writing more composable, testable, and modular Vixeny code, setting developers up for success in current and future projects.

In `data control` , we will see how to manipulate and control `petition` , `branch` and `resolve`
