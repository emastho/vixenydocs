<script>
    export let runtime = "main";
</script>

{#if runtime == "main"}

```ts
import { petitions } from "vixeny";
import { sayHello } from "./setup.ts"

const hey = petitions.common()({
  path: "/hey",
  resolve: {
    sayHello,
  }
  f: ({ resolve }) => `${resolve.sayHello} World!`,
});
```

{:else}

```ts
import { petitions } from 'vixeny';

const sayHello = petitions.resolve()({
	f: () => 'hello'
});

export { sayHello };
```

{/if}
