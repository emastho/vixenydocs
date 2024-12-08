<script>

 import ListOfComponents from '$lib/components/listofEssential.svelte';

</script>

# Routing

This lesson will be brief, yet it is crucial for understanding the logic of
pathing in Vixeny. We'll explore the granular power you have to manipulate your
code.

## Priority in routes

<object type="image/svg+xml" data="/d2/routes.svg"></object>

We fully support wildcards static and dynamic pathing using the following order:

- Real paths (e.g., "/api/first")
- Dynamic paths (e.g., "/api/:second")
- Wildcards and static files (e.g., `/static/html/*` -> `/static/*` -> `/*`)

```js
import { wrap } from "vixeny";

const app = await wrap()()
  .get({
    path: "/api/first",
    f: () => "one",
  })
  .get({
    path: "/api/:second",
    f: () => "two",
  })
  .get({
    // Becomes default case
    path: "/*",
    f: () => "default",
  })
  .testPetitions();

  // Logs `one two default`
console.log(
  await app('/api/first').then(async res => await res.text()),
  await app('/api/anyValues').then(async res => await res.text()),
  await app('/randomValue').then(async res => await res.text()),
)
```


## Priority in wildcards

<object type="image/svg+xml" data="/d2/wildcard.svg"></object>

We fully support wildcards `/path/*` using the following order:

- Real paths (e.g., `/`, `/user`, `/user/:id`)
- Wildcards and static files (e.g., `/static/html/*` -> `/static/*` -> `/*`)

This means that `real paths` are prioritized over wildcards, which reflect other
nested wildcards.

```js
import { wrap } from "vixeny";

const app = await wrap()()
  .get({
    path: "/api/first",
    f: () => "one",
  })
  .get({
    path: "/api/*",
    f: () => "two",
  })
  .get({
    // Becomes default case
    path: "/*",
    f: () => "default",
  })
  .testPetitions();

  // Logs `one two default`
console.log(
  await app('/api/first').then(async res => await res.text()),
  await app('/api/anyValues').then(async res => await res.text()),
  await app('/randomValue').then(async res => await res.text()),
)
```
## List

<ListOfComponents />

