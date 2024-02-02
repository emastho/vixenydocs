<script>
    import PreviousNext from "$lib/components/PreviousNext.svelte"
</script>
<svelte:head>
    <title>Morpishim - Vixeny</title>
    <meta name="description" content=" understanding morpishim" />
</svelte:head>



### Resolve and Branch

The Optimizer in Vixeny, after identifying all necessary functions, begins the composition of petitions. This process includes chaining all resolves and branches. Both resolves and branches are types of morphisms, and interestingly, a petition itself is another form of morphism. Let's delve into what these are and why they are necessary:

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

In Vixeny, 'f' stands for `functor`, because: `functor preserve structure`. This concept underscores how resolves and the main function interact while maintaining the integrity of the petition's structure.
