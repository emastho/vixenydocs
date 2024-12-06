<script>

 import ListOfComponents from '$lib/components/listofEssential.svelte';

</script>

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

```typescript
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

text 

### Why is chaining important?


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
>   mocking, essential for developing reliable applications.
> - **Accessible Interface**: The design of Wrap is `intuitive`, making it more
>   accessible to developers who might be daunted by the framework’s functional
>   nature.
> - **Advanced Functional Logic**: Wrap allows for the application of a FP
>   style ( What do you expect? ¯\\_(ツ)_/¯).



