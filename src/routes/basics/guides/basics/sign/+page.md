<script>
  import ListOfComponents from '$lib/components/listofBasic.svelte';
</script>

<svelte:head>


<title>Sign and Verify- Vixeny</title>
  <meta name="description" content="Understanding sign and verify"/>
  <meta name="keywords" content="sign, verify, JWT, web development, Vixeny framework, FP, functional programming"/>
</svelte:head>

# Sign and verify

Gives access to the respective functions in the CTX.

> It needs `crypto` in the `petition`.

## Specifications

- [x] HS256

## Sign

Example of signing `param`.

```javascript
import { wrap } from "vixeny";

const handler = wrap()()
  .get({
    path: "/sign/:user",
    crypto: {
      globalKey: "secret!",
    },
    f: ({ sign, param }) => sign(param),
  })
  // Creating a server element
  .testPetitions();

// Checking token
await handler(new Request("http://localhost/sign/pluie"))
  .then((x) => x.text())
  .then(console.log);
```

## Verify

Example of signing `param` and verifying the validity of it.

```javascript
import { wrap } from "vixeny";

// Generic
const cryptoOptions = {
  crypto: {
    globalKey: "secret!",
  },
};
const handler = wrap()()
  .get({
    path: "/sign/:user",
    // Manually adding crypto options,
    crypto: {
      globalKey: "secret!",
    },
    f: ({ sign, param }) => sign(param),
  })
  .customPetition({
    path: "/isItValid",
    method: "POST",
    // Append options
    ...cryptoOptions,
    f: async ({ verify, req }) => {
      // Verifies the body
      const token = verify(await req.text());

      // Check validity of the token
      if (token) {
        // If the token is not null returns status 200
        return new Response(null, { status: 200 });
      } else {
        // If the token is null returns status 403
        return new Response(null, { status: 403 });
      }
    },
  })
  .testPetitions();

// Getting the token of { user : "pluie" }
const token = await handler(new Request("http://localhost/sign/pluie"))
  .then((x) => x.text());

// Checking validity
await handler(
  new Request("http://localhost/isItValid", {
    method: "POST",
    body: token,
  }),
)
  .then(console.log);
```

## List

<ListOfComponents />
