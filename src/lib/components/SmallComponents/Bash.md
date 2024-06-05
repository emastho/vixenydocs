<script>
    export let runtime = "bun";
</script>

{#if runtime == "bun"}

```bash
bun create vixeny
```

{:else}

```bash
npx create-vixeny
```

{/if}
