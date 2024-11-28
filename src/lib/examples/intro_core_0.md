<script>
    export let runtime = "one";



</script>


{#if runtime == "one"}

```javascript
import { petitions } from "vixeny";
import { sayHello } from "./setup.ts"

const hey = petitions.add()({
  path: "/hey",
  resolve: {
    sayHello,
  }
  f: ({ resolve }) => `${resolve.sayHello} World!`,
});
```


{/if}

{#if runtime == "two"}

```javascript
import { petitions } from "vixeny";

const sayHello = petitions.resolve()({
  f: () => "hello",
});

export { sayHello };
```

{/if}


{#if runtime == "three"}

```javascript
import { petitions } from "vixeny";

const sayHello = petitions.resolve()({
  f: () => "hello",
});

const hey = petitions.add()({
  path: "/hey",
  resolve: {
    sayHello,
  }
  f: ({ resolve }) => `${resolve.sayHello} World!`,
});
```

{/if}


