<script>
   import ListOfComponents from '$lib/components/listofBasic.svelte';
 import Prisma from '$lib/components/Prisma.md';

</script>
<Prisma />

<svelte:head>


<title>Token - Vixeny</title>
  <meta name="description" content="Understanding token"/>
  <meta name="keywords" content="token, JWT, web development, Vixeny framework, FP, functional programming"/>
</svelte:head>

# Token

A way to get a specific cookie and verify it. If the cookie is invalid, it will
be null.

> It needs `crypto` in the `petition`.

## Specifications

- [x] HS256

## Examples

Expected behavior

### Basic Example

How to declare it

```javascript
import { wrap } from "./main.ts";

// Common key
const key = `secret!`;

const handler = await wrap()()
  .post({
    path: "/user/:id",
    // Adding Crypto
    crypto: {
      globalKey: key,
    },
    f: async ({ token }) =>
      // If the Token is valid it will parse the body
      new Response(null, { status: token.user ? 200 : 403 }),
  })
  .testPetitions();
```

### Using with sign

In conjunction with sign

```javascript
import { wrap } from "vixeny";

// Common key
const key = `secret!`;

const handler = await wrap()()
  // Getting keys
  .get({
    path: "/getKey/:name",
    // Adding Crypto
    crypto: {
      globalKey: key,
    },
    f: ({ sign, param }) => sign(param),
  })
  .post({
    path: "/user/:id",
    // Adding Crypto
    crypto: {
      globalKey: key,
    },
    f: async ({ token }) =>
      // If the Token is valid it will parse the body
      new Response(null, { status: token.user ? 200 : 403 }),
  })
  .testPetitions();

// Getting token
const token = await handler(new Request("http://localhost/getKey/bubbles"))
  .then((res) => res.text());

// Valid request
const req = new Request("http://localhost/user/bubbles", {
  method: "POST",
  headers: {
    Cookie: "user=" + token,
  },
});

// Invalid request 403
console.log(
  await handler(
    new Request("http://localhost/user/bubbles", {
      method: "POST",
    }),
  )
    .then((res) => res.status),
);

// Valid request 200
console.log(
  await handler(req).then((res) => res.status),
);
```

## List

<ListOfComponents />
