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
