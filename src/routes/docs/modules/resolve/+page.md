## Resolve

If a `resolve`, the `petition`, or `branch` has a `resolve`, this function will
be resolved first and passed to `resolve.NAME`. This also applies to `promises`.

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

So why do we need them? These functionalities are not merely a way to organize
code; they represent a robust approach to crafting scalable and maintainable
applications. By isolating code and creating powerful and customizable plugins,
you're not only enhancing the current development process but also building a
foundation that can easily adapt and grow with future needs.

- **`Almost Zero Cost Abstraction`**: These compositions don't really hurt
  performance, and in some cases, they're even faster. This efficiency means
  that you can structure your code in a way that makes sense to you without
  worrying about the overhead.
- **`Testable`**: As we will explore later, you can test your `petitions` in a
  pure form, where there's no need for databases or any external factors outside
  of Vixeny. This isolation makes testing more reliable and straightforward.
- **`Composable`**: Treating `petitions` as values allows you to reuse, modify,
  and merge them at your will. This composability fosters a more modular and
  adaptable codebase, enabling you to easily tweak or expand functionality.
