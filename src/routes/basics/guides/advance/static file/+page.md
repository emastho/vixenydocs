## Static File Handling

In web development, serving static files (like images, scripts, and stylesheets)
is a add requirement. Vixeny simplifies this process with built-in support for
static file serving.

Consider a scenario where you want to serve a simple `package.json` file from
the root directory of your project. Here’s how you can set up Vixeny to handle
this:

```javascript
import { composeResponse, petitions, plugins } from "vixeny";

// Define a basic response
const helloWorld = petitions.add()({
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