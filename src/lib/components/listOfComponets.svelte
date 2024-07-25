<script>
    let plugins = [
        { emoji: "🌿", name: "branch", link: "/library/components/branch" , description: "Gets access to the functions in branch." },
        { emoji: "🍪", name: "cookie", link: "/library/components/cookie" , description: "Manages HTTP cookies." },
        { emoji: "🔍", name: "query", link: "/library/components/query", description: "Facilitates easy access to URL query parameters."  },
        { emoji: "📍", name: "param", link: "/library/components/param", description: "Extracts URL path parameters."  },
        { emoji: "📜", name: "headers", link: "/library/components/headers", description: "Provides access to HTTP request headers."  },
        { emoji: "✅", name: "resolve", link: "/library/components/resolve", description: "Gets the values of the resolved functions." },
        { emoji: "📂", name: "io", link: "/library/components/io", description: "Handles file operations." }
    ];

    let crypto = [
        { emoji: "✍️", name: "sign", link: "/library/components/sign", description: "Gives access to a sign function." },
        { emoji: "🔒", name: "verify", link: "/library/components/verify", description: "Gives access to a verify function." },
        { emoji: "🔑", name: "token", link: "/library/components/token", description: "Verifies the cookies with the current key." }
    ];


</script>

<style>
    .list {
        list-style-type: none;
        padding: 0;
    }

    .list-item {
        margin: 0.5em 0;
    }

    .emoji {
        margin-right: 2em;
        margin-left: 2em;
    }
</style>

<ul class="list">
    {#each plugins as plugin}
        <li class="list-item">
            <a href={plugin.link}>
                <span class="emoji">{plugin.emoji}</span>
                <strong>{plugin.name}</strong> : {plugin.description} 
            </a>
        </li>
    {/each}
</ul>


<h2>Crypto</h2>
<p>If <code>crypto</code> with at least a <code>globalKey</code> is present.</p>
<ul class="list">
    {#each crypto as item}
        <li class="list-item">
            <a href={item.link}>
                <span class="emoji">{item.emoji}</span>
                <strong>{item.name}</strong> : {item.description} 
            </a>
        </li>
    {/each}
</ul>

