# branch

## Examples

### Adds to CTX

```ts
import { petitions, wrap } from "vixeny";

// `args` are only used in `branch`
const returnArgs = petitions.branch()({
  // Gets the type of string `{} as string` is also valid
  args: "string",
  // Using the args that are passed to this `branch`
  f: (ctx) => ctx.args,
});

const handler = wrap()()
  .stdPetition({
    path: "/user/:id",
    branch: {
      // Adding a branch
      returnArgs,
    },
    f: ({ branch, param }) => branch.returnArgs(param.id),
  })
  .testRequests();

// Logging bubbles
console.log(
  await handler(new Request("http://localhost/user/bubbles")).then(
    (res) => res.text(),
  ),
)
```

### Laziness

In this example the body only will be parsed if the token is valid

```ts
import { petitions, wrap } from "vixeny";

// Common key
const key = `secret!`;

// Branch
const getBody = petitions.branch()({
  args: undefined,
  f: async (ctx) => await ctx.req.text(),
});

const handler = wrap()()
  // Getting keys
  .stdPetition({
    path: "/getKey/:name",
    // Adding Crypto
    crypto: {
      globalKey: key,
    },
    f: ({ sign, param }) => sign(param),
  })
  .customPetition({
    path: "/user/:id",
    // Adding Crypto
    crypto: {
      globalKey: key,
    },
    branch: {
      // Adding `getBody`
      getBody,
    },
    f: async ({ token, branch }) =>
      // If the Token is valid it will parse the body
      token.user
        ? new Response(
          await branch.getBody(undefined),
          { status: 200 },
        )
        : new Response(null, { status: 403 }),
  })
  .testRequests();

const token = await handler(new Request("http://localhost/getKey/bubbles"))
  .then(
    (res) => res.text(),
  );
const req = new Request("http://localhost/user/bubbles", {
  headers: {
    Cookie: "user=" + token,
  },
});

console.log(
  await handler(new Request("http://localhost/user/bubbles"))
    .then((res) => res.status),
);

console.log(
  await handler(req).then((res) => res.status),
);
```