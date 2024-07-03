import { composeResponse, petitions, plugins } from "vixeny";

const opt = plugins.globalOptions({
  router: {
    strictTrailingSlash: false,
  },
});

// Define a basic response
const ping = petitions.common()({
  path: "/ping",
  f: () => "pong",
});

// Compose the response handler with static file support
const handler = composeResponse(opt)([
  ping,
  plugins.fileServer({
    type: "fileServer",
    // Specifies the directory from which files will be served,
    // relative to the directory where the server was started.
    path: "./build/",
    // Base directory path on the server under which files will be accessible
    name: "/",
    // Disables automatic MIME type detection to allow more granular control if required
    removeExtensionOf: [".html"],
    slashIs: "index",
  }),
]);

export default {
  fetch: handler,
  port: 4173,
};
