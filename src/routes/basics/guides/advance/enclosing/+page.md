<script>
 import ListOfAdvance from '$lib/components/listofAdvance.svelte';;
 import Prisma from '$lib/components/Prisma.md';

</script>
<Prisma />

<svelte:head>

<title>Extending - Vixeny</title>
<meta name="description" content="Adding elements together" />
</svelte:head>

# Enclosing

## At

This option allows us to move the `baseIndex` to a specific directory. Now, you
might be wondering why we need this feature. We will explore its utility in more
depth during the `extending` section after `composing`, but it is important to
know that you can rebase the logic of your routing `at` any level.

```javascript
import { plugins, wrap } from "vixeny";

// Requests
const atIndex = "/hello"
const atFourBar = "/bar/hello"
const atIndexFoo = "/foo/hello"

// Setting up options
const opt = plugins.globalOptions({
  indexBase: {
    at: 4,
  },
});

// Making a wrap
const app = wrap()()
  .get({
    path: "/hello",
    f: () => "world",
  });

// Note that we are using the same `app`, all instance of wrap are immutable

// Testing the wrap
const handler = await app
  .testPetitions();

// Testing the wrap with the options
const atFourhandler = await app
  // Adding the options
  .changeOptions(opt)
  .testPetitions();

// Expected behavior of the handler
console.log(
  // true
  (await handler(atIndex)).status === 200,
  // true
  (await handler(atFourBar)).status === 404,
);

// Checking the request status after moving the handler one directory deeper

console.log(
  // true
  (await atFourhandler(atIndex)).status === 404,
  // true
  (await atFourhandler(atFourBar)).status === 200
)
);
```

## Extending

Enclosing in Vixeny allows you to nest wraps, other frameworks and functions
within other wraps, effectively creating a clousere that the current wrap can't
access to.

```javascript
import { wrap } from "vixeny";

// Making a wrap with a specific index base set at the fourth segment
const handlerAt4 = await wrap({
  indexBase: {
    at: 4,
  },
})()
  .get({
    path: "/foo",
    f: () => "from inside",
  })
  .get({
    path: "/foo/:hello",
    f: ({ param }) => param.hello,
  })
  .compose();

// Making a handler that includes the wrap within a broader path context
const handler = await wrap()()
  .route({
    // Encloses "wrapAt4" within the "/bar" path
    path: "/bar/*", 
    // Adding a @ts-ignore here to bypass the type checking
    // @ts-ignore
    f: handlerAt4,
  }).testPetitions();


// Executing and logging the response from the "/foo" route
await handler("/bar/foo").then((x) => x.text())
  // Expected to log "from inside"
  .then(console.log);
await handler("/bar/foo/param")
  .then((x) => x.text())
  // Expected to log "param"
  .then(console.log);
```

## List

<ListOfAdvance />