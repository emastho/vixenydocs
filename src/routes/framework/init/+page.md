<script>
    import Tabs from "$lib/components/Tabs.md"
    import Bash from "$lib/components/SmallComponents/Bash.md"

    const tab1 = [
        {title: "Bun", component: Bash, details: {runtime: "bun"}},
        {title: "Deno", component: Bash, details: {runtime: "deno"}}
    ]
</script>
<svelte:head>
    <title>Quick start - Vixeny</title>
    <meta name="description" content="How to install Vixeny" />
</svelte:head>

# Quick start

Here's how to start

<Tabs data={tab1}/>


