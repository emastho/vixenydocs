
<script>
  // Importing necessary components
  import Tabs from "$lib/components/Tabs.md";
  import Bash from "$lib/components/SmallComponents/Bash.md";
  import plugin from "$lib/examples/plugins_typebox.md";
  import Request from "$lib/components/Request.svelte"
  // Array containing the installation options for the Tabs component
  const install = [
    { title: "Bun", component: Bash, details: { runtime: "bun" } },
    { title: "Deno", component: Bash, details: { runtime: "deno" } }
  ];
  const tab0 = [
      {title: "main.ts", component: plugin, details: {runtime: "main"}},
      {title: "setup.ts", component: plugin, details: {runtime: "setup"}}
  ];
</script>

<svelte:head>
  <script src='/prism.mjs' defer></script>
  <title>Introduction - Vixeny</title>
  <meta name="description" content="Using create-vixeny"/>
</svelte:head>


# Welcome
Welcome to vixeny templates! Here are some basics of how the template engine works, it's recommended to learn how the dynamic path system works, via the link below.

>  [Dynamic routes](/framework/init)


## Before We Start!

We will be using a second server hosted on `Deno Deploy` for the examples. You can ping the server here:

<Request url="https://vixeny.deno.dev/ping" displaysData={false} />

**Disclaimers**

- It's a free-tier host.
- We are not affiliated with Deno or the Deno team.
- The first ping call is always slower due to the handshake with the server; the average ping is 55ms.




## Introduction to Vixeny's Structure

Let's dive into the structure briefly seeing how everything interacts.

### File Structure

The structure of a typical Vixeny project after installation and template selection looks like this:

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

### Explanation of Key Files and Directories

1. **main.ts**: The main entry point of the server.
2. **src**: Contains all the dynamic routes.
   - **paths**: Houses the logical routes.
   - **plugins**: Contains addons and templates.
   - **globalOptions.ts**: Holds options for `wrap` and the `handler`.
3. **views**: Contains static templates.
   - **public**: Exposes all files for public access.
   - **scripts**: Manages TypeScript `ts` files, which are then imported into public to convert to `mjs`.
4. **watcher.mjs**: The debugger script.

### Current Options

Templates work by pointing at a directory and hosting it to the handler, it's   important to remark that:

 - They respect nested wildcards.
 - The handler can have more than one.

The next example assumes that you only installed `pug`.

```javascript
const fileServer = plugins.fileServer({
  type: "fileServer",
  // Hosted on 
  name: "/",
  // Takes files from 
  path: "./views/public/",
  // Removes extensions of 
  removeExtensionOf: [".html"],
  // If a file starts with it, it will become the `/` of the directory
  slashIs: "$main",
  // Current templates in use:
  template: [pugP,typescriptP]
});
```
You can find this file at `src/globalOptions.ts`.

### Plugins and Templates

#### Example of Using Typebox plugin

As we know from the core introduction, plugins only exist if they are included in the `options`, here a basic implementation but by default all files are set up in `create-vixeny`.

You can find this file at `src/plugins`.

<Tabs data={tab0}/>

#### Example of Using Pug Template

Most of the templates have a :  

- `default`: Gives an object to all the templates for compilation. 
- `preserveExtension`: Removes the extension of the file. 
- `petition`: Enables a semi-static route using a petition for all the routes in the wildcard. 

In the next example we will use pug so, let's create a file called `hello.pug`.

1. Create a `hello.pug` file:
   ```pug
   p #{name}'s Pug source code!
   ```

2. Install the `pug` package and set up `src/plugins/pug.ts`:
   ```ts
   import * as pugModule from "pug";
   import { plugins , composeResponse } from "vixeny";
   import { pugStaticServerPlugin } from "vixeny-perspective";

   const serve = composeResponse()([
     {
       type: "fileServer",
       name: "/",
       path: "./public/",
       template: [
         pugStaticServerPlugin(
           pugModule.compileFile
         )({
           preserveExtension: false,
           // Default case
           default: {
             name: 'avant'
           }
         }),
       ],
     },
   ]);
   ```

3. Fetch the rendered page:

<Request url="https://vixeny.deno.dev/hello" displaysData={false} />



### Semi-Static Routes

As we saw in the last example, you can have a default case but vixeny's structure also allows you to have a petition for the whole `staticFileServe`.

#### Using `composer.objectNullRequest`

1. Create a petition that checks for a query parameter:

To do this we need composer.objectNullRequest , where if this petition returns null it will return the default case, otherwise it will pass the object to the template.

   ```javascript
   import { composer } from "vixeny";

   const petition = composer.objectNullRequest()({
    // If query.name exist, it returns the object query, otherwhise it returns null
     f: ({ query }) => 
       query?.name 
          ? query 
          : null
   });
   ```
2. Modify `pugStaticServerPlugin` to use the petition:
   ```ts
   import { pugStaticServerPlugin } from "vixeny-perspective";
   import { composer } from "vixeny";
   import * as pugModule from "pug";

   export default pugStaticServerPlugin(pugModule.compileFile)({
     preserveExtension: false,
     default: { name: 'avant' },
     petition: composer.objectNullRequest()({
       f: ({ query }) => 
         query?.name 
         ? query 
         : null
     })
   });
   ```

#### Fetching with and without a Query Parameter




- Default:

<Request url="https://vixeny.deno.dev/hello" displaysData={true} />

- With a query parameter:


<Request url="https://vixeny.deno.dev/hello?name=dave" displaysData={true} />

You can find this file at `src/plugins`.