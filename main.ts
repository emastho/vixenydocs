import { composeResponse, petitions, plugins } from "vixeny";

// Define a basic response
const helloWorld = petitions.common()({
  path: "/fff",
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
    path: "./build/",
    // Base directory path on the server under which files will be accessible
    name: "/",
    // Disables automatic MIME type detection to allow more granular control if required
    removeExtensionOf: [".html"],
    slashIs: "index"
  }),
]);

export default {
    fetch: handler,
    
}