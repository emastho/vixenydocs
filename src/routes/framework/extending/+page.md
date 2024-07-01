
<script>
  import FancyLink from '$lib/components/FancyLink.svelte';
</script>

<svelte:head>

<title>Extending - Vixeny</title>
<meta name="description" content="Adding elements together" />
</svelte:head>


# Enclosing

Enclosing in Vixeny allows you to nest wraps, other frameworks  and functions within other wraps, effectively creating a clousere that the current wrap can't access to.

```ts
// Making a wrap with a specific index base set at the fourth segment
const wrapAt4 = wrap({
  indexBase: {
    at: 4,  
  },
})()
  .stdPetition({
    path: "/foo",
    f: () => "from inside", 
  })
  .stdPetition({
    path: "/foo/:hello",
    f: ({ param }) => param.hello,  
  })
  .compose();

// Making a server that includes the wrap within a broader path context
const serve = wrap()()
  .petitionWithoutCTX({
    path: "/bar/*",  // Encloses "wrapAt4" within the "/bar" path
    r: wrapAt4,
  }).testRequests();

const base = "http://localhost/bar";
const req = new Request(base + "/foo");       
const param = new Request(base + "/foo/param");

// Executing and logging the response from the "/foo" route
await serve(req).then((x) => x.text())
 // Expected to log "from inside"
    .then(console.log);
await serve(param)
    .then((x) => x.text())
    // Expected to log "param"
    .then(console.log); 
```

Thanks for your time.
