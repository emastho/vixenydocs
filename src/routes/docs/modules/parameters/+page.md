<script>
	import Iconie from "$lib/components/Iconie.svelte"
	import BeforeNext from "$lib/components/BeforeNext.svelte"
</script>

<svelte:head>
    <title>Functional something - Vixeny</title>
    <meta name="description" content="about this page" />
</svelte:head>

## Parameters in Vixeny

In Vixeny, parameters are variables that you can include in the URL path of your route. These parameters can then be accessed in your function to use them in your response, you also can check how `context` works in: [ >> context](#context)

### Using Parameters

To include a parameter in your path, you use a colon `:` by default followed by the name of the parameter.

For example, if you want to create a parameter called `name`, you would include `:name` in your path:

```typescript
{
  path: '/param/:name',
  f: (ctx) => `Hello ${ctx.param.name}`
}
```

In this example, `:name` is a parameter that can be accessed in the function using `ctx.param.name`. 

### Example

Let's say you want to create a greeting message using the name provided in the URL. You would create a route like this:

```typescript
{
  path: '/hello/:name',
  f: (ctx) => `Hello ${ctx.param.name}!`
}
```

Now, if someone accesses your website with the URL `http://127.0.0.1:8080/hello/John`, the response will be `Hello John!`.

### Multiple Parameters

You can also include multiple parameters in your path:

```typescript
{
  path: '/param/:name/:age',
  f: (ctx) => `Hello ${ctx.param.name}, you are ${ctx.param.age} years old!`
}
```

In this example, `:name` and `:age` are parameters that can be accessed in the function using `ctx.param.name` and `ctx.param.age`.

### Using External Functions

You can also define your function outside of the route configuration and then reference it in your route, you can use `options` and check it's behavior in:
[ >> options](#options)

Here is an example:

```ts
// Define the function
function greet(ctx) {
  return `Hello ${ctx.param.name}!`;
}

// Define the route
const route = {
  path: '/hello/:name',
  options: { add: ["param"] },
  f: greet
};

// or
const route2 = {
  path: '/hello/:name',
  options: { add: ["param"] },
  f: ctx =>  greet(ctx) + "!"
};
```


In this example, the greet function is defined outside of the route configuration and is then referenced in the f property of the route.

### Forcing Parameters to be Null

If you want to force the param object in ctx to be null, in this example, you can use the remove property in the `options` object. This will remove the param object from ctx, and accessing ctx.param will return `null`, which triggers the `??` operator to return 'no_param'.

```typescript
{
  path: '/hello/:name',
  options: { remove: ["param"] },
  f: (ctx) =>  ctx.param ?? "no_param"
}
```

In this example, `ctx.param` will always be `null` and it will always return `no_param`.

