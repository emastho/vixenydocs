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