<script>
  import ListOfComponents from '$lib/components/listofBasic.svelte';

</script>

<svelte:head>

<title>IO - Vixeny</title>
  <meta name="description" content="Understanding IO"/>
  <meta name="keywords" content="IO, web development, Vixeny framework, FP, functional programming"/>
</svelte:head>

# IO

An Agnostic Implementation for IO Operations

## Specifications

### Runtime

- [x] Bun
- [x] Deno
- [ ] Node

## Methods

### textOf

- If the file is not found or fails, it returns `null`.

```javascript
import { wrap } from 'vixeny';

wrap()().get({
	path: '/getPackage',
	f: async ({ io }) => {
		const file = await io.textOf('./package.json');

		return new Response(file, {
			status: file ? 200 : 404
		});
	}
});
```

### writeText

- Returns a boolean after the operation is completed.
- It cannot throw an error.

```javascript
import { wrap } from 'vixeny';

wrap()().get({
	path: '/write',
	f: async ({ io }) => {
		// Returns boolean
		const wasWritten = await io.writeText('./file')('hello world!');

		return new Response(null, {
			status: wasWritten ? 200 : 400
		});
	}
});
```

## List

<ListOfComponents />
