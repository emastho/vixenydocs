## Cookies in Vixeny

In Vixeny, cookies are used to store user data between multiple requests. You
can access the cookies in your function to use them in your response. Let's see
how `cookies` work in Vixeny.

### Using Cookies

To access the cookies in your function, you can use `ctx.cookies`.

For example:

```typescript
{
  path: '/cookies',
  f: (ctx) => `Your saved name is : ${ctx.cookies?.name || 'default'}`
}
```

In this example, `name` is a cookie that can be accessed in the function using
`ctx.cookies.name`, the optimizer will infer the use of `name`

### Multiple Cookies

You can also include multiple cookies:

```typescript
{
  path: '/cookies',
  f: (ctx) => `Your saved name is : ${ctx.cookies?.name || 'default'} and your saved age is : ${ctx.cookies?.age || 'unknown'}`
}
```

In this example, `name` and `age` are cookies that can be accessed in the
function using `ctx.cookies.name` and `ctx.cookies.age`.

### Out of the context

In this code snippet, a function `greet` is defined outside the route
configuration. To access the `cookies` inside the `greet` function, you need to
add the `cookies` field to the `ctx` object using the `options` object with the
`add` property in the route configuration. This is done by setting
`options: { add: ["cookies"] }` in the `route` object.

```typescript
function greet(ctx) {
  return `Hello ${ctx.cookies?.name || "default"}!`;
}

const route = {
  path: "/route",
  options: { add: ["cookies"] },
  f: greet,
};

const route2 = {
  path: "/route2",
  options: { add: ["cookies"] },
  f: (ctx) => greet(ctx),
};
```

### Using "only" Field

You can also specify which cookies to parse by using the `only` field in the
`cookies` object:

```typescript
{
  path: '/cookies/onlyName',
  cookies: {
    only: ["name"]
  },
  f: (ctx) => `Hello ${ctx.cookies?.name || 'default'}`
}
```

In this example, only the `name` field is parsed from the cookies, ignoring
other fields. Using "only" improves significantly the performance.

### Forcing Cookies to be Null

If you want to force the cookies object in `ctx` to be null, you can use the
`remove` property in the `options` object. This will remove the cookies object
from `ctx`, and accessing `ctx.cookies` will return `null`.

```typescript
{
  path: '/cookies/block',
  options: {
    remove: ['cookies']
  },
  f: () => "Hello world"
}
```

In this example, `ctx.cookies` will always be `null`.
