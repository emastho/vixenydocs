<svelte:head>
    <title>Data Control - Vixeny</title>
    <meta name="description" content="sup" />
</svelte:head>


## Object Manipulation in Vixeny

In Vixeny, you often work with objects representing petitions, and it might be necessary to manipulate these objects to achieve the desired behavior. Let's explore some common techniques you can use.

### Changing Properties in an Object

Sometimes, you might want to modify a specific property of an existing petition, such as changing the route path. In Vixeny, this can be done using the spread operator (`...`), which allows you to create a new object with the existing properties and override the ones you want to change. Here's an example:

```ts
const existingPetition = { path: "/oldRoute", /* other properties */ };
const newPetition = { ...existingPetition, path: "/newRoute" };

vixeny(
  /* Options */
)(
  // Spreading the imported Petitions into the second curried function
  {...existingPetition},
  {...newPetition},
  {...newPetition, path: "/anotherPath"}
)
```

### Importing and Spreading Petitions

Vixeny's flexibility allows you to import an array of Petitions from other files and add them to your application using the spread operator (`...`). This is useful when you want to organize your code across multiple files or reuse Petitions in different parts of your application.

Here's an example that demonstrates how to import and spread Petitions:

```ts
// Importing an array of Petitions from another file
import { petitionsArray } from "./path/to/petitions";

vixeny(
  /* Options */
)(
  // Spreading the imported Petitions into the second curried function
  ...petitionsArray
)
```
By using the spread operator, you can easily combine, override, and manage Petitions, enabling more modular and maintainable code.

### Changing and Adding `resolve` and `branch`

Vixeny's pure functionality allows you to change or add `resolve` and `branch` to your petitions. This enables you to modify the behavior of a petition or compose new ones, maintaining the integrity of the original object.

Here's an example that demonstrates how to change a `resolve`:

```ts
const existingPetition = {
  name: "/oldRoute",
  resolve: { /* existing resolve properties */ },
  // other properties
};
const newResolve = { /* new resolve properties */ };
const newPetition = { ...existingPetition, resolve: newResolve };

```

Similarly, you can add or modify a `branch` using the same technique:

```ts
const newBranch = { /* new branch properties */ };
const newPetitionWithBranch = { ...existingPetition, branch: newBranch };
```

### Testing with Pure Functionality

The pure nature of Vixeny's petitions provides a highly advantageous testing environment, allowing developers to rigorously examine their code in isolation from external dependencies. This brings about several benefits that enhance the development experience:

#### 1. Isolation of Components

In a functional program, you can isolate different parts of your application and test them independently. Since Vixeny's `resolve` and `branch` are pure functions, you can test them without worrying about the overall state of your application or the environment in which they run.

#### 2. Ease of Mocking

With the immutability of pure functions, you can easily replace the original `resolve` and `branch` with mocked versions for testing purposes:

```js
const mockResolve = { /* mock implementation for testing */ };
const mockBranch = { /* another mock implementation */ };
const purePetition = { ...existingPetition, resolve: mockResolve, branch: mockBranch };

// You can now test purePetition in isolation
```

This allows you to create controlled test scenarios, where you have complete mastery over the inputs and expected outputs.

#### 3. Reproducibility

Tests with pure functions can be run repeatedly and in any order, always producing the same result for the same input. There's no hidden state or external data that can affect the outcome. This predictability makes the tests more robust and the code more maintainable.

#### 4. Composability for Complex Testing

By treating `petitions`, `resolve`, and `branch` as values, you can compose them in various ways to create complex testing scenarios:

```js
const combinedPetition = {
  ...basePetition,
  resolve: combineResolves(baseResolve, additionalResolve),
  branch: combineBranches(baseBranch, additionalBranch),
};

// combinedPetition can now be tested as a whole or in parts
```

You can reuse, modify, and merge them at will, providing a flexible way to approach complex testing requirements.

#### 5. Alignment with Functional Principles

Embracing pure functionality for testing aligns with the broader philosophy of functional programming, enhancing code readability, maintainability, and correctness. The deliberate avoidance of side effects means that each part of your application can be understood in isolation.


### Conclusion

Testing with pure functionality is more than a feature in Vixeny—it's a foundational concept that permeates the entire framework. By fully embracing this approach, developers can create more resilient, clear, and flexible code, enhancing not only the application's quality but also the development experience itself.

The principles of isolation, ease of mocking, reproducibility, and composability come together to make testing in Vixeny an integral and rewarding aspect of building modern web applications.

