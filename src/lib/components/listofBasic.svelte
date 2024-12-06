<script>
    let plugins = [
        {  name: "Branch", link: "/basics/guides/basics/branch" , description: "Gets access to the functions in branch." },
        {  name: "Cookie", link: "/basics/guides/basics/cookies" , description: "Manages HTTP cookies." },
        {  name: "Query", link: "/basics/guides/basics/query", description: "Facilitates easy access to URL query parameters."  },
        {  name: "Param", link: "/basics/guides/basics/param", description: "Extracts URL path parameters."  },
        {  name: "Headers", link: "/basics/guides/basics/headings", description: "Provides access to HTTP request headers."  },
        {  name: "Resolve", link: "/basics/guides/basics/resolve", description: "Gets the values of the resolved functions." },
        {  name: "IO", link: "/basics/guides/basics/io", description: "Handles file operations." },
        { name: "Sign & Verify", link: "/basics/guides/basics/sign", description: "Gives access to a sign and verify function." },
        { name: "Token", link: "/basics/guides/basics/token", description: "Verifies the cookies with the current key." }
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
        border-left: 5px solid var(--second);
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

