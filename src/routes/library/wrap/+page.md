<script>
  import '../../prims.mjs';
</script>

<svelte:head>

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

### Inmutability

// TODO

### Special Options

// TODO

### Plugins

// TODO

## Methods

### addAnyPetition

`petitionWithoutCTX` allows to bypass the `composer` and it is not bound to its
rules, keeping the function untouched.

```js
const api = wrap()()
  .addAnyPetition({
    path: "/data",
    r: wrappedPetitions.compose(),
  });
```

### changeOptions

    Allows for changing the wrap options of the current instance, creating a new instance with the updated options
    while preserving the existing petitions. This is useful for dynamically adjusting configurations, such as
    modifying routes or other settings, without needing to redefine all petitions.

    Usage example:

```javascript
const initialWrap = wrap(initialOptions)().stdPetition({
  path: "/test",
  f: () => "Test",
});
// Now, changing options for the wrap
const modifiedWrap = initialWrap.changeOptions(newOptions);
// `modifiedWrap` now operates with `newOptions`, while still handling the '/test' petition
```

### compose

### customPetition

### debugLast

### exclude

### flatMap

### handleRequest

### petitionWithoutCTX

### pure

### stdPetition

### testRequests

### unwrap
