<script>
    let plugins = [
        { name: "Wrap", link: "/basics/guides/essential/wrap" , description: "Basics of how to use wrap" },
        { name: "Routing", link: "/basics/guides/essential/routing" , description: "How pathing works" },
        { name: "Ecosystem", link: "/basics/guides/essential/ecosystem", 
            description: "Learn the difference between `create` , `perspective` , `plugins` and `core`"  },
        { name: "Resolution", link: "/basics/guides/essential/resolution", description: "How to use `resolve` and `branch`" },

    ];


</script>


<style>
    .list {
        list-style-type: none;
        padding: 0;
    }

    .list-item {
        margin: 0.5em 0;
        padding-left: 16px;
        border-left: 5px solid var(--main);
    }


</style>


<ul class="list">
    {#each plugins as plugin}
        <li class="list-item">
            <a href={plugin.link}>
                <strong>{plugin.name}</strong> : {plugin.description} 
            </a>
        </li>
    {/each}
</ul>
