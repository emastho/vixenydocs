<script>
    export let runtime = "one";
</script>

{#if runtime == "one"}

```javascript
import { petitions } from "vixeny";

// Using `resolve`
const sayHello = petitions.resolve()({
  f: () => "hello",
});

const hey = petitions.add()({
  path: "/hey",
  resolve: {
    // Adding `sayHello` function
    sayHello,
  },
  // Resolving in context
  f: ({ resolve }) => `${resolve.sayHello} World!`,
});
```

{/if}

{#if runtime == "two"}

```javascript
import { petitions } from "vixeny";

// User validation
const hasUser = petitions.resolve()({
  f: ({ query }) => query && query?.user ?? null,
});

const hi = petitions.add()({
  path: "/hi",
  resolve: {
    hasUser,
  },
  f: ({ resolve }) =>
    resolve.hasUser 
      ? `hello ${resolve.hasUser}!` 
      : "No user found",
});
```

{/if}

