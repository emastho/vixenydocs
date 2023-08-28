
## Queries in Vixeny

In Vixeny, queries are the key-value pairs in the URL after the `?` symbol. These pairs can be accessed in your function to use them in your response. Let's see how `queries` work in Vixeny.

### Using Queries

To access the query parameters in your function, you can use `ctx.query`.

For example:

```typescript
{
  path: '/query',
  f: (ctx) => `Your name is : ${ctx.query?.name || 'default'}`
}
```

In this example, `name` is a query parameter that can be accessed in the function using `ctx.query.name` , the optimizer will infer the use of `name`


### Multiple Queries

You can also include multiple query parameters:

```typescript
{
  path: '/query',
  f: (ctx) => `Your name is : ${ctx.query?.name || 'default'} and your age is : ${ctx.query?.age || 'unknown'}`
}
```

In this example, `name` and `age` are query parameters that can be accessed in the function using `ctx.query.name` and `ctx.query.age`.

### Out of the context 

In this code snippet, a function `greet` is defined outside the route configuration. To access the `query` parameters inside the `greet` function, you need to add the `query` field to the `ctx` object using the `options` object with the `add` property in the route configuration. This is done by setting `options: { add: ["query"] }` in the `route` object.

```typescript
function greet(ctx) {
  return `Hello ${ctx.query?.name || 'default'}!`;
}

const route = {
  path: '/route',
  options: { add: ["query"] },
  f: greet
};

const route2 = {
  path: '/route2',
  options: { add: ["query"] },
  f: ctx =>  greet(ctx) 
};
```



### Using "only" Field

You can also specify which query parameters to parse by using the `only` field in the `query` object:

```typescript
{
  path: '/query/onlyName',
  query: {
    only: ["name"]
  },
  f: (ctx) => `Hello ${ctx.query?.name || 'default'}`
}
```

In this example, only the `name` field is parsed from the query, ignoring other fields. Using "only" improves significantly the performance.

### Forcing Query to be Null

If you want to force the query object in `ctx` to be null, you can use the `remove` property in the `options` object. This will remove the query object from `ctx`, and accessing `ctx.query` will return `null`.

```typescript
{
  path: '/query/block',
  options: {
    remove: ['query']
  },
  f: () => "Hello world"
}
```

In this example, `ctx.query` will always be `null`.

---

This section provides a detailed guide on handling queries in Vixeny, from accessing single and multiple query parameters, using the `only` field, to forcing the `query` object to be `null`. Adjust the examples and explanations according to your specific use case and requirements.