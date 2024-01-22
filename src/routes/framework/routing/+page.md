<script>
    import Heading from "$lib/components/Heading.svelte"
    import PreviousNext from "$lib/components/PreviousNext.svelte"
</script>

<svelte:head>
    <title>Routing - Vixeny</title>
    <meta name="description" content="Learn how to create routes in Vixeny" />
</svelte:head>

# Routing

Routing in Vixeny is extremely simple and powerful, here's how it looks.

```ts
{
    path: "/meow",
    method: "POST",
    f: (ctx) => ctx.req.body ?? ":("
}
```

Yup. An object.

This object is called `Petition`.

<Heading title="Petition" size="2" />

Here's how to create a simple petition:

```ts
import { Petition } from "vixeny/optimizer/types";

const surprise: Petition = {
    path: "/meow",
    headings: {
        status: 307,
        statusText: "Temporary Redirect",
        headers: {
            Location: "https://www.youtube.com/watch?v=_e9yMqmXWo0"
        }
    },
    f: (ctx) => ""
}
```

Now you can put it where it belongs:

```ts
vixeny()([
   {...surprise},

   {...otherRoute},
   {...genericRoute, path: "/posts"}
])
```

<Heading title="Dynamic path" size="2" />

Sometimes we want to accept some data through an url.

```ts
{
  path: "/post/:id",
  f: (ctx) => ctx.param.id,
}
```

```ts
{
  path: "/post", // /post?id=5&title=cat
  headings: {
    headers: ".json"
  }
  f: (ctx) => JSON.stringify(ctx.query)
}
```


<Heading title="Conditional headers" size="2" />

So you saw the example above with `headings` and you didnt like it, because it's not flexible enough? You can use `type: "request"` and return the good old `new Response()`

```ts
{
  path: "/response/who/:name",
  type: "request",
  f: (context) => (context.param.name === "Bun" || context.param.name === "Deno")
      ? new Response('{"meow": "yes"}', {
            status: 200,
            headers: {
                "content-type": "application/json"
            }
      })
      : new Response("Only devs here", {status: 400})
}
```

<Heading title="Cookie headers" size="2" />

```ts
{
  ...
  f: (ctx) => JSON.stringify(ctx.cookie) ?? ""
}
```

<PreviousNext previous="/framework/init" next="/framework/resolve" />