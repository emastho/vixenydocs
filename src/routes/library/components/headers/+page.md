<svelte:head>
  <script src='/prism.mjs' defer></script>
  <title>Headers - Vixeny</title>
  <meta name="description" content="Understanding headers"/>
  <meta name="keywords" content="headers, web development, FP, functional programming, Vixeny framework, HTTP headers"/>
</svelte:head>

# Headers

This is how to retrieve headers set up in the petition and options.

## Default Behavior

Headers are unique and immutable, generated in each request-response cycle.

## CORS

We can set up CORS in the options, ensuring consistency and uniqueness across all the petitions.

```ts
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

In this example, we are going to use `customPetition` and `stdPetition` and correctly add headers.

```ts
import { plugins, wrap } from "vixeny";

const opt = plugins.globalOptions({
  // Setting CORS
  cors: {
    allowOrigins: "*",
    allowMethods: ["GET"],
  },
});

const handler = wrap(opt)()
  .customPetition({
    path: "/custom",
    headings: {
      headers: "text/html",
    },
    f: ({ headers }) =>
      new Response("<p>Hello World!</p>", {
        headers,
      }),
  })
  .stdPetition({
    path: "/std",
    headings: {
      headers: "text/html",
    },
    // Headers are fixed; there's no way to change them dynamically
    f: () =>
      new Response("<p>Hello World!</p>", {
        headers: new Headers([
          ["Content-Type", "text/html"],
        ]),
      }),
  })
  .testRequests();

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

In this example, we are going to use `custom` and `common` in `petitions` and correctly add headers.

```ts
import { wrap, plugins, composer, petitions } from "vixeny";

const opt = plugins.globalOptions({
  // Setting CORS
  cors: {
    allowOrigins: "*",
    allowMethods: ["GET"],
  },
});

// Composing the petition using `composer`
const custom = composer.petition(
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
  })
);

// Composing the petition using `composer`
const std = composer.petition(
  // Making a custom petition 
  petitions.common(opt)({
    path: "/std",
    headings: {
      headers: ".html",
    },
    // Headers are fixed; there's no way to change them dynamically
    f: () =>
      "<p>Hello World!</p>",
  })
);

// Helper functions
const requestOf = (s: string) => new Request(s);
const logHead = (r: Response | Promise<Response>): void => console.log(r);

// Results
logHead(std(requestOf("http://localhost/std"))); 
logHead(custom(requestOf("http://localhost/custom")));
```