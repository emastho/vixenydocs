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

<Heading title="wrap" size="2" />

In the `versatile` world of JavaScript, wrap plays a key role in harmonizing the language's polymorphic nature with Vixeny's functional approach. It ensures scalability and maintains code purity, crucial for efficient web development.

```ts
// api.ts
import { wrap } from "vixeny";
import { options } from "somewhere.ts"; 

const api = wrap({
  //global options
  ...options,
  startWith: "/api",
})()
  .stdPetition({
    path: "/ping",
    f: () => "pong",
  })

export { api }
```

Simplifing handling diverse HTTP requests, offering a structured, side-effect-free programming environment. This makes building, maintaining, and scaling web applications more intuitive and manageable, showcasing wrap as an essential tool in the Vixeny toolkit.

```ts
import { wrap, vixeny } from "vixeny";
import { options } from "somewhere.ts"; 
import { api } from "api.ts"; 

const router = wrap(options)()
  .stdPetition({
    path: "/",
    f: () => "hello world",
  })
  //joining `api` to this wrap
  .union(api.unwrap())
  // console loging:
  // '/'
  // '/api/ping'
  .logPaths()



// router for server
vixeny(options)(router.unwrap())

```

<Heading title="Petitions" size="2" />

Vixeny's Petition objects simplify route definitions

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
    f: (c) => ""
}

export { surprise }

```
This example illustrates the flexibility of Vixeny's routing. By importing and modifying the surprise Petition, we easily create additional routes

```ts
import { surprise }  from 'somewhere.ts'

export default wrap(options)()
  .stdPetition(surprise)
  .stdPetition({...surprise, paht: '/woof'})
  .stdPetition({...surprise, paht: '/woooow'})
  // console loging:
  // '/meow'
  // '/woof'
  // '/woooow'
  .logPaths()


```


<Heading title="Petitions types in wrap" size="2" />

 There are two type of petitions:
  - `stdPetition`: where you have to return a `BodyInt` or `Promise<BodyInt>`
  - `customPetition`: where you have to return a `Response` or `Promise<Response>`

```ts
wrap(options)()
  .stdPetition({
    path: "/",
    f: () => "hello world",
  })
  .customPetition({
    path: "/response/who/:name",
    f: (c) => (c.param.name === "Bun" || c.param.name === "Deno")
        ? new Response('{"meow": "yes"}', {
              status: 200,
              headers: {
                  "content-type": "application/json"
              }
        })
        : new Response("Only devs here", {status: 400})
  })
```

It is important to note that `wrap` only supports these types although there are more types which serve different purposes which must be directly inserted.

```ts
vixeny(options)([
    //importing all the paths
    ...wrap(options)()
      .union(root.unwrap())
      .union(api.unwrap())
      .unwrap(),
    //adding the static server
    {
      type: "fileServer",
      path: "./public/",
      name: "/public/",
    },
    // petition without ctx
    {
      path: "/responseType",
      type: "response",
      r: () => new Response('Hello')
    }
  ])
```

<PreviousNext previous="/framework/init" next="/framework/resolve" />
