
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

### Plugins

// TODO

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

### handleRequest

 `handleRequest` dynamically processes a request getting a specified path. If the path exists among the defined petitions,
 it either applies provided modifications (useful for mocking or altering request handling behavior) or proceeds with the
 default petition handling logic.

 This function is particularly useful for testing, allowing you to inject mock options or modify the petition's behavior
 on-the-fly without altering the original petition definitions.

 Example usage:

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

 `petitionWithoutCTX` allows to bypass the `composer` and it is not bind to it's rules, keeping the function untouched.

 ```js
 const api = wrap()().addAnyPetition({
   path: "/data",
   r: wrappedPetitions.compose()
 });
 ```

### logPaths


 `logPaths` is a utility method that logs the paths of all the petitions wrapped by this instance.
 It helps in debugging by providing a quick overview of the defined petition paths at any given moment.

 Example usage:
 ```javascript
 wrap()()
   .stdPetition({
       path: '/one',
       f: () => null
   })
   // Logging the paths after adding the first petition:
   // Output: /one
   .logPaths()
   .stdPetition({
       path: '/two',
       f: () => null
   })
   // Logging the paths after adding the second petition:
   // Output:
   //   /one
   //   /two
   .logPaths()
 ```

### pure

// TODO

### stdPetition

 Defines a standard Petition where `f` returns either a `BodyInit` or a `Promise<BodyInit>`.

 ```javascript
 export const root = wrap()()
   .stdPetition({
     path: "/",
     f: () => "helloWorld",
   })
 ```

### testRequests

 Simulates a server environment for testing the functionality of all wrapped requests.
 This method creates a server-like instance that can handle requests directly, enabling
 comprehensive testing of the `wrap` configuration and all defined petitions without depending
 on an external runtime or actual server.

 This is particularly useful for unit testing or integration testing, where you want to validate
 the behavior of your request handling logic under controlled conditions.

 Usage example:
 ```javascript
 // Assuming `wrap` has been configured with multiple petitions
 const server = wrap(...)...
 const testServer = server.testRequests();

 // Now you can use `testServer` to simulate requests and test responses
 testServer(new Request("/some-path")).then(response => {
   // assertions or checks on the response
 });
 ```
### union

 Combines petitions from another `wrap` instance with the current one. This is particularly useful for modularizing
 and reusing petitions across different parts of your application. By importing and unioning petitions, you can
 maintain clean separation of concerns and ensure your code remains organized.

 Example usage:
 Assuming `extension.ts` exports a wrapped petition, it can be combined with the petitions defined in `a.ts`:

 ```typescript
 // Assuming extension is imported from "extension.ts"
 export default wrap()()
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

 Unwraps the current `wrap` instance into its constituent petitions, typically for the purpose of exporting
 or further manipulation. This can be especially useful when combining multiple wrap instances or configuring
 a server to handle all defined petitions.

 The `unwrap` method adjusts the paths based on the `startWith` option if it's set, allowing for prefixing all
 paths within the unwrapped petitions, facilitating organized and hierarchical URL structures.

 Example usage:

 ```typescript
 // Combining unwrapped petitions from multiple sources into a single wrap instance
 composeResponse(options)(
   wrap(options)()
     .union(root.unwrap())
     .union(api.unwrap())
     .unwrap(), // Unwraps into an array of petitions ready for further processing
 );
 ```
