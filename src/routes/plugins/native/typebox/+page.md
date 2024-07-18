<script>
  // Importing necessary components
  import Tabs from "$lib/components/Tabs.md";
  import Bash from "$lib/components/SmallComponents/Bash.md";
  import plugin from "$lib/examples/plugins_typebox.md";
  import Request from "$lib/components/Request.svelte"
  // Array containing the installation options for the Tabs component
  const install = [
    { title: "Bun", component: Bash, details: { runtime: "bun" } },
    { title: "Deno", component: Bash, details: { runtime: "deno" } }
  ];
  const tab0 = [
      {title: "main.ts", component: plugin, details: {runtime: "main"}},
      {title: "setup.ts", component: plugin, details: {runtime: "setup"}}
  ];
</script>

<svelte:head>

<script src='/prism.mjs' defer></script>
<title>Typebox plugin - Vixeny</title>
  <meta name="description" content="Using Typebox in Vixeny"/>
</svelte:head>

<Tabs data={tab0}/>
