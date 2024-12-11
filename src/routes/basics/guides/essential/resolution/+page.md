<script>

 import ListOfComponents from '$lib/components/listofEssential.svelte';
</script>

# Resolution

<object type="image/svg+xml" data="/d2/resolve_struct.svg"></object>

Unlike traditional frameworks that rely on life cycles for code execution and
rendering management, Vixeny employs a concept called "resolution." A resolution
is defined as:

> Anything defined with a `resolve` must be fully resolved before its caller can access it. This creates a chain of dependencies that are resolved in sequence.

Still wondering what that means?

> Any `petition` , `resolve` or `branch` can be utilized within a another one following a logical sequence.

Let's break it down with more examples.

```javascript
import { petitions, wrap } from 'vixeny';

const nestedResolve = petitions.resolve()({
	f: () => 'hello from resolve'
});

// Resolve with another resolve nested
const resolved = petitions.resolve()({
	resolve: {
		nestedResolve
	},
	f: ({ resolve }) => resolve.nestedResolve
});

// Branch with another resolve nested
const branched = petitions.branch()({
	resolve: {
		nestedResolve
	},
	f: ({ resolve }) => resolve.nestedResolve
});

const app = await wrap()()
	.get({
		path: '/',
		resolve: {
			// Adding the resolve
			resolved
		},
		branch: {
			// Adding the branch
			branched
		},
		f: ({ resolve, branch }) =>
			// Always return the same because came from the same resolve
			resolve.resolved === branch.branched(null) ? 'same resolve' : 'oh this should be possible'
	})
	.testPetitions();

await app('/').then(async (res) => console.log(await res.text()));
```

<object type="image/svg+xml" data="/d2/nested_resolve.svg"></object>

## Resolve Properties

Vixeny's resolution mechanism ensures that data dependencies are resolved before
the main function is executed (Basically an import for the ctx).

### SyncAgnostic

Vixeny's design ensures that the signature of your `f`,
remains unaffected by whether its dependencies, declared in `resolve`, are
synchronous or asynchronous.

```javascript
import { wrap, petitions } from 'vixeny';

const hello = petitions.resolve()({
	f: async () => await Promise.resolve('Hello')
});

const app = await wrap()()
	.get({
		path: '/helloWorld',
		resolve: {
			// Adding `hello`.
			hello,
			// Everything in vixeny is nameless and stateless by nature.
			world: { f: () => 'world' }
		},
		// Important to notice that `f` is synchronous even if the resolve `hello` is not.
		f: ({ resolve }) => `${resolve.hello} ${resolve.world}`
	})
	.testPetitions();

await app('/helloWorld').then(async (res) => console.log(await res.text()));
```

## List

<ListOfComponents />

## Extra

### Definition

<span class=quote-advance>

So we can say:

A resolution involves chaining the resolution of any morphism (petition) by
its resolve.

</span>
