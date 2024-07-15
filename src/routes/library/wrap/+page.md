
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


 The second `()` can either be left empty or used to add another `wrap`.
 This allows for flexible composition of your application's routing and request handling.

 @example
 ```js
 import { api } from './somewhere'
 const options = {...} // Optional<funRouterOptions>
 // Composing with another wrap
 export const root = wrap(options)(
   api.unwrap()
 )
   .stdPetition({
     path: "/",
     f: () => "helloWorld",
   })
 ```

### Inmutability

// TODO

### Special Options

// TODO

### Plugins

// TODO

## Methods

For more details, see the [documentation](https://vixeny.dev/library/wrap#addAnyPetition).

### addAnyPetition

`addAnyPetition` allows for adding a petition of any type to the current wrap instance,
increasing flexibility in handling different Petitions as HTTP requests.

```js

 const requestPetition = petitions.custom()({
   path: "/response",
   f: () => new Response("standard"),
 });

const api = wrap()().addAnyPetition(requestPetition);
```

### changeOptions

 Allows for changing the wrap options of the current instance, creating a new instance with the updated options
 while preserving the existing petitions. This is useful for dynamically adjusting configurations, such as
 modifying routes or other settings, without needing to redefine all petitions.

  For more details, see the [documentation](https://vixeny.dev/library/wrap#changeoptions).

 Usage example:
 ```javascript
 const initialWrap = wrap(initialOptions)().stdPetition({path: '/test', f: () => "Test"});
 // Now, changing options for the wrap
 const modifiedWrap = initialWrap.changeOptions(newOptions);
 // `modifiedWrap` now operates with `newOptions`, while still handling the '/test' petition
 ```

### compose

 `compose` consolidates all petitions within the wrap instance into a cohesive, operational unit,
 ready for execution or further configuration. This method is pivotal for finalizing the setup
 of routing and request handling mechanisms before application deployment.

 @returns {Object} A composite entity representing the fully configured request handling logic.

 @example
 ```js
 const app = wrap()()
   .addAnyPetition({ path: "/test", f: () => "Test" })
   .compose();
 ```

### customPetition

`customPetition` allows for defining a custom Petition where `f` returns either a `Response`
or a `Promise<Response>`. This method is suitable for scenarios where the standard response
structure does not fit your needs.

Usage example:
```js
wrap(options)()
  .customPetition({
    path: "/response/who/:name",
    f: (c) => new Response(c.param.name),
  })
```



### debugLast

`logLastCheck` is a diagnostic tool that logs the keys or parameters currently being used by the last petition added.
This is particularly helpful for developers to understand which parts of the context (`c`) are being composed.

@example
Example usage:
```javascript
wrap()()
  .stdPetition({
      path: '/one',
      f: _c => null
  })
  // Logging the used context after the first petition (expected to be empty as none is used):
  // Output: []
  // Important!, `_c` will be the Request
  .debugLast()
  .stdPetition({
      path: '/two/:id',
      f: c => c.param.id
  })
  // Logging the used context after adding a petition that accesses a URL parameter:
  // Output: [ "param" ]
  .debugLast()
```
### exclude

  Excludes one or more petitions based on their paths from the current wrap instance, creating a new instance without the specified paths.
  This is useful for dynamically adjusting the set of active petitions, perhaps in response to configuration changes or to conditionally
  remove certain routes in different environments or contexts.

  The method accepts either a single path string or an array of path strings to exclude.

  Example usage:
  ```typescript
  // Assuming wrap()() has defined several petitions including paths '/excludeMe' and '/keepMe'
  const filteredWrap = wrap()()
    .exclude(['/excludeMe'])
    // Now, the wrap instance `filteredWrap` will not include the petition for '/excludeMe'
  ```

  This facilitates flexible and dynamic petition management within your application's routing logic.


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
