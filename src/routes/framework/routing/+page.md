<script>
  import '../../prims.mjs';
    import Tabs from "$lib/components/Tabs.md"
    import Bash from "$lib/components/SmallComponents/Bash.md"
    import example0 from "$lib/examples/intro_core_0.md"
    import FancyLink from '$lib/components/FancyLink.svelte';

    const tab0 = [
        {title: "main.ts", component: example0, details: {runtime: "main"}},
        {title: "setup.ts", component: example0, details: {runtime: "setup"}}
    ]

</script>

<svelte:head>

<title>Routing - Vixeny</title>
<meta name="description" content="Putting things together" />
</svelte:head>

# Routing

This lesson will be brief, yet it is crucial for understanding the logic of
pathing in Vixeny. We'll explore the granular power you have to manipulate your
code. It's important to grasp these basic concepts before we dive deeper into
`composing` and incorporating these ideas anywhere.

## Pathing

As we saw earlier in our introduction, we can create a `union` between two wraps
and also modify their base using `startswith`.

```ts
import { plugins, wrap } from "vixeny";

// Setting up options
const api = plugins.globalOptions({
  wrap: {
    startWith: "/api",
  },
});

// Creating a wrap
const apiWrap = wrap(api)()
  .stdPetition({
    path: "/hello",
    f: () => "api",
  });

// Merging the paths
const root = wrap()()
  // You can also unwrap it in the constructor
  // apiWrap.unwrap(),

  .union(apiWrap.unwrap())
  .stdPetition({
    path: "/",
    f: () => "main",
  })
  //  ` /  `
  //  ` /api/hello  `
  .logPaths();
```

This helps manage the complexity of routing by providing an easy way to export
and import `Petitions`. Moreover, since `Wrap` has a monadic structure,
importing, testing, or modifying any wrap cannot affect other instances. This
behavior will be explained further in the `Wrap` section of the `library`.

## Priority

We fully support wildcards `/path/*` using the following order:

- Real paths (e.g., `/`, `/user`, `/user/:id`)
- Wildcards and static files (e.g., `/static/html/*` -> `/static/*` -> `/*`)

This means that `real paths` are prioritized over wildcards, which reflect other
nested wildcards.

## At

This option allows us to move the `baseIndex` to a specific directory. Now, you
might be wondering why we need this feature. We will explore its utility in more
depth during the `extending` section after `composing`, but it is important to
know that you can rebase the logic of your routing `at` any level.

```ts
import { plugins, wrap } from "vixeny";

// Requests
const atIndex = new Request("http://localhost/hello");
const atFourBar = new Request("http://localhost/bar/hello");
const atIndexFoo = new Request("http://localhost/Foo/hello");

// Setting up options
const opt = plugins.globalOptions({
  indexBase: {
    at: 4,
  },
});

// Making a wrap
const app = wrap()()
  .stdPetition({
    path: "/hello",
    f: () => "world",
  });

// Note that we are using the same `app`, all instance of wrap are immutable

// Testing the wrap
const handler = app
  .testRequests();

// Testing the wrap with the options
const atFourhandler = app
  // Adding the options
  .changeOptions(opt)
  .testRequests();

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

## Trailing slashes

By default, `/hello` and `/hello/` are not the same path but this can easily can
be change with `strictTrailingSlash`.

```ts
const req = new Request("http://localhost/hello");
const trailingSlash = new Request("http://localhost/hello/");

const opt = plugins.globalOptions({
  router: {
    // When set to false, /hello and /hello/ will be treated as the same route
    strictTrailingSlash: false,
  },
});

const app = wrap()()
  .stdPetition({
    path: "/hello",
    f: () => "world",
  });

// Note that we are using the same `app`, all instance of wrap are immutable

const strictSlashTests = app
  .testRequests();

const flexibleSlashTests = app
  .changeOptions(opt)
  .testRequests();

console.log(
  // Testing without the flexible slash option

  // Expected to be 200, /hello is defined
  (await strictSlashTests(req)).status === 200,
  // Expected to be 404, /hello/ is not defined when strict
  (await strictSlashTests(trailingSlash)).status === 404,
);

console.log(
  // Testing with the flexible slash option enabled

  // Expected to be 200, /hello is defined
  (await flexibleSlashTests(req)).status === 200,
  // Expected to be 200, /hello/ is treated the same as /hello
  (await flexibleSlashTests(trailingSlash)).status === 200,
);
```

## Static File Handling

In web development, serving static files (like images, scripts, and stylesheets)
is a common requirement. Vixeny simplifies this process with built-in support
for static file serving.

Consider a scenario where you want to serve a simple `package.json` file from
the root directory of your project. Here’s how you can set up Vixeny to handle
this:

```ts
import { composeResponse, petitions, plugins } from "vixeny";

// Define a basic response
const helloWorld = petitions.common()({
  path: "/",
  f: () => "hello world!",
});

// Create a request for a static file
const req = new Request("http://localhost/package.json");

// Compose the response handler with static file support
const handler = composeResponse()([
  helloWorld,
  plugins.fileServer({
    type: "fileServer",
    // Specifies the directory from which files will be served,
    // relative to the directory where the server was started.
    path: "./",
    // Base directory path on the server under which files will be accessible
    name: "/",
    // Disables automatic MIME type detection to allow more granular control if required
    mime: false,
  }),
]);

// Fetching the package.json file
console.log(
  await Promise
    .resolve(handler(req))
    .then((x) => x.text()),
);
```

---

<FancyLink href="/framework/composing">Next</FancyLink>
