<script>
    export let runtime = "main";
</script>

{#if runtime == "main"}

```javascript
import { wrap } from "vixeny";

const root = wrap()()
  .get({
    path: "/ping",
    f: () => "pong",
  })
  .post({
    path: "/ping",
    f: () => "pong",
  })
  .delete({
    path: "/ping",
    f: () => "pong",
  });
```

{:else}

```javascript
import { petitions, wrap } from "vixeny";

// User validation
const hasUser = petitions.resolve()({
  f: ({ query }) => query && query?.user ?? null,
});

const forbiden = new Response(null, { status: 403 });

const root = wrap()()
  .get({
    path: "/ping",
    resolve: {
      hasUser,
    },
    f: ({
      resolve: {
        hasUser,
      },
    }) => hasUser 
      ? `welcome ${hasUser}!` 
      : forbiden.clone(),
  })
  .post({
    path: "/ping",
    resolve: {
      hasUser,
    },
    f: ({
      resolve: {
        hasUser,
      },
    }) => hasUser 
      ? `welcome ${hasUser}!` 
      : forbiden.clone(),
  });
```

{/if}
