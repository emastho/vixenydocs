```ts
import { wrap } from "vixeny";

const handler = wrap()()
  .stdPetition({
    path: "/sign/:user",
    crypto: {
      globalKey: "secret!",
    },
    f: ({ sign, param }) => sign(param),
  })
  .testRequests();

await handler(new Request("http://localhost/sign/pluie"))
  .then((x) => x.text())
  .then(console.log);
```

```ts
import { wrap } from "vixeny";

// Generic
const cryptoOptions = {
  crypto: {
    globalKey: "secret!",
  },
};
const handler = wrap()()
  .stdPetition({
    path: "/sign/:user",
    // Manually adding crypto options,
    crypto: {
      globalKey: "secret!",
    },
    f: ({ sign, param }) => sign(param),
  })
  .customPetition({
    path: "/isItValid",
    method: "POST",
    // Append options
    ...cryptoOptions,
    f: async ({ verify, req }) => {
      // Verifies the body
      const token = verify(await req.text());

      // Check validity of the token
      if (token) {
        // If the token is not null returns status 200
        return new Response(null, { status: 200 });
      } else {
        // If the token is null returns status 403
        return new Response(null, { status: 403 });
      }
    },
  })
  .testRequests();

// Getting the token of { user : "pluie" }
const token = await handler(new Request("http://localhost/sign/pluie"))
  .then((x) => x.text());

// Checking validity
await handler(
  new Request("http://localhost/isItValid", {
    method: "POST",
    body: token,
  }),
)
  .then(console.log);
```
