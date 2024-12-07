import { petitions, wrap } from "vixeny";

// Create a standard petition
const std = petitions.add()({
  path: "/anotherPath",
  f: () => "Hello",
});

// Create a chain
const app = wrap()()
  .get({
    path: "/greet",
    f: () => "Hello, World!",
  });

// This does nothing because the result is not saved
app.addAnyPetition(std);

// This does nothing because the result is not saved
app.get({
    path: "/anotherPath",
    f: () => "Hello",
  });


const serve = await app.testRequests();

const request = new Request("http://localhost/anotherPath");

await serve(request)
  .then((response) => console.log(response.status));
// Outputs: "404"
