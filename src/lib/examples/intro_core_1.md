<script>
    export let runtime = "main";
</script>

{#if runtime == "main"}

```ts
import { wrap } from 'vixeny';
import { helloWorld, options } from './setup.ts';

const root = wrap(options)()
	.stdPetition({
		path: '/ping',
		f: () => 'pong'
	})
	.addAnyPetition(helloWorld);
```

{:else}

```ts
import { plugins, petitions } from 'vixeny';

const options = plugins.globalOptions({});

const helloWorld = petitions.common()({
	path: '/hello',
	f: () => 'helloWorld'
});

export { options, helloWorld };
```

{/if}
