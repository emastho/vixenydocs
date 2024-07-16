
<svelte:head>
<script src='/prism.mjs' defer></script>
<title>Wrap - Vixeny</title>
<meta name="description" content="Understanding wrap"/>
</svelte:head>

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

Currying in functional programming allows a function with multiple arguments to be decomposed into a sequence of functions, each taking a single argument. In the context of `wrap`.

```ts
import { wrap, plugins } from 'vixeny';

// Global options configured with plugins
const opt = plugins.globalOptions({})

// The first currying stage allows for setting initial configuration.
const handler = wrap(opt)()
 .stdPetition({
    path: '/',
    f: () => 'Morning!'
 });
 ```

In the given example, `wrap(opt)` is the first stage where options are provided. The second invocation `()` without arguments indicates that the initial configuration has been applied. Here’s how you might utilize the second currying stage for deeper functional composition:

```javascript
import { wrap } from 'vixeny';

// Define a base API wrap with a specific route prefix
const api = wrap({
    wrap: {
        startsWith: "/api"
    }
})()
 .stdPetition({
    path: '/',
    f: () => 'Morning!'
 });

// Using the second currying stage to extend with another wrap instance
const extendedHandler = wrap()(
    api.unwrap()
)
 .stdPetition({
    path: '/',
    f: () => 'Evening!'
 })
 // Logs all configured paths for debugging
 .logPaths(); 

```

Also there is another option:

```javascript
import  { wrap , petitions  } from 'vixeny';

const custom = petitions.custom()({
    path: "/custom",
    f: () => new Response("Hello")
})

const standart = petitions.common()({
    path: "/custom",
    f: () => "Hello"
})

wrap()(
    [custom , standart]
)
```

### Special Options

The `wrap` function offers several configuration options:

- **`startWith`**: This option is used to specify a base path for all the routes defined within a `wrap` instance. When set, `startWith` prepends the specified path to all route paths within the instance, allowing for organized and hierarchical URL structures, which is particularly useful for segmenting different areas of your application, such as admin, API, or user interfaces.

```javascript
import { wrap } from 'vixeny';

// Define a base API wrap with a specific route prefix
const api = wrap({
      wrap: {
        startsWith: "/api"
    }
})()
 .stdPetition({
    path: '/',
    f: () => 'Morning!'
 });

// Using the second currying stage to extend with another wrap instance
const extendedHandler = wrap()(
    api.unwrap()
)
 .stdPetition({
    path: '/',
    f: () => 'Evening!'
 })
 // Logs all configured paths for debugging
 .logPaths(); 

```

## Methods

### addAnyPetition

The `addAnyPetition` method is a versatile tool within the `wrap` framework that allows the integration of different types of petitions into the current wrap instance.

#### Functionality:

- **Dynamic Integration**: You can dynamically add any type of petition to the existing wrap configuration. 
- **Sealed Options**: Petitions added using `addAnyPetition` retain their configurations and behaviors as specified. This sealing of options ensures that once a petition is added, its core attributes cannot be inadvertently altered, thereby preserving the integrity and expected behavior of the application.

#### Examples:

Here's how you might use `addAnyPetition` to add both a custom and a standard petition to a wrap instance:

```javascript
import { wrap, petitions } from 'vixeny';

// Create a custom petition that responds with a custom HTTP response
const customPetition = petitions.custom()({
    path: "/custom",
    f: () => new Response("Custom Response Content")
});

// Create a standard petition with a simple greeting message
const standardPetition = petitions.standard()({
    path: "/greet",
    f: () => "Hello, World!"
});

// Initialize a new wrap instance and add both petitions
const app = wrap()()
    .addAnyPetition(customPetition)
    .addAnyPetition(standardPetition);

// This setup enables the app to handle both '/custom' and '/greet' paths with their respective responses
```

#### Practical Use:

`addAnyPetition` is particularly useful in scenarios where the application needs to handle the same auth petition for different routes.


### changeOptions

 Allows for changing the wrap options of the current instance, creating a new instance with the updated options
 while preserving the existing petitions. This is useful for dynamically adjusting configurations, such as
 modifying routes or other settings, without needing to redefine all petitions.

 Usage example:
 ```javascript
import { wrap, plugins } from 'vixeny';

// Define a plugin that determines user roles
const userIs = (name) => plugins.type({
    name: Symbol.for('anyName'),
    type: {},
    // Returns the name in a nested function format
    f: () => () => () => name  
});

// Create instances of the plugin for different users
const bubbles = userIs('Bubbles');
const avant = userIs('Avant');

// Initial configuration with the 'Bubbles' user plugin
const initialOptions = plugins.globalOptions({
    cyclePlugin: {
        user: bubbles
    }
});

// Create a wrap instance with the initial configuration
const handler = wrap(initialOptions)()
    .stdPetition({
        path: "/",
        f: ({ user }) => `Hello, ${user}!`
    });

// Changing the configuration to use the 'Avant' user plugin
const updatedHandler = handler.changeOptions({
    cyclePlugin: {
        user: avant
    }
});

// Showcase
const req = new Request("http://localhost/")
console.log(
    await handler.testRequests()(req).then(r => r.text()),
    await handlerToMock.testRequests()(req).then(r => r.text()),
)

// The updated handler will now greet 'Avant' instead of 'Bubbles'
 ```

To complete the `### compose` section of your document, here's a detailed explanation that highlights its functionality, usage, and practical applications within the `wrap` framework:

### compose

The `compose` method in the `wrap` framework is a powerful feature that consolidates all petitions within a wrap instance into a cohesive, operational unit. This method finalizes the configuration of routing and request handling, making the wrap instance ready for execution.

#### Functionality:

- **Optimized**: Streamlines the execution path by reducing the overhead involved in handling requests, making the application more efficient and responsive.

#### How It Works:

- When `compose` is called, it aggregates all the petitions and their configurations into one coherent structure.
- The result is a function that takes a request and matches it against the defined petitions, returning the appropriate response based on the application's logic.

#### Usage Example:

Here’s how you might use `compose` to set up a basic web application that handles different routes:

```javascript
import { wrap } from 'vixeny';

const app = wrap()()
   .stdPetition({ 
    path: "/", 
    f: () => "Welcome to our homepage!" 
  })
   .stdPetition({ 
    path: "/about", 
    f: () => "Learn more about us on this page." 
  })
   .compose();

// This function can now be used to handle incoming HTTP requests
// Example of handling a request to the root path
const request = new Request("http://localhost/");
// Outputs: "Welcome to our homepage!"
console.log(await app(request).then(r => r.text())); 
```

### customPetition

`customPetition` allows for defining a custom Petition where `f` returns either a `Response`
or a `Promise<Response>`. This method is suitable for scenarios where the standard response
structure does not fit your needs.

> Headers have to be passed manually

```javascript
import  { wrap , petitions  } from 'vixeny';

// Making a custome petition outside of the wrap
const custome =  petitions.custom({
    cors: {
        allowOrigins: '*'
    }
})({
    path: '/fromPetition',
    f: ({ headers }) => new Response("hello", {
        headers
    })
})

const handler = wrap({
    cors: {
        allowOrigins: '*'
    }
})()
    .customPetition({
        path: '/fromInside',
        f: ({ headers }) => new Response("hello", {
            headers
        })
    })
    // Both are equivalent in signatures
    .addAnyPetition(custome)


```

### debugLast

The `debugLast` method in the wrap framework is a powerful debugging tool designed to give developers insight into the internal state and usage of the context within the last added petition. 

For example: 

Context:
 - `isUsing`: Shows the componets that you are using.
 - `isAsync`: Shows if the current petition is async.

Components:
 - `$NAME` : This information depends on the component.

Plugin:
 - `$NAME` : This information depends on the plugin.

```javascript
import  { wrap } from 'vixeny';

import  { wrap } from 'vixeny';

wrap()()
  .stdPetition({
      path: '/one',
      f: () => null
  })
  /**
   * Console logging:
   * 
   * --- Context ---
   * using: 
   * isAsync: false
   */
  .debugLast()
  .stdPetition({
      path: '/two/:id',
      f: c => c.param.id
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
  .debugLast()
```
### exclude

The exclude method in the `wrap` framework is a powerful feature that allows developers to dynamically remove one or more petitions based on their paths from an existing `wrap` instance. This functionality is particularly useful for managing different configurations and routes dynamically, adapting to various operational needs without reconstructing the entire `wrap`.


#### How It Works:

 - `exclude` removes the specified paths from the current wrap instance before the application of any global path prefixes such as those set by startWith.


```typescript
import  { wrap } from 'vixeny';

// Creating a wrap with multiple routes
const handler = wrap()()
    .stdPetition({
        path: "/pathOne",
        f: () => 'one'
    })
    .stdPetition({
        path: "/pathTwo",
        f: () => 'two'
    })
    .stdPetition({
        path: "/pathThree",
        f: () => 'three'
    });

// Excluding multiple paths dynamically
const handlerWithoutTwoThree = handler.exclude(["/pathTwo", "/pathThree"]);

// Remaining active path
handlerWithoutTwoThree.logPaths(); // Outputs: ['/pathOne']

```

### flatMap

Applies a function over each petition, wrapping each result, and then flattens all results into a single wrap.

> flatMap is mostly used for the mantainers of `vixeny/core`

```javascript
import  { wrap } from 'vixeny';

// Creating a wrap
const handler = wrap()()
    .stdPetition({
        path: "/pathOne",
        f: () => 'one'
    })
    .stdPetition({
        path: "/pathTwo",
        f: () => 'two'
    })
    .stdPetition({
        path: "/pathThree",
        f: () => 'two'
    })

// Gives granural control over the primitives inside of the `wrap`
// In this examples we are making all the petitions `Async`
const asyncHandler = handler
    .flatMap(
        p => handler.pure({
            ...p,
            isAsync: true
        })
    )
    // Cheking the wrapped petitions
    .flatMap(
        p => void console.log(p) ?? handler.pure(p)
    )
```

### handleRequest

 `handleRequest` dynamically processes a request getting a specified path. If the path exists among the defined petitions,
 it either applies provided modifications (useful for mocking or altering request handling behavior) or proceeds with the
 default petition handling logic.

 This function is particularly useful for testing, allowing you to inject mock options or modify the petition's behavior
 on-the-fly without altering the original petition definitions.

 #### Example usage:

 Suppose we have a petition defined to handle requests to '/one', returning the current date as a string.
 We can use `handleRequest` to process a request directly or modify its behavior for testing.

 ```javascript
 const request = new Request("http://localhost/one")

 const paths = wrap()()
     .stdPetition({
         path: '/one',
         f: c => c.date.toString()
     });

 // Handling the request without modifications
 const handles = paths.handleRequest("/one")({});

 // Handling the request with a mock date injected
 const mocked = paths.handleRequest("/one")({
     options: {
         setDate: 1710592645075
     }
 });

 // Outputs the current date
 console.log(await handles(request).then(r => r.text()));

 // Outputs the mocked date: "1710592645075"
 console.log(await mocked(request).then(r => r.text()));
 ```
### petitionWithoutCTX

The `petitionWithoutCTX` method in the `wrap` framework is a specialized function designed to allow petitions to operate independently of the broader context typically managed by the `composer`. This method is essential for scenarios where a petition must execute with a fixed, predetermined setup, ensuring its behavior remains consistent and unaffected by external configurations.

#### Functionality:

- **Context Independence**: Petitions added with `petitionWithoutCTX` do not depend on the context provided by the `composer`. This makes them suitable for fixed-response endpoints or for integrating legacy systems where dynamic context manipulation is unnecessary or undesirable.
- **Simplified Configuration**: Simplifies the petition configuration by bypassing the contextual logic, thus reducing the complexity for certain routes within the application.

#### How It Works:

- Petitions defined through `petitionWithoutCTX` receive a minimal, predefined set of parameters, typically only what is necessary for the petition to fulfill its response duty.
- These petitions are isolated in terms of functionality, meaning changes to the global or inherited context do not affect them.

#### Usage Example:

Here's an example illustrating the use of `petitionWithoutCTX` to set up a static content delivery endpoint, which does not require any dynamic context manipulation:

```javascript
import { wrap } from 'vixeny';

const staticContentHandler = wrap()()
  .petitionWithoutCTX({
    path: "/static",
    r: () => new Response("<p>Static Content</p>", {
      headers: new Headers({"Content-Type": "text/html"})
    }),
  });

// Example of serving a request to the static path
const request = new Request("http://localhost/static");
staticContentHandler(request).then(response => {
  console.log(response.text()); // Outputs: "<p>Static Content</p>"
});
```

#### Practical Use:

- **Performance Optimization**: Ideal for endpoints where the response is static or predetermined, allowing these routes to be optimized for faster processing by skipping unnecessary context evaluations.
- **Legacy Integration**: Useful in situations where parts of an older system are being integrated into a new application without altering their operational logic.

#### Benefits:

- **Consistency**: Ensures that the behavior of the petition remains unchanged regardless of the broader application context, providing stability across requests.



### pure

The `pure` method in the `wrap` framework is a foundational concept borrowed from functional programming, emphasizing immutability and side-effect-free operations. In the context of `wrap`, pure creates a new `wrap` instance that is functionally equivalent to its input but is disconnected from the original instance's state except for the link to the initial options.

> flatMap is mostly used for the mantainers of `vixeny/core`
> Preserve the current `options`

```javascript 
import { wrap } from 'vixeny';

const baseWrap = wrap()()
    .stdPetition({
        path: '/example',
        f: () => "Original Response"
    });

// Using pure to replicate the base configuration without carrying over any added state or modifications
const replicatedWrap = baseWrap.pure();

// Modifying the original wrap instance
baseWrap.stdPetition({
    path: '/modified',
    f: () => "Modified Response"
});

// Logging paths to show that the replicated wrap does not include modifications
replicatedWrap.logPaths(); // Output: ['/example']
baseWrap.logPaths(); // Output: ['/modified']
```

### stdPetition

To effectively complete the `### stdPetition` section of your document, it's essential to define its role clearly within the `wrap` framework, describe its functionality, and demonstrate its practical usage. Here’s an enriched version of this section:

### stdPetition

The `stdPetition` method in the `wrap` framework defines a standard petition that processes HTTP requests and returns a response. This function is a core part of the `wrap` system, designed to handle typical web requests with a straightforward and predictable setup. It simplifies the creation of commonly used HTTP routes within an application.


#### Usage Example:

Here's a straightforward example that demonstrates setting up a basic route with `stdPetition`:

```javascript
import { wrap , petitions} from 'vixeny';

// Another way to see `stdPetition`
const std = petitions.common()({
    path: '/anotherPath',
    f: () => 'Hello'
})

// Creating a wrap instance with a standard petition
const app = wrap()()
    .stdPetition({
        path: '/greet',
        f: () => "Hello, World!"
    })
    .addAnyPetition(std);

// This setup enables the app to handle a GET request at '/greet' with a simple greeting message
const request = new Request("http://localhost/greet");

// Example of handling the request and outputting the response
app(request).then(response => console.log(response.text())); // Outputs: "Hello, World!"
```

### testRequests

 Simulates a server environment for testing the functionality of all wrapped requests.
 This method creates a server-like instance that can handle requests directly, enabling
 comprehensive testing of the `wrap` configuration and all defined petitions without depending
 on an external runtime or actual server.

 This is particularly useful for unit testing or integration testing, where you want to validate
 the behavior of your request handling logic under controlled conditions.

 > Wraps the `petitions` in `Promise.resolve`

 Usage example:
 ```javascript
import { wrap } from "vixeny";

const handler = wrap()()
  .stdPetition({
    path: "/helloWold",
    f: () => "helloWold",
  })
  .stdPetition({
    path: "/one",
    f: () => "one",
  })
  .stdPetition({
    path: "/two",
    f: () => "two",
  })


const testHandler = handler.testRequests();

console.log(
  await testHandler(new Request("http://localhost/helloWold"))
    .then((response) => response.text()),
);

 ```
### union

 Combines petitions from another `wrap` instance with the current one. This is particularly useful for modularizing
 and reusing petitions across different parts of your application. By importing and unioning petitions, you can
 maintain clean separation of concerns and ensure your code remains organized.

 Example usage:
 Assuming `extension.ts` exports a wrapped petition, it can be combined with the petitions defined in `a.ts`:

 ```typescript
 import { wrap } from "vixeny";

 const extension = wrap({
    wrap: {
        startsWith: "/extension"
    }
 })()
  .stdPetition({
    path: "/one",
    f: () => "one",
  })
  .stdPetition({
    path: "/two",
    f: () => "two",
  });

 const handeler = wrap()()
   .union(extension.unwrap())
   .stdPetition({
     path: "/hello",
     f: () => "helloWorld",
   })
   .logPaths(); // Outputs paths from both the current wrap and the imported `extension`.
 ```

 This method supports integrating only certain types of petitions, which align with the structure and functionality
 intended by the wrap's design.

### unwrap

The `unwrap` method in the `wrap` framework is a crucial feature designed to decompose a wrapped instance into its constituent petitions. This allows for the exporting or further manipulation of these petitions individually or in combination with other `wrap` instances. This method is particularly useful for integrating multiple `wrap` instances or for configuring a server to handle all defined petitions in a structured manner.

#### Functionality:

- **Decomposition**: `unwrap` breaks down a `wrap` instance into its underlying petitions, making them accessible for individual use or recombination.
- **Preserves Path Adjustments**: If the `startWith` option is set, `unwrap` ensures that all paths within the unwrapped petitions are prefixed accordingly, facilitating organized and hierarchical URL structures.

#### How It Works:

- When invoked, `unwrap` extracts the petitions from a `wrap` instance while maintaining any path adjustments made through options like `startWith`.
- This extraction allows the petitions to be utilized independently or merged with other `wrap` instances, maintaining flexibility and modularity.

#### Usage Example:

Here's an example demonstrating how to use `unwrap` to combine petitions from multiple sources into a single `wrap` instance:

```javascript
import { wrap } from 'vixeny';

// Creating two separate wrap instances
const api = wrap({
    wrap: {
        startsWith: "/api"
    }
})()
  .stdPetition({
    path: "/users",
    f: () => "User List"
  });

const admin = wrap({
    wrap: {
        startsWith: "/admin"
    }
})()
  .stdPetition({
    path: "/controls",
    f: () => "Admin Controls"
  });

// Combining unwrapped petitions from both instances into a single wrap instance
const combined = wrap()()
  .union(api.unwrap())
  .union(admin.unwrap());

// Using the combined instance to configure a server
combined.logPaths(); // Logs paths like '/api/users' and '/admin/controls'
```

#### Practical Use:

- **Modular Development**: Allows developers to create modular, reusable components that can be combined as needed without redundancy.
- **Server Configuration**: Simplifies the process of configuring servers by consolidating multiple petition sources into a single operational unit.

