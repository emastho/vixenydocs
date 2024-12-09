<script>
    export let runtime = "one";
</script>

{#if runtime == "one"}


```bash
bun create vixeny
```


{/if}

{#if runtime == "two"}

```bash
npx create-vixeny
```

{/if}

