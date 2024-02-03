<script>
    import PreviousNext from "$lib/components/PreviousNext.svelte"
</script>
<svelte:head>
    <title>Morpishim - Vixeny</title>
    <meta name="description" content=" understanding morpishim" />
</svelte:head>


# Demystifying Vixeny: Building Your Digital Home

Imagine embarking on the exciting journey of building your dream home. In this adventure, Vixeny acts as your master architect and project manager, guiding every step with precision and care, ensuring that your digital creation comes to life just as you envisioned.

## The Foundations of Vixeny: Resolve and Branch

In the construction of your home, every detail matters—from laying the foundation to the finishing touches that make your house a home. Vixeny employs two main concepts to manage this process: `Resolve` and `Branch`, akin to the preparation and expansion phases of building.

### Laying the Groundwork with Resolve

Before any construction begins, the groundwork must be meticulously prepared. `Resolve` in Vixeny handles this essential prep work for your web application, gathering all necessary data, permissions, and tools before the main functionality comes to life.

- **Preparation Phase**: Just like ensuring the land is ready and materials are on-site for a house, `Resolve` sets up everything needed for the main function of your site, ensuring a solid foundation.
- **Asynchronous Operations**: Mirroring the waiting period for materials to arrive, asynchronous `Resolves` wait for data, making sure everything is perfectly aligned and ready for use.
- **Execution Order**: Emphasizing the critical sequence of construction steps, `Resolves` ensure that all preliminary tasks are completed in order, setting the stage for the main functionality.

### Expanding Creatively with Branch

With the foundation set, imagine adding unique features to your home—a garden, a sunroom, or a bespoke library. `Branch` in Vixeny enables these expansions, allowing for additional operations that bring extra functionality and flair to your application.

- **Modular Design**: Like choosing a design for a room that can be replicated or adapted elsewhere, Branches offer reusability, letting you extend your application’s functionality without starting from scratch.
- **Maintaining Purity**: Ensuring the use of quality materials that preserve your home's integrity, Vixeny emphasizes the purity of functions in Branches, preventing unexpected side effects and maintaining reliability.
- **Future-proofing with Mocking**: Planning for future changes or additions is crucial in both home building and web development. Mocking in Vixeny allows for testing different scenarios, ensuring your application is robust and adaptable, ready to meet evolving user needs.

## Building with Intention: The Vixeny Way

Constructing with Vixeny is about more than just assembling code. It's about crafting with purpose, vision, and adaptability. The principles of modularity, purity, and testability stand as the foundation pillars, ensuring that your digital creation—like a well-built home—is functional, beautiful, and enduring.

- **Reusability and Flexibility**: Just as a well-designed home can adapt to its inhabitants' changing needs, Vixeny’s modular approach with resolves and branches ensures your application can grow and evolve.
- **Quality and Reliability**: High-quality materials make a home safe and lasting; similarly, the purity of functions in Vixeny guarantees that your application performs reliably under various conditions.
- **Prepared for the Future**: Anticipating future needs and changes makes a house a lasting home. Vixeny’s testing capabilities, through mocking, ensure that your application is prepared for whatever the future holds.



## Morphism

### Resolve and Branch

The Optimizer in Vixeny, after identifying all necessary functions, orchestrates the composition of petitions. This process intricately weaves together all resolves and branches, both of which are considered types of morphisms. Interestingly, a petition in itself is conceptualized as a morphism. This highlights the functional and compositional core of Vixeny, where both resolves and branches play pivotal roles:

## Resolve

- **Definition**: In any morphism, a `resolve` guarantees its resolution prior to the execution of the petition's main function (`f`).

  ```ts
  wrap()()
    .stdPetition({
      path: "/withResolve",
      resolve: {
        // The key name here can be any string
        hi: { c: () => "Hello world" }
      },
      // This petition consistently outputs "Hello world"
      f: (c) => c.resolve.hi,
    })
  ```

- **Asynchronous Functions**: Asynchronous resolves maintain the state of the morphism, meaning the asynchronous result is merged without altering the original state.

  ```ts
  wrap()()
    .stdPetition({
      path: "/withResolveAsync",
      resolve: {
        hi: { async c: () => await Promise.resolve("Hello world") }
      },
      // Note: The function in `f` is synchronous
      f: (c) => c.resolve.hi,
    })
  ```

- **Execution Order**: All resolves are executed and completed prior to their integration into the `CTX`, ensuring their resolved outputs are accessible within the `CTX` for the petition's logic.

  ```ts
  wrap()()
    .stdPetition({
      path: "/helloWorld",
      resolve: {
        hello: { async f: () => await Promise.resolve("Hello") }, 
        world: { f: () => 'world' }
      },
      f: c => `${c.resolve.hello} ${c.resolve.world}`,
    })
  ```

- **Uniqueness of `CTX`**: With the exception of `mutable`, each `CTX` instance remains unique and isolated, ensuring petitions remain decoupled.

  ```ts
  wrap(o)()
  .stdPetition({
    path: "/date",
    resolve: {
      date: morphism(o)({ f : c => c.date })
    },
    f: c => c.resolve.date !== c.date
        ? 'Always true'
        : 'Unreachable'
  })
  ```

- **Nested Resolves and Branches**: Vixeny supports an unlimited nesting of resolves and branches within each other.

  ```ts
  const hello = morphism(options)({
    resolve: {
      nestedHello: {
        f: () => "hello world"
      },
    },
    f: (c) => c.resolve.nestedHello,
  });

  wrap(options)()
    .stdPetition({
      path: "/hello",
      resolve: {
        hello: hello
      },
      f: (c) => c.resolve.hello,
    })
  ```

In Vixeny, `f` stands for `functor`, because: `functor preserve structure`. This concept underscores how resolves and the main function interact while maintaining the integrity of the petition's structure.


### Branch

In Vixeny, a `Branch` is used to incorporate additional logic or operations within the execution of a petition,which has its own `CTX`. Branches, like resolves, are morphisms but are specifically designed to execute alongside or within the main function (`f`) of a petition, offering a direct way to extend functionality without cluttering the primary logic.


### 1. Defining a Simple Branch

A branch can be as simple as a function that returns a static message. This example demonstrates how to define and use a simple branch within a petition:

```ts
const helloBranch = morphism()({
  f: (c) => "Hello from branch",
});

wrap()()
  .stdPetition({
    path: "/helloBranch",
    branch: {
      hello: helloBranch,
    },
    f: (c) => new Response(c.branch.hello(null)),
  })
```

- **Explanation**: Here, `helloBranch` is defined as a morphism with a function (`f`) that returns a static string. Within the petition, this branch is invoked, and its return value is used to construct a response.

### 2. Branch with Parameters

Branches can also accept parameters, making them dynamic in their operation. This example illustrates a branch that utilizes parameters from the `CTX`:

```ts
const greetUserBranch = morphism()({
  f: (c) => `Hello, ${c.arguments.name}`,
});

wrap()()
  .stdPetition({
    path: "/greet/:name",
    branch: {
      greetUser: greetUserBranch,
    },
    f: (c) => new Response(c.branch.greetUser({ name: c.param.name })),
  })
```

- **Explanation**: `greetUserBranch` takes a name parameter through `c.arguments` and returns a personalized greeting. The branch is executed in the petition's main function, using the name parameter extracted from the URL.

### 3. Asynchronous Branch

Branches can perform asynchronous operations, such as fetching data from a database or an external API:

```ts
const fetchUserDataBranch = morphism()({
  async f: (c) => {
    const userId = c.arguments.userId;
    return await fetch(`https://api.example.com/users/${userId}`).then(res => res.json());
  },
});

wrap()()
  .stdPetition({
    path: "/user/:userId",
    branch: {
      fetchUserData: fetchUserDataBranch,
    },
    f: async (c) => {
      const userData = await c.branch.fetchUserData({ userId: c.param.userId });
      return new Response(JSON.stringify(userData));
    },
  })
```

- **Explanation**: This branch, `fetchUserDataBranch`, performs an asynchronous fetch operation to retrieve user data based on `userId`. The petition uses this branch to fetch and return the user data as a response.

## Conclusion

Branches in Vixeny offer a robust mechanism for extending the functionality of petitions conserving all the functionallities of the `CTX`, allowing for both synchronous and asynchronous operations to be encapsulated within reusable units, which is specially imporant for mocking and testing.