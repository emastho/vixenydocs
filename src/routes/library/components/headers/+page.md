


### Using it in a wrap

```ts
import { plugins, wrap } from "vixeny";

const opt = plugins.globalOptions({
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
const logHead = (r: Response) => void console.log(r.headers);

// Results
await handler(requestOf("http://localhost/std"))
  .then(logHead);
await handler(requestOf("http://localhost/custom"))
  .then(logHead);

```