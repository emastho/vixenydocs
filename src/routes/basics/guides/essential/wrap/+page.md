<script>

 import ListOfComponents from '$lib/components/listofEssential.svelte';
 import Prisma from '$lib/components/Prisma.md';

</script>
<Prisma />

# Wrap

<object type="image/svg+xml" data="/d2/wrap.svg"></object>

## Get and Route

```javascript
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
  .addAnyPetition(std)
  // Making a server to test
  .testRequests();

const request = new Request("http://localhost/greet");

// Example of handling the request and outputting the response
await app(request)
  .then(
    // Outputs: "Hello, World!"
    async(response) => console.log( await response.text())
  ); 
```

## Unwrap and Union

```javascript
import { wrap } from "vixeny";

const extension = wrap({
  wrap: {
    startsWith: "/extension",
  },
})()
  .get({
    path: "/one",
    f: () => "one",
  })
  .get({
    path: "/two",
    f: () => "two",
  });

const handler = wrap()()
  .union(extension.unwrap())
  .get({
    path: "/hello",
    f: () => "helloWorld",
  })
  .logPaths();
```

## Filter

```javascript
import { wrap } from "vixeny";


const app = wrap({
  // wrap: {
  //   startsWith: "/extension",
  // },
})()
  .get({
    path: "/one",
    f: () => "one",
  })
  .get({
    path: "/two",
    f: () => "two",
  })
  .get({
    path: "/dev-info",
    f: () => "debug sfuff",
  });


  app
  .filter(p => !p.path.includes("/dev"))
  .logPaths()

```

## What is chaining?

Chaining is a way to connect a series of steps (functions) together so each step passes its result to the next. This lets you build things step by step, without changing the original setup. It makes your code easier to read and understand.

In this framework, chaining means starting with something (like a `wrap`) and adding more actions to it, like `.get()` or `.addAnyPetition()`. Each time you add something, it creates a new version. If you don’t save the new version, the changes won’t stick.

### Why is chaining important?

1. **Easy to Follow**:
   You can see exactly what happens in the order it happens.

2. **Doesn’t Change Things by Accident**:
   Each step creates a new version, so the original stays the same.

3. **Flexible**:
   You can add, remove, or change steps without breaking other parts.

### Demonstrating its immutability

Here’s an example that shows how chaining works and what happens if you don’t save the changes:

```javascript
import { petitions, wrap } from "vixeny";

// Create a standard petition
const std = petitions.add()({
  path: "/anotherPath",
  f: () => "Hello",
});

// Create a chain
const app = await wrap()()
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
```


## List

<ListOfComponents />


## Do you know?

> Originally, Vixeny developers managed functionality through Petitions and
> the composer. This method was functional but could become cumbersome
> specially for testing. So we decided _to wrap it up!_, Mainly to
> have:
>
> - **Stability and Integrity**: Wrap helps prevent mutations and side effects,
>   especially when it is exported and imported across different project
>   segments.
> - **Tool Consolidation**: By centralizing all necessary tools into one
>   higher-order function, Wrap simplifies the development environment.
> - **Early Debugging**: It enables debugging during the compilation process,
>   allowing not only to debug code but making it totally transparent.
> - **Testing and Mocking**: Wrap provides robust support for testing and
>   mocking.
> - **Accessible Interface**: The design of Wrap is `intuitive` ( as good as it gets ), making it more
>   accessible to developers who might be daunted by the framework’s functional
>   nature.
> - **Advanced Functional Logic**: Wrap allows for the application of a FP
>   style ( What do you expect? ¯\\_(ツ)_/¯).





