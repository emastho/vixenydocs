<script>

</script>

<svelte:head>


<title>Session plugin - Vixeny</title>
  <meta name="description" content="Using Session in Vixeny"/>
  <meta name="keywords" content="Session, web development, Vixeny framework, FP, functional programming, plugin"/>
</svelte:head>

# Session

Session mannager in Vixeny.

## Examples

Basic Example

### Checking for a valid session

Session are validated at the resolution of the CTX

```js
import { components, wrap } from "vixeny";

const user = components.session < { hello: string } > ({
  removeDeleteUnusedSession: true,
});

const handler = wrap({
  // Adding the plugin
  cyclePlugin: {
    user,
  },
})()
  .get({
    path: "/",
    f: ({ user }) => {
      // Returns the current session
      return user.newSession({ hello: "hi" });
    },
  })
  .get({
    path: "/only",
    // Returns a true if the user has a valid session
    f: ({ user }) => String(user.valid),
  })
  .testPetitions();

const req = new Request("http://localhost/");

// Gets session
const token = await handler(req)
  .then((res) => res.text());

// Adding the session to a cookie
const isSession = new Request("http://localhost/only", {
  headers: {
    Cookie: "session=" + token,
  },
});

// Sending a request without a session
await handler(new Request("http://localhost/only"))
  .then((res) => res.text())
  // Logs `false`
  .then(console.log);

// Sending a request with a valid session
await handler(isSession)
  .then((res) => res.text())
  // Logs `true`
  .then(console.log);
```
