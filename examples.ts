import { wrap } from "vixeny";

const request = new Request("http://localhost/one");

const paths = wrap()()
  .get({
    path: "/one",
    f: (c) => c.date.toString(),
  });

// Handling the request without modifications
const handles = await paths.handleRequest("/one")({});

// Handling the request with a mock date injected
const mocked = await paths.handleRequest("/one")({
  options: {
    setDate: 1710592645075,
  },
});

// Outputs the current date
console.log(await handles(request).then((r) => r.text()));

// Outputs the mocked date: "1710592645075"
console.log(await mocked(request).then((r) => r.text()));