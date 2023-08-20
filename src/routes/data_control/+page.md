<svelte:head>
    <title>Data Control - Vixeny</title>
    <meta name="description" content="sup" />
</svelte:head>


# Data Control

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

### Changing and Adding `resolve` and `branch`

Vixeny's pure functionality allows you to change or add `resolve` and `branch` to your petitions. This enables you to modify the behavior of a petition or compose new ones, maintaining the integrity of the original object.

Here's an example that demonstrates how to change a `resolve`:

```ts
// Importing an authentication resolve
import r_auth from "./somewhere"

{
  // Defining the path for the petition
  path: "/user/:name",
  
  // Using the spread operator to incorporate authentication into the resolve
  resolve: {...r_auth},
  
  // A function that returns the authenticated body or a default value if not valid
  f: c => c.resolve.auth as BodyInt ?? "not_valid"
}

```

Similarly, you can add or modify a `branch` using the same technique:

```ts
// Importing an authentication branch
import b_auth from "./somewhere"

{
  // Defining the path for the petition
  path: "/user/:name",
  
  // A function that returns the authenticated body or a default value if the name is not "bun"
  f: c => c.param.name === "bun" 
    ? c.branch.auth(c.param.name) as BodyInt 
    : "not_valid",
  
  // Using the spread operator to incorporate authentication into the branch
  branch: {...b_auth}
}

```

These comments break down the code and explain each part of the petition's construction, making it easier to understand how `resolve` and `branch` are being manipulated.

### Importing and Spreading Petitions

Vixeny's flexibility allows you to import an array of Petitions from other files and add them to your application using the spread operator (`...`). This is useful when you want to organize your code across multiple files or reuse Petitions in different parts of your application.

Here's an example that demonstrates how to import and spread Petitions:

```ts
// Importing an array of Petitions from another file
import  petitionsArray  from "./path/to/petitions";

vixeny(
  /* Options */
)(
  // Spreading the imported Petitions into the second curried function
  ...petitionsArray
)
```
By using the spread operator, you can easily combine, override, and manage Petitions, enabling more modular and maintainable code.


### Testing with Pure Functionality


The pure nature of Vixeny's petitions provides an advantageous testing environment, allowing developers to rigorously examine their code in isolation from external dependencies. This includes mocking async functions to test them in a pure state. Let's explore these concepts further:

#### 1. **Mocking Async Functions**

In testing, you often encounter situations where you want to test a function that relies on an asynchronous operation. By mocking the async function, you can substitute it with a synchronous version that returns a known value, allowing you to control the behavior and test it in isolation.

Here's an example of how you can mock an async function and use `assertEqual` to test it assuming that:


- If the `resolve` returns `true`, then `yourAsyncFunction` will return "valid."
- If the `resolve` returns `false`, then `yourAsyncFunction` will return "invalid."
- If the `resolve` returns `null`, then `yourAsyncFunction` will return "error."


```ts
import { assertEqual } from "your-testing-library";
import petitionComposer from "vixeny/components/optimizer/petitionComposer"
import  yourAsyncFunction  from "./path/to/asyncFunction";

//Deno
Bun.test("test", async () => {
  assertEqual(
    await petitionComposer()(
      {...yourAsyncFunction, resolve: {
        ... yourAsyncFunction.resolve ,
        f: () => true
      }}
    ), 
    "valid"
  )
  assertEqual(
    await petitionComposer()(
      {...yourAsyncFunction, resolve: {
        ...yourAsyncFunction.resolve, 
        f: () => false
      }}
    ), 
    "invalid"
  )
  assertEqual(
    await petitionComposer()(
      {...yourAsyncFunction, resolve: {
        ... yourAsyncFunction.resolve ,
        f: () => null
      }}
    ), 
    "error"
)
})
```

By substituting the async function with the mocked one, you can test the behavior in a pure state, giving you confidence that your code is working as intended.

#### 2. **Benefits of Mocking in Functional Programming**

- **Isolation**: By replacing dependencies with mock implementations, you can isolate the function you are testing from the rest of the system, ensuring that the test only depends on the input.
- **Reproducibility**: Mocking allows you to create deterministic tests where the same input always produces the same output, regardless of external factors.
- **Ease of Testing**: Mocking simplifies testing by eliminating the need to set up and tear down external dependencies, making your tests faster and more robust.

### Conclusion

Testing with pure functionality in Vixeny empowers developers to create more reliable, maintainable, and understandable code. By taking advantage of mocking techniques, including the substitution of async functions, you can ensure that your applications are tested thoroughly and perform as expected. This comprehensive approach to testing is a cornerstone of modern web development in Vixeny, reinforcing the benefits of functional programming and enhancing the overall development experience.
