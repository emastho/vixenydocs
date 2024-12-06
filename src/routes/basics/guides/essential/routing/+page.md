<script>

 import ListOfComponents from '$lib/components/listofEssential.svelte';

</script>

# Routing

This lesson will be brief, yet it is crucial for understanding the logic of
pathing in Vixeny. We'll explore the granular power you have to manipulate your
code. It's important to grasp these basic concepts before we dive deeper into
`composing` and incorporating these ideas anywhere.


<object type="image/svg+xml" data="/d2/routes.svg"></object>

## Pathing

We can create an `union` between two wraps and also modify their base using
`startswith`.

```javascript
import { plugins, wrap } from "vixeny";

// Setting up options
const api = plugins.globalOptions({
  wrap: {
    startWith: "/api",
  },
});

// Creating a wrap
const apiWrap = wrap(api)()
  .get({
    path: "/hello",
    f: () => "api",
  });

// Merging the paths
const root = wrap()()
  // You can also unwrap it in the constructor
  // apiWrap.unwrap(),

  .union(apiWrap.unwrap())
  .get({
    path: "/",
    f: () => "main",
  })
  //  ` /  `
  //  ` /api/hello  `
  .logPaths();
```

This helps manage the complexity of routing by providing an easy way to export
and import `petitions`. Moreover, since `wrap` has a monadic structure (A
programming concept that helps manage workflows by allowing functions to chain
operations in a sequence, while ensuring each operation is isolated from
others), importing, testing, or modifying any wrap cannot affect other
instances. This behavior will be explained further in the `wrap` section of the
library.

## Priority

<object type="image/svg+xml" data="/d2/wildcard.svg"></object>

We fully support wildcards `/path/*` using the following order:

- Real paths (e.g., `/`, `/user`, `/user/:id`)
- Wildcards and static files (e.g., `/static/html/*` -> `/static/*` -> `/*`)

This means that `real paths` are prioritized over wildcards, which reflect other
nested wildcards.

## List

<ListOfComponents />

