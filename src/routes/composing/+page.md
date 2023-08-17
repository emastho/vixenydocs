<script>
	import Iconie from "$lib/components/Iconie.svelte"
	import BeforeNext from "$lib/components/BeforeNext.svelte"
</script>

# Composing
## Introduction
### Some theory

Vixeny was created to be a functional framework, yet, until here we haven't unraveled the real potential of her powerful composition which `wraps` and `folds` (reduce) different  `branches` to `resolve` the `petition` with the help of other combinator using pure lambda calculus, so let's dive into this nonsense with an oversimplification.
<br>

For the seek of keeping it simple, we will say that she only `folds` and `wraps` your petition to `resolve` the `request` and give a `response`, so let's define:
<br>

1. **Wrapping**: Putting a value or function inside another function. Like wrapping a gift inside a box.

2. **Folding**: Taking a list of values and combining them into one value by repeatedly using the same action (like adding numbers together).

- **Wrapping Example in Vixeny**: If you have more than one function in a petition, you can create a function that, when called, resolves the others making a `chain`.

- **Folding Example**: If `param` and `query` is requested, you can "fold" them together into your arguments `context` to have access to them.

<br>

Is it necessary to understand this to use Vixeny? not at all, but gives some insides into her behavour.

## Resolve

If a `resolve` , `f` or `branch` has a `resolve`, this function will be resolved first, this also applies to `promises`.
```ts
[
    {
        path: "/sync",
        resolve: {
            name: "nested",
			//query will only look for "hello"
            query: {only: ["hello"]},
            f: context => context.query?.hello ?? "not found"
        },
		//"nested" is accessible to "context"
        f:  context => context.resolve.nested as string
    },
    {
        path: "/async",
        resolve: {
            name: "nested",
			//the blob is created before reaching the next step of the chain
            f:  async f => await f.req.blob()
        },
		//this function is sync because of the way of vixeny unwrapped and resolve the `pipe`
        f:  f => f.resolve.hello as string
    }
]
```

Also, you can `resolve` many elements at the same time,there will be a better explanation of the order in which this unwrapping occurs later on.
```ts
{
	path: "/multiple",
	resolve: [
		{
			name: "blob",
			f:  async f => await f.req.blob()
		},
		{
			name: "query",
			query: {only: ["hello"]},
			f: context => context.query?.hello ?? "no query"
		},
	],
	f:  f => f.resolve.blob
		? "your query is: " + f.resolve.query as string
		: "no body"
}
```
Or you can `chain` them in a `pipe`
```ts
    {
        path: "/nested/:id",
        //nested resolve that unfolds for response (response)
        resolve: {
            name: "response",
            //nested resolve that unfolds for response (param)
            resolve: {
                name: "param",
                f: f =>  " id : " + f.param.id
            },
            query: {only: ["hello"]},
            f : f => " query :" + (f.query?.hello ?? " no query ")
                + f.resolve.response as string
        },
        f:  f => f.resolve.response as string
    }
```

There's a lot to take in but you might be asking, why do I have to do this if I could use a procedure (which is a valid way to do it)?	
Well, there are 3 reasons:

 - **`Almost cero cost abstraction`**: this kind of compositions doesn't really hurt your performance and in some cases it's faster.
 - **`Testable`**: Later on, we will see how we can test your `petitions` in a `pure` form where there is not need of databases or any factor outside of Vixeny.
 - **`Composable`**: Treating `petitions` as values allow us to reuse, modify, create and merge them at our will.



<BeforeNext previous="/basics" next="/other" />