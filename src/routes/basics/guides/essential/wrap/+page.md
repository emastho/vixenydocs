<script>

 import ListOfComponents from '$lib/components/listofEssential.svelte';

</script>

# Wrap

<object type="image/svg+xml" data="/d2/wrap.svg"></object>

## Get and Route

In a wrap, `.get()` , `.post()` and `.put()` are methods that have a predefine method for the `petition`. Also, you can access `.route()` to get access to more methods.

```javascript
import { petitions, wrap } from 'vixeny';

// Another way to see `get`
const std = petitions.add()({
	path: '/anotherPath',
	f: () => 'Hello'
});

// Creating a wrap instance with a standard petition
const app = await wrap()()
	.get({
		path: '/greet',
		f: () => 'Hello, World!'
	})
	// Access to all methods
	.route({
		path: '/moreMethods',
		method: 'OPTIONS',
		f: () => 'Hello, World!'
	})
	.addAnyPetition(std)
	// Making a server to test
	.testPetitions();

// Example of handling the request and outputting the response
await app('/greet').then(
	// Outputs: "Hello, World!"
	async (response) => console.log(await response.text())
);
```

## Unwrap and Union

The Wrap function was designed to work as if they were a block, protecting the petitions inside and helping them be used, transformed, or transported safely.

And sometimes we have to join them together, while we can do some operations like rebase the path, where `.unwrap()` and `. join ()` comes to play.

```javascript
import { wrap } from 'vixeny';

const extension = wrap({
	// Adds the extension `after` it's resolved or chainned
	wrap: {
		startsWith: '/extension'
	}
})()
	.get({
		path: '/one',
		f: () => 'one'
	})
	.get({
		path: '/two',
		f: () => 'two'
	});

const handler = wrap()()
	// Joins both wraps together respecting the `natural order`
	.union(extension.unwrap())
	.get({
		path: '/hello',
		f: () => 'helloWorld'
	})
	.logPaths();
```

## Filter

`.filter()` as its name implies, works as a filter, and it's e used as if we were using an array.

```javascript
import { wrap } from 'vixeny';

const app = wrap({
	// wrap: {
	//   startsWith: "/extension",
	// },
})()
	.get({
		path: '/one',
		f: () => 'one'
	})
	.get({
		path: '/two',
		f: () => 'two'
	})
	.get({
		path: '/dev-info',
		f: () => 'debug sfuff'
	});

app.filter((p) => !p.path.includes('/dev')).logPaths();
```

## What is chaining?

Chaining is a way to connect a series of steps (functions) together so each step passes its result to the next. This lets you build things step by step, without changing the original setup. It makes your code easier to read and understand.

In this framework, chaining means starting with something (like a `wrap`) and adding more actions to it, like `.get()` or `.addAnyPetition()`. Each time you add something, it creates a new version. If you don’t save the new version, the changes won’t stick.

### Why is chaining important?

1. **Easy to Follow**:
   You can see exactly what happens in the order it happens.

2. **Doesn’t Change Things by Accident**:
   Each step creates a new version, so the original stays the same.

3. **Flexible**:
   You can add, remove, or change steps without breaking other parts.

### Demonstrating its immutability

Here’s an example that shows how chaining works and what happens if you don’t save the changes:

```javascript
import { petitions, wrap } from 'vixeny';

// Create a standard petition
const std = petitions.add()({
	path: '/anotherPath',
	f: () => 'Hello'
});

// Create a chain
const app = await wrap()().get({
	path: '/greet',
	f: () => 'Hello, World!'
});

// This does nothing because the result is not saved
app.addAnyPetition(std);

// This does nothing because the result is not saved
app.get({
	path: '/anotherPath',
	f: () => 'Hello'
});

// Resolves the chain
const serve = await app.testPetitions();

await serve('/anotherPath').then((response) => console.log(response.status));
// Outputs: "404"
```

## List

<ListOfComponents />

## Extras

### What is chaining?

<span class=quote-advance>
So we can say:

Chaining is a powerful concept within functional frameworks that allows you to create a sequence of operations where each step passes its result to the next. It encourages a declarative and modular programming style, focusing on immutability and functional composition.

In this framework, chaining involves creating a pipeline of methods, such as `.get()` or `.addAnyPetition()`, that build on one another without mutating the original context. Each method call returns a new instance or a modified chain, which can be further extended or resolved.

</span>
