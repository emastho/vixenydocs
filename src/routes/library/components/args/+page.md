# args

```ts
import { petitions, wrap } from "vixeny";

// `args` are only used in `branch`
const returnArgs = petitions.branch()({
  // Gets the type of string `{} as string` is also valid
  args: "string",
  // Using the args that are passed to this `branch`
  f: (ctx) => ctx.args,
});

const handler = wrap()()
  .stdPetition({
    path: "/user/:id",
    branch: {
      // Adding a branch
      returnArgs,
    },
    f: ({ branch, param }) => branch.returnArgs(param.id),
  })
  .testRequests();

// Logging bubbles
console.log(
  await handler(new Request("http://localhost/user/bubbles")).then(
    (res) => res.text(),
  ),
);
```