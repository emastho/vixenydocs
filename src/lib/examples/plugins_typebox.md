<script>
    export let runtime = "main";
</script>

{#if runtime == "main"}

```ts
import { wrap } from "vixeny";
import { opt , request } from "./setup.ts"

const serve = wrap(opt)()
  .stdPetition({
    path: "/hi",
    method: "POST",
    f: ({ typebox }) => typebox?.key
     ? typebox.key.userId
     : null,
  })
  .compose();

const response = await serveMock(request);
const body = await response.text();

console.log(
    // 50
    body
)


```

{:else}

```ts
// dev
import * as Avj from "@feathersjs/schema";
import * as TypeBox from "@sinclair/typebox";
// vix
import * as Vixney from "vixeny";
import { typeBox } from "vixeny-plugins";

const { plugins  } = Vixney
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

  const validData = {
    id: 10,
    text: "Sample text",
    createdAt: Date.now(),
    userId: 50,
  };

  const request = new Request("http://hihihi.com/hi", {
    method: "POST",
    body: JSON.stringify(validData),
  });

export { opt , request}

```

{/if}
