<script>
  import ListOfComponents from '$lib/components/listOfComponets.svelte';
  import ButtonToTop from '$lib/components/ButtonToTop.svelte';
</script>

<svelte:head>

<script src='/prism.mjs' defer></script>
<title>Wrap - Vixeny</title>
<meta name="description" content="Understanding wrap"/>
</svelte:head>

<ButtonToTop />

# Wrap

Welcome to Wrap! Please, take a seat and make yourself comfortable.

## Theory

### Why Wrap?

Originally, Vixeny developers managed functionality through `Petitions` and the
`composer`. This method was functional but could become cumbersome specially for
testing. So we decided to `wrap` everything together! Mainly to have:

- **Stability and Integrity**: Wrap helps prevent mutations and side effects,
  especially when it is exported and imported across different project segments.
- **Tool Consolidation**: By centralizing all necessary tools into one
  higher-order function, Wrap simplifies the development environment.
- **Early Debugging**: It enables debugging during the compilation process,
  allowing not only to debug code but making it totally transparent.
- **Enhanced Testing and Mocking**: Wrap provides robust support for testing and
  mocking, essential for developing reliable applications.
- **Accessible Interface**: The design of Wrap is `intuitive`, making it more
  accessible to developers who might be daunted by the framework’s functional
  nature.
- **Advanced Functional Logic**: Wrap allows for the application of algebraic
  logic to petitions ( it's a functional project, what do you expect?
  ¯\\_(ツ)_/¯).

### First and second curried

Currying in functional programming allows a function with multiple arguments to
be decomposed into a sequence of functions, each taking a single argument. In
the context of `wrap`.

```javascript
import { plugins, wrap } from "vixeny";

// Global options configured with plugins
const opt = plugins.globalOptions({});

// The first currying stage allows for setting initial configuration.
const handler = wrap(opt)()
  .get({
    path: "/",
    f: () => "Morning!",
  });
```

In the given example, `wrap(opt)` is the first stage where options are provided.
The second invocation `()` without arguments indicates that the initial
configuration has been applied. Here’s how you might utilize the second currying
stage for deeper functional composition:

```javascript
import { wrap } from "vixeny";

// Define a base API wrap with a specific route prefix
const api = wrap({
  wrap: {
    startsWith: "/api",
  },
})()
  .get({
    path: "/",
    f: () => "Morning!",
  });

// Using the second currying stage to extend with another wrap instance
const extendedHandler = wrap()(
  api.unwrap(),
)
  .get({
    path: "/",
    f: () => "Evening!",
  })
  // Logs all configured paths for debugging
  .logPaths();
```

Also there is another option:

```javascript
import { petitions, wrap } from "vixeny";

const custom = petitions.custom()({
  path: "/custom",
  f: () => new Response("Hello"),
});

const standart = petitions.add()({
  path: "/custom",
  f: () => "Hello",
});

wrap()(
  [custom, standart],
);
```

### Special Options

The `wrap` function offers several configuration options:

- **`startWith`**: This option is used to specify a base path for all the routes
  defined within a `wrap` instance. When set, `startWith` prepends the specified
  path to all route paths within the instance, allowing for organized and
  hierarchical URL structures, which is particularly useful for segmenting
  different areas of your application, such as admin, API, or user interfaces.

```javascript
import { wrap } from "vixeny";

// Define a base API wrap with a specific route prefix
const api = wrap({
  wrap: {
    startsWith: "/api",
  },
})()
  .get({
    path: "/",
    f: () => "Morning!",
  });

// Using the second currying stage to extend with another wrap instance
const extendedHandler = wrap()(
  api.unwrap(),
)
  .get({
    path: "/",
    f: () => "Evening!",
  })
  // Logs all configured paths for debugging
  .logPaths();
```

## Components

The list of components that you can use with:

<ListOfComponents />

## Methods

### addAnyPetition

Allows the integration of different types of petitions into the current wrap
instance.

#### Functionality

- **Dynamic Integration**: Adds any type of petition to the existing wrap
  configuration.
- **Sealed Options**: Retains the configurations and behaviors of added
  petitions.

#### Usage Example

Here's how you might use `addAnyPetition` to add both a custom and a standard
petition to a wrap instance:

```javascript
import { petitions, wrap } from "vixeny";

// Create a custom petition that responds with a custom HTTP response
const customPetition = petitions.custom()({
  path: "/custom",
  f: () => new Response("Custom Response Content"),
});

// Create a standard petition with a simple greeting message
const standardPetition = petitions.standard()({
  path: "/greet",
  f: () => "Hello, World!",
});

// Initialize a new wrap instance and add both petitions
const app = wrap()()
  .addAnyPetition(customPetition)
  .addAnyPetition(standardPetition);

// This setup enables the app to handle both '/custom' and '/greet' paths with their respective responses
```

#### Practical Use

- **Modularization**: Facilitates the modular addition of routes and
  functionalities.
- **Extensibility**: Enables extending the application with new features without
  altering existing configurations.

### changeOptions

Allows for changing the wrap options of the current instance, creating a new
instance with the updated options while preserving the existing petitions.

#### Functionality

- **Option Modification**: Changes the configuration options of the current wrap
  instance.
- **Instance Preservation**: Preserves the existing petitions while updating the
  options.

#### Usage example

```javascript
import { plugins, wrap } from "vixeny";

// Define a plugin that determines user roles
const userIs = (name) =>
  plugins.type({
    name: Symbol.for("anyName"),
    type: {},
    // Returns the name in a nested function format
    f: () => () => () => name,
  });

// Create instances of the plugin for different users
const bubbles = userIs("Bubbles");
const avant = userIs("Avant");

// Initial configuration with the 'Bubbles' user plugin
const initialOptions = plugins.globalOptions({
  cyclePlugin: {
    user: bubbles,
  },
});

// Create a wrap instance with the initial configuration
const handler = wrap(initialOptions)()
  .get({
    path: "/",
    f: ({ user }) => `Hello, ${user}!`,
  });

// Changing the configuration to use the 'Avant' user plugin
const updatedHandler = handler.changeOptions({
  cyclePlugin: {
    user: avant,
  },
});

// Showcase
const req = new Request("http://localhost/");
console.log(
  await handler.testRequests()(req).then((r) => r.text()),
  await handlerToMock.testRequests()(req).then((r) => r.text()),
);

// The updated handler will now greet 'Avant' instead of 'Bubbles'
```

#### Practical Use

- **Dynamic Configuration**: Useful for applications that need to change
  configurations at deployment.
- **Testing**: Helps to check the behaivour with different settings.

### compose

Consolidates all petitions within a wrap instance into a cohesive, operational
unit, making the instance ready for execution.

#### Functionality

- **Aggregation**: Aggregates all petitions into one coherent structure.
- **Optimization**: Streamlines the execution path for efficiency.

#### Usage Example

```javascript
import { wrap } from "vixeny";

const app = wrap()()
  .get({
    path: "/",
    f: () => "Welcome to our homepage!",
  })
  .get({
    path: "/about",
    f: () => "Learn more about us on this page.",
  })
  .compose();

// This function can now be used to handle incoming HTTP requests
// Example of handling a request to the root path
const request = new Request("http://localhost/");

// Outputs: "Welcome to our homepage!"
console.log(await app(request).then((r) => r.text()));
```

#### Practical Use

- **Application Initialization**: Prepares the application for handling requests
  efficiently.
- **Route Management**: Consolidates routes and their handlers for streamlined
  request processing.

### customPetition

`customPetition` allows for defining a custom Petition where `f` returns either
a `Response` or a `Promise<Response>`. This method is suitable for scenarios
where the standard response structure does not fit your needs.

> Headers have to be passed manually

#### Functionality

- **Custom Responses**: Returns custom HTTP responses.

#### Usage Example

```javascript
import { petitions, wrap } from "vixeny";

const handler = wrap({
  // CORS are paseed to `headers`
  cors: {
    allowOrigins: "*",
  },
})()
  .customPetition({
    path: "/fromInside",
    headings: {
      // Adding "content-type": "text/html"
      headers: ".html",
    },
    f: ({ headers }) =>
      new Response("hello", {
        headers,
      }),
  })
  .compose();

//  "access-control-allow-origin": "*",
//  "content-type": "text/html",
console.log(handler(new Request("http://localhost/fromInside")));
```

#### Practical Use

- **Custom Handling**: Ideal for endpoints requiring non-standard handling or
  responses.
- **Flexibility**: Provides flexibility in response customization.

### debugLast

Provides insight into the internal state and usage of the context within the
last added petition.

> Context:

- `isUsing`: Shows the componets that you are using.
- `isAsync`: Shows if the current petition is async.

> Components:

- `$NAME` : This information depends on the component.

> Plugin:

- `$NAME` : This information depends on the plugin.

#### Functionality

- **Context Debugging**: Shows the components and context being used.
- **Detailed Information**: Provides detailed information about the last
  petition's context and components.

#### Usage Example

```javascript
import { wrap } from "vixeny";

wrap()()
  .get({
    path: "/one",
    f: () => null,
  })
  /**
   * Console logging:
   *
   * --- Context ---
   * using:
   * isAsync: false
   */
  .debugLast()
  .get({
    path: "/two/:id",
    f: (c) => c.param.id,
  })
  /**
   * Console logging:
   *
   * --- Context ---
   * using: param
   * isAsync: false
   * --- Components ---
   * param: [id]
   */
  .debugLast();
```

#### Practical Use

- **Development**: Helps in understanding and debugging the internal state of
  petitions during development.
- **Error Tracking**: Useful for tracking and resolving issues in the request
  handling logic.

### exclude

Dynamically removes one or more petitions based on their paths from an existing
wrap instance.

#### Functionality

- Dynamic Removal: Removes specified paths from the current wrap instance.
- Pre-path Adjustment: Removes paths before applying any global path prefixes.

#### Usage Example

```typescript
import { wrap } from "vixeny";

// Creating a wrap with multiple routes
const handler = wrap()()
  .get({
    path: "/pathOne",
    f: () => "one",
  })
  .get({
    path: "/pathTwo",
    f: () => "two",
  })
  .get({
    path: "/pathThree",
    f: () => "three",
  });

// Excluding multiple paths dynamically
const handlerWithoutTwoThree = handler.exclude(["/pathTwo", "/pathThree"]);

// Remaining active path
handlerWithoutTwoThree.logPaths(); // Outputs: ['/pathOne']
```

#### Practical Use

- **Route Management**: Useful for dynamically adjusting the available routes.
- **Configuration Adjustments**: Allows for removing certain routes based on
  runtime conditions.

### flatMap

Applies a function over each petition, wrapping each result, and then flattens
all results into a single wrap.

> **flatMap** is mostly used for the mantainers of `vixeny/core`

#### Functionality

- **Function Application**: Applies a function to each petition.
- **Result Flattening**: Flattens all results into a single wrap instance.

#### Usage Example

```javascript
import { wrap } from "vixeny";

// Creating a wrap
const handler = wrap()()
  .get({
    path: "/pathOne",
    f: () => "one",
  })
  .get({
    path: "/pathTwo",
    f: () => "two",
  })
  .get({
    path: "/pathThree",
    f: () => "two",
  });

// Gives granural control over the primitives inside of the `wrap`
// In this examples we are making all the petitions `Async`
const asyncHandler = handler
  .flatMap(
    (p) =>
      handler.pure({
        ...p,
        isAsync: true,
      }),
  )
  // Cheking the wrapped petitions
  .flatMap(
    (p) => void console.log(p) ?? handler.pure(p),
  );
```

#### Practical Use

- **Granular Control**: Provides granular control over petitions.
- **Custom Transformations**: Enables custom transformations of petitions.

### handleRequest

Dynamically composes a petition from the current wrap. Takes path exists among
the defined petitions, it either applies provided modifications (useful for
mocking or altering request handling behavior) or proceeds with the default
petition handling logic.

#### Functionality

- **Dynamic Processing**: Processes requests dynamically, applying modifications
  if needed.
- **Default Handling**: Proceeds with default petition handling if no
  modifications are provided.

#### Usage Example

```javascript
const request = new Request("http://localhost/one");

const paths = wrap()()
  .get({
    path: "/one",
    f: (c) => c.date.toString(),
  });

// Handling the request without modifications
const handles = paths.handleRequest("/one")({});

// Handling the request with a mock date injected
const mocked = paths.handleRequest("/one")({
  options: {
    setDate: 1710592645075,
  },
});

// Outputs the current date
console.log(await handles(request).then((r) => r.text()));

// Outputs the mocked date: "1710592645075"
console.log(await mocked(request).then((r) => r.text()));
```

#### Practical Use

- **Testing**: Useful for testing petition behavior with different
  configurations.
- **Mocking**: Allows for mocking requests and responses for testing purposes.

### petitionWithoutCTX

Allows petitions to operate independently of the broader context managed by the
composer, ensuring consistent behavior with a fixed setup

#### Functionality

- **Context Independence**: Petitions added with `petitionWithoutCTX` do not
  depend on the context provided by the `composer`. This makes them suitable for
  fixed-response endpoints or for integrating legacy systems where dynamic
  context manipulation is unnecessary or undesirable.
- **Simplified Configuration**: Simplifies the petition configuration by
  bypassing the contextual logic, thus reducing the complexity for certain
  routes within the application.

#### Usage Example

Here's an example illustrating the use of `petitionWithoutCTX` to set up a
static content delivery endpoint, which does not require any dynamic context
manipulation:

```javascript
import { wrap } from "vixeny";

const staticContentHandler = wrap()()
  .petitionWithoutCTX({
    path: "/static",
    r: () =>
      new Response("<p>Static Content</p>", {
        headers: new Headers({ "Content-Type": "text/html" }),
      }),
  })
  .testRequests();

// Example of serving a request to the static path
const request = new Request("http://localhost/static");

await staticContentHandler(request)
  .then((res) => res.text())
  .then(console.log);
```

#### Practical Use

- **Performance Optimization**: Ideal for endpoints where the response is static
  or predetermined, allowing these routes to be optimized for faster processing
  by skipping unnecessary context evaluations.
- **Legacy Integration**: Useful in situations where parts of an older system
  are being integrated into a new application without altering their operational
  logic.

### pure

Creates a new wrap instance that is functionally equivalent to its input but
disconnected from the original instance's state.

> **Pure** is mostly used for the mantainers of `vixeny/core` Preserve the
> current `options`

#### Functionality

- **Immutability**: Emphasizes immutability and side-effect-free operations.
- **State Independence**: Creates a new instance without the original state.

#### Usage Example

```javascript
import { wrap } from "vixeny";

const baseWrap = wrap()()
  .get({
    path: "/example",
    f: () => "Original Response",
  });

// Using pure to replicate the base configuration without carrying over any added state or modifications
const replicatedWrap = baseWrap.pure();

// Modifying the original wrap instance
baseWrap.get({
  path: "/modified",
  f: () => "Modified Response",
});

// Logging paths to show that the replicated wrap does not include modifications
replicatedWrap.logPaths(); // Output: ['/example']
baseWrap.logPaths(); // Output: ['/modified']
```

#### Practical Use

- **State Isolation**: Useful for creating isolated instances for different
  contexts.
- **Modular Development**: Facilitates modular development by isolating
  instances.

### get

Defines a standard petition that processes HTTP requests and returns a response.

#### Functionality

- **Standard Processing**: Handles typical web requests with a straightforward
  setup.
- **Predictable Setup**: Provides a predictable configuration for add routes.

#### Usage Example:

Here's a straightforward example that demonstrates setting up a basic route with
`get`:

```javascript
import { petitions, wrap } from "vixeny";

// Another way to see `get`
const std = petitions.add()({
  path: "/anotherPath",
  f: () => "Hello",
});

// Creating a wrap instance with a standard petition
const app = wrap()()
  .get({
    path: "/greet",
    f: () => "Hello, World!",
  })
  .addAnyPetition(std);

// This setup enables the app to handle a GET request at '/greet' with a simple greeting message
const request = new Request("http://localhost/greet");

// Example of handling the request and outputting the response
app(request).then((response) => console.log(response.text())); // Outputs: "Hello, World!"
```

#### Practical Use

- **Route Handling**: Simplifies the creation of add HTTP routes.
- **Application Initialization**: Useful for setting up basic route handling in
  applications.

### testRequests

Simulates a server environment for testing the functionality of all wrapped
requests, enabling comprehensive testing without an external runtime.

> Wraps the `petitions` in `Promise.resolve`

#### Functionality

- **Simulation**: Creates a server-like instance for testing.
- **Comprehensive Testing**: Enables detailed testing of request handling logic.

#### Usage example

```javascript
import { wrap } from "vixeny";

const handler = wrap()()
  .get({
    path: "/helloWold",
    f: () => "helloWold",
  })
  .get({
    path: "/one",
    f: () => "one",
  })
  .get({
    path: "/two",
    f: () => "two",
  });

// Creates a handler to test
const testHandler = handler.testRequests();

console.log(
  await testHandler(new Request("http://localhost/helloWold"))
    .then((response) => response.text()),
);
```

#### Practical Use

- **Unit Testing**: Useful for unit testing request handling logic.
- **Integration Testing**: Facilitates integration testing by simulating a
  server environment.

### union

Combines petitions from another wrap instance with the current one, useful for
modularizing and reusing petitions across different parts of the application.

#### Functionality

- **Combination**: Combines petitions from multiple wrap instances.
- **Modularization**: Supports modular development by reusing petitions.

#### Usage Example

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

const handeler = wrap()()
  .union(extension.unwrap())
  .get({
    path: "/hello",
    f: () => "helloWorld",
  })
  .logPaths(); // Outputs paths from both the current wrap and the imported `extension`.
```

#### Practical Use

- **Code Reuse**: Facilitates code reuse by combining existing petitions.
- **Modular Development**: Supports modular development by integrating different
  parts of the application.

### unwrap

Decomposes a wrapped instance into its constituent petitions, making them
accessible for individual use or recombination.

#### Functionality:

- **Decomposition**: `unwrap` breaks down a `wrap` instance into its underlying
  petitions, making them accessible for individual use or recombination.
- **Preserves Path Adjustments**: If the `startWith` option is set, `unwrap`
  ensures that all paths within the unwrapped petitions are prefixed
  accordingly, facilitating organized and hierarchical URL structures.

#### Usage Example:

```javascript
import { wrap } from "vixeny";

// Creating two separate wrap instances
const api = wrap({
  wrap: {
    startsWith: "/api",
  },
})()
  .get({
    path: "/users",
    f: () => "User List",
  });

const admin = wrap({
  wrap: {
    startsWith: "/admin",
  },
})()
  .get({
    path: "/controls",
    f: () => "Admin Controls",
  });

// Combining unwrapped petitions from both instances into a single wrap instance
const combined = wrap()()
  .union(api.unwrap())
  .union(admin.unwrap());

// Using the combined instance to configure a server
combined.logPaths(); // Logs paths like '/api/users' and '/admin/controls'
```

#### Practical Use:

Practical Use

- **Modular Development**: Enables modular development by decomposing and
  recombining petitions.
- **Server Configuration**: Simplifies server configuration by consolidating
  multiple petition sources.
