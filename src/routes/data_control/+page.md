<svelte:head>
    <title>Data Control - Vixeny</title>
    <meta name="description" content="Learn how to manipulate and test data in Vixeny, a functional approach to modern web development." />
</svelte:head>


# Data Control

Welcome to the guide on Data Control in Vixeny. Whether you are creating a complex web application or simply want to manage your data more effectively, understanding how to manipulate and test objects is crucial. This guide will walk you through some common techniques for object manipulation and testing with pure functionality in Vixeny. Let's dive in!

This guide covers Data Control in Vixeny, a modern web development tool. It highlights object manipulation and testing using pure functionality in Vixeny. 

### Object Manipulation:
1. **Changing Properties**: Use the spread operator (`...`) to create a new object by copying existing properties and overriding the ones you want to change.
   ```ts
   const newPetition = { ...existingPetition, path: "/newRoute" };
   ```
2. **Changing and Adding `resolve` and `branch`**: Modify the behavior of a petition or compose new ones by changing or adding `resolve` and `branch`.
   ```ts
   resolve: {...r_auth},
   branch: {...b_auth}
   ```
3. **Importing and Spreading Petitions**: Import an array of Petitions from other files and add them to your application using the spread operator.
   ```ts
   ...petitionsArray
   ```
### Testing with Pure Functionality:
1. **Mocking Async Functions**: Substitute asynchronous functions with synchronous versions that return known values to control behavior and test in isolation.
   ```ts
   assertEqual(
    await petitionComposer()(
      {
        ...yourAsyncFunction, 
        resolve: 
        {
          ...yourAsyncFunction.resolve, 
          f: () => true
        }
      }), 
    "valid"
    )
   ```
2. **Benefits of Mocking in Functional Programming**:
   - **Isolation**: Replace dependencies with mock implementations to isolate the function being tested.
   - **Reproducibility**: Create deterministic tests where the same input always produces the same output.
   - **Ease of Testing**: Eliminate the need to set up and tear down external dependencies.

### Conclusion:
Understanding data manipulation and testing in Vixeny, by embracing functional programming principles and thorough testing, helps in creating robust, maintainable, and efficient applications. For more advanced topics or a deep dive into other features of Vixeny, refer to the complete guide.