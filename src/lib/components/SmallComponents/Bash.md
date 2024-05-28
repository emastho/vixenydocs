<script>
    export let runtime = "bun";
</script>

{#if runtime == "bun"}

```bash
bun create vixeny
```
```ts
let meow = 5;
```

{:else}

```bash
npx create-vixeny
```
```ts
let meow = 5;
```

{/if}
