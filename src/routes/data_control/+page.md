<script>
    import PreviousNext from "$lib/components/PreviousNext.svelte"
    import Heading from "$lib/components/Heading.svelte"
</script>

<svelte:head>
    <title>Data Control - Vixeny</title>
    <meta name="description" content="Learn how to manipulate and test data in Vixeny, a functional approach to modern web development." />
</svelte:head>


# Data Control

Welcome to the guide on Data Control in Vixeny. Whether you are creating a complex web application or simply want to manage your data more effectively, understanding how to manipulate and test objects is crucial. This guide will walk you through some common techniques for object manipulation and testing with pure functionality in Vixeny. Let's dive in!

This guide covers Data Control in Vixeny, a modern web development tool. It highlights object manipulation and testing using pure functionality in Vixeny. 

<Heading title="Object Manipulation" size="2" />

**Changing Properties**: Use the spread operator (`...`) to create a new object by copying existing properties and overriding the ones you want to change.
   ```ts
   const newPetition = { ...existingPetition, path: "/newRoute" };

   vixeny()([
      {...existingPetition},
      {...newPetition},
      {...existingPetition, path: "/creatingOnTheFly"},
      {
         path: "/",
         f: () => "hello world"
      }
   ])
   ```

<br>

**Changing and Adding `resolve` and `branch`**: Modify the behavior of a petition or compose new ones by changing or adding `resolve` and `branch`.
   ```ts
   resolve: {...r_auth},
   branch: {...b_auth}
   ```
   or
   ```ts
   resolve: [...r_auth],
   branch: [...b_auth]
   ```
<br>


<Heading title="Testing with Pure Functionality" size="2" />

**Mocking Functions with multiple states**: Substitute context argument that could have more than one state with a fix expression to test in isolation.

   ```ts
   import { Petition} from "vixeny/types";
   import petitionComposer from "vixeny/components/optimizer/petitionComposer";

   const petitionWithRadom:Petition = {
      path: "/path",
      f: ctx => ctx.randomNumber > .99
            ? "winner"
            : "try again"
      }

   assertEqual(
    await petitionComposer()(
      {
         ...petitionWithRadom, 
         options: {setRandomNumber: 1}
      }), 
    "winner"
    )
   ```


**Mocking Async Functions**: Substitute asynchronous functions with synchronous versions that return known values to control behavior and test in isolation.
   ```ts
   import { Petition} from "vixeny/types";
   import petitionComposer from "vixeny/components/optimizer/petitionComposer";

   const yourAsyncFunction:Petition = {
         path: "/get/:user",
         resolve: {
            name: "nested",
            f: async context => await db.exist(context.param.user)
         },
         f: context => context.resolve.nested as boolean
            ? "exist"
            : "not found"
      }


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
    "exist"
    )
   ```

### Benefits of Mocking in Functional Programming:
   - **Isolation**: Replace dependencies with mock implementations to isolate the function being tested.
   - **Reproducibility**: Create deterministic tests where the same input always produces the same output.
   - **Ease of Testing**: Eliminate the need to set up and tear down external dependencies.

***important:*** this could be done also with `branch` and `resolve` in isolation

<Heading title="Conclusion" size="2" />

Understanding data manipulation and testing in Vixeny, by embracing functional programming principles and thorough testing, helps in creating robust, maintainable, and efficient applications. For more advanced topics or a deep dive into other features of Vixeny, refer to the complete guide.


coming soon: `fluency`

<PreviousNext previous="data_flow" next="docs"/>
