import { petitions, wrap } from "vixeny";

const request = new Request("http://localhost/winAPrice");

const lotery = petitions.resolve()({
  // Generates a random number from 0 to 10000
  f:  () => Math.round(10000)
});

const routes = wrap()().get({
  path: "/winAPrice",
  resolve: { lotery },
  f: ({ resolve }) =>
    resolve.lotery 
      ? 'Winner!'
      : 'Try again',
});

// Inject the mocked resolve
const mockRoutes = await routes.handleRequest("/winAPrice")({
  resolve: {
    lotery: { f: () => 10000 },
  },
});

console.log(
  // Always a winner
  await mockRoutes(request).then((res) => res?.text()),
);