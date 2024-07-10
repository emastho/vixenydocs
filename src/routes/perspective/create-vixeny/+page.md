
<script>
  // Importing necessary components
  import Tabs from "$lib/components/Tabs.md";
  import Bash from "$lib/components/SmallComponents/Bash.md";

  // Array containing the installation options for the Tabs component
  const install = [
    { title: "Bun", component: Bash, details: { runtime: "bun" } },
    { title: "Deno", component: Bash, details: { runtime: "deno" } }
  ];
</script>

<svelte:head>
  <script src='/prism.mjs' defer></script>
  <title>Introduction - Vixeny</title>
  <meta name="description" content="Using create-vixeny"/>
</svelte:head>


# Welcome

This introdcution will help you to understand the basics of vixeny's structure


## Structure
Once you have finished your installation and you have selected templates:

<Tabs data={install}/>

You will end up with a template like this:

  ```bash
  ./
  ├── main.ts
  ├── package.json
  ├── src/
  │   ├── globalOptions.ts
  │   ├── paths/
  │   │   └── root.ts
  │   └── plugins/
  │       ├── tsx.ts
  │       ├── typebox.ts
  │       └── typescript.ts
  ├── tsconfig.json
  ├── views/
  │   ├── public/
  │   │   ├── $main.tsx
  │   │   ├── css/
  │   │   │   ├── ...
  │   │   └── mjs/
  │   │       └── main.ts
  │   └── scripts/
  │       └── addFooter.ts
  └── watcher.mjs
  ```

  - `main.ts` is the entrypoint of the server
  - `src` has all the dynamic routes exist, where:
      + `paths` have the logical routes
      + `plugins` include addons and templates
      + `globalOptions.ts` is where the options for `wrap` and the `handler` exist
  - `views` folder keeps all the static templates
      + `public` will expose `ALL` the files in 
      + `scripts` is a place where you can manage `ts` file and after import in public to convert to `mjs`
  - `watcher.mjs` is the debugger

## Lazyness

## Plugins

```ts
// dev
import * as Avj from "@feathersjs/schema";
import * as TypeBox from "@sinclair/typebox";
// vix
import * as Vixney from "vixeny";
import { typeBox } from "vixeny-plugins";

const { plugins, wrap  } = Vixney
const { Type } = TypeBox;

const parser = typeBox.composedBox(Vixney)(Avj)(TypeBox);
const bodyParser = parser({
  key: {
    scheme: {
      id: Type.Number(),
      text: Type.String(),
      createdAt: Type.Number(),
      userId: Type.Number(),
    },
    options: { $id: "Message", additionalProperties: false },
  },
});

const opt = plugins.globalOptions({
  cyclePlugin: {
    typebox: bodyParser,
  },
});

const serve = wrap(opt)()
  .stdPetition({
    path: "/hi",
    method: "POST",
    f: ({ typebox }) => JSON.stringify(typebox?.key),
  })
  .compose();
  ```


## Templates

```ts
import * as pugModule from "pug";
import { plugins , composeResponse } from "vixeny";
import { pugStaticServerPlugin } from "vixeny-perspective";

const serve = composeResponse()([
  {
    type: "fileServer",
    name: "/",
    path: "./public/",
    template: [pugStaticServerPlugin(pugModule.compileFile)()],
  },
]);
```

## Semi Static


```ts
import * as pugModule from "pug";
import { plugins , composeResponse } from "vixeny";
import { pugStaticServerPlugin } from "vixeny-perspective";

const serve = composeResponse()([
  {
    type: "fileServer",
    name: "/",
    path: "./public/",
    template: [pugStaticServerPlugin(pugModule.compileFile)()],
  },
]);

const serve2 = composeResponse()([
  {
    type: "fileServer",
    name: "/",
    path: "./public/",
    template: [
      pugStaticServerPlugin(pugModule.compileFile)({
        petition: composer.objectNullRequest()({
          f: () => ({ name: "Dave" }),
        }),
      }),
    ],
  },
]);
```


