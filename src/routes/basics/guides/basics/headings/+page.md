<script>
  import ListOfComponents from '$lib/components/listofBasic.svelte';
 import Prisma from '$lib/components/Prisma.md';

</script>
<Prisma />

<svelte:head>


<title>Headers - Vixeny</title>
  <meta name="description" content="Understanding headers"/>
  <meta name="keywords" content="headers, web development, FP, functional programming, Vixeny framework, HTTP headers"/>
</svelte:head>

# Headers

This is how to retrieve headers set up in the petition and options.

## Default Behavior

Headers are unique and immutable, generated in each request-response cycle.

<object type="image/svg+xml" data="/d2/type2.svg"></object>

## CORS

We can set up CORS in the options, ensuring consistency and uniqueness across
all the petitions.

```javascript
import { plugins } from "vixeny";

const opt = plugins.globalOptions({
  // Setting CORS
  cors: {
    allowOrigins: "*",
    allowMethods: ["GET"],
  },
});
```

### Using it in a Wrap

In this example, we are going to use `route` and `get` and correctly
add headers.

```javascript
import { plugins, wrap } from "vixeny";

const opt = plugins.globalOptions({
  // Setting CORS
  cors: {
    allowOrigins: "*",
    allowMethods: ["GET"],
  },
});

const handler = await wrap(opt)()
  .get({
    path: "/custom",
    headings: {
      headers: ".html"
    },
    f: ({ headers }) =>
      new Response("<p>Hello World!</p>", {
        headers,
      }),
  })
  .get({
    path: "/std",
    headings: {
      headers: ".html"
    },
    // Headers are fixed; there's no way to change them dynamically
    f: () =>
      new Response("<p>Hello World!</p>", {
        headers: new Headers([
          ["Content-Type", "text/html"],
        ]),
      }),
  })
  .testPetitions();

// Helper functions
const requestOf = (s: string) => new Request(s);
const logHead = (r: Response) => console.log(r.headers);

// Results
await handler(requestOf("http://localhost/std"))
  .then(logHead);
await handler(requestOf("http://localhost/custom"))
  .then(logHead);
```

### Composing with Petitions

In this example, we are going to use `custom` and `add` in `petitions` and
correctly add headers.

```javascript
import { composer, petitions, plugins, wrap } from "vixeny";

const opt = plugins.globalOptions({
  // Setting CORS
  cors: {
    allowOrigins: "*",
    allowMethods: ["GET"],
  },
});

// Composing the petition using `composer`
const custom = await  composer.petition(
  // Making a custom petition
  petitions.custom(opt)({
    path: "/custom",
    headings: {
      headers: ".html",
    },
    f: ({ headers }) =>
      new Response("<p>Hello World!</p>", {
        headers,
      }),
  }),
);

// Composing the petition using `composer`
const std = await composer.petition(
  // Making a custom petition
  petitions.add(opt)({
    path: "/std",
    headings: {
      headers: ".html",
    },
    // Headers are fixed; there's no way to change them dynamically
    f: () => "<p>Hello World!</p>",
  }),
);

// Helper functions
const requestOf = (s: string) => new Request(s);
const logHead = (r: Response | Promise<Response>): void => console.log(r);

// Results
logHead(std(requestOf("http://localhost/std")));
logHead(custom(requestOf("http://localhost/custom")));
```
## List

<ListOfComponents />