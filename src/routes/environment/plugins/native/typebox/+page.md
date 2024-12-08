<script>
  // Importing necessary components
  import { Tabs as Tab, TabItem } from 'flowbite-svelte';
  import Tabs from "$lib/components/Tabs.md";
  import Bash from "$lib/components/SmallComponents/Bash.md";
  import plugin from "$lib/examples/plugins_typebox.md";
  import Request from "$lib/components/Request.svelte"

  const tab0 = [
      {title: "main.ts", component: plugin, details: {runtime: "main"}},
      {title: "setup.ts", component: plugin, details: {runtime: "setup"}}
  ];
</script>

<svelte:head>


<title>Typebox plugin - Vixeny</title>
  <meta name="description" content="Using Typebox in Vixeny"/>
  <meta name="keywords" content="typebox, JWT, web development, Vixeny framework, FP, functional programming, plugin"/>
</svelte:head>

# Typebox

A type checker for JSON like objects from the request.

## Examples

### Using create-vixeny

<Tab defaultClass="tab">
  <TabItem title="bun" open>

```bash
bun create vixeny
```

</TabItem>
  <TabItem title="deno">

```bash
npx create-vixeny
```

</TabItem>
</Tab>

### Vanilla installation

Here a way to set up your plugin.

<Tabs data={tab0}/>
