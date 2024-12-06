<script>
    let plugins = [
        {  name: "Enclosing", link: "/basics/guides/advance/enclosing" , description: "Nesting routers" },
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
        border-left: 5px solid var(--third);
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
