import { petitions, wrap } from "vixeny";

// Another way to see `get`
const std = petitions.add()({
  path: "/anotherPath",
  f: () => "Hello",
});

// Creating a wrap instance with a standard petition
const app = await wrap()()
  .get({
    path: "/greet",
    f: () => "Hello, World!",
  })
  // Access to all methods
  .route({
    path: "/moreMethods",
    method:'OPTIONS',
    f: () => "Hello, World!",
  })
  .addAnyPetition(std)
  // Making a server to test
  .testPetitions();

// Example of handling the request and outputting the response
await app("/greet")
  .then(
    // Outputs: "Hello, World!"
    async(response) => console.log( await response.text())
  ); 