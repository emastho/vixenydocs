<script>
  import ListOfComponents from '$lib/components/listOfComponets.svelte';
</script>

<svelte:head>

<script src='/prism.mjs' defer></script>
<title>Branch - Vixeny</title>
  <meta name="description" content="Understanding branch"/>
  <meta name="keywords" content="branch, web development, Vixeny framework, FP, functional programming"/>
</svelte:head>

# Branch

The `branch` function was created to utilize all the functionalities of Vixeny
while being lazy. In contrast, `resolve` does the same but is always resolved
before the request in context.

You can also pass arguments to these functions.

## Key Properties

- Can use plugins
- Can have arguments
- It is lazy
- Accepts resolves
- Can have resolves
- It is reusable
- Can be in a resolve, branch, or petition (anything with an `f`)

## Args

It gets the type of the `value` in the key `args`. In the next example, it gets
the type of `text` as a string.

```ts
import { petitions } from "vixeny";

// `args` are only used in `branch`
const returnArgs = petitions.branch()({
  // Gets the type of string; `{} as string` is also valid
  args: "text",
  // Using the args that are passed to this `branch`
  f: (ctx) => ctx.args,
});

// Creating a petition at `/`
const hello = petitions.add()({
  path: "/",
  branch: {
    returnArgs,
  },
  // It returns arguments
  f: ({ branch }) => branch.returnArgs("hello world"),
});
```

You can also coerce the type, in this case to `Record<string, string>`:

```ts
import { petitions, wrap } from "vixeny";

// `args` are only used in `branch`
const returnArgs = petitions.branch()({
  args: {} as Record<string, string>,
  // Using the args that are passed to this `branch`
  f: (ctx) => ctx.args,
});
```

## Example Usage

### Adds to CTX

Here we are using a petition in `wrap` and adding a branch that returns the
string.

```ts
import { petitions, wrap } from "vixeny";

// `args` are only used in `branch`
const returnArgs = petitions.branch()({
  // Gets the type of string; `{} as string` is also valid
  args: "string",
  // Using the args that are passed to this `branch`
  f: (ctx) => ctx.args,
});

const handler = wrap()()
  .get({
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
);
```

### Laziness

In this example, the body will only be parsed if the token is valid.

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
  .get({
    path: "/getKey/:name",
    // Adding Crypto
    crypto: {
      globalKey: key,
    },
    f: ({ sign, param }) => sign(param),
  })
  .customPetition({
    path: "/user/:id",
    method: "POST",
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
        ? new Response(await branch.getBody())
        : new Response(null, { status: 403 }),
  })
  .testRequests();

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
  await handler(new Request("http://localhost/user/bubbles", {
    method: "POST",
  })
    .then((res) => res.status),
);

// Valid request 200
console.log(
  await handler(req).then((res) => res.status),
);
```

### Resolves as Branches

Using a resolve as a branch and showing that you need to add `undefined`.

```ts
import { petitions, wrap } from "vixeny";

// Resolve
const world = petitions.resolve()({
  f: () => "world",
});

// Branch
const hello = petitions.branch()({
  args: undefined,
  f: () => "hello",
});

const handle = wrap()()
  .get({
    path: "/",
    branch: {
      // Adding branches
      hello,
      world,
    },
    // Resolves are valid branches, you only need to pass an undefined argument
    f: ({ branch }) => `${branch.hello()} ${branch.world(undefined)}`,
  })
  // Creating a server for testing
  .testRequests();

console.log(
  // Logging `Hello world`
  await handle(new Request("http://localhost/"))
    .then((res) => res.text()),
);
```

## List

<ListOfComponents />
