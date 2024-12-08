<script>
 import ListOfAdvance from '$lib/components/listofAdvance.svelte';;
</script>

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
const atIndex = new Request("http://localhost/hello");
const atFourBar = new Request("http://localhost/bar/hello");
const atIndexFoo = new Request("http://localhost/foo/hello");

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
const handler = app
  .testPetitions();

// Testing the wrap with the options
const atFourhandler = app
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
  (await atFourhandler(atFourBar)).status === 200,
);
```

## Extending

Enclosing in Vixeny allows you to nest wraps, other frameworks and functions
within other wraps, effectively creating a clousere that the current wrap can't
access to.

```javascript
// Making a wrap with a specific index base set at the fourth segment
const handlerAt4 = wrap({
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
const handler = wrap()()
  .petitionWithoutCTX({
    path: "/bar/*", // Encloses "wrapAt4" within the "/bar" path
    r: handlerAt4,
  }).testPetitions();

const base = "http://localhost/bar";
const req = new Request(base + "/foo");
const param = new Request(base + "/foo/param");

// Executing and logging the response from the "/foo" route
await handler(req).then((x) => x.text())
  // Expected to log "from inside"
  .then(console.log);
await handler(param)
  .then((x) => x.text())
  // Expected to log "param"
  .then(console.log);
```

## List

<ListOfAdvance />