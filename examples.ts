import { petitions, wrap } from "vixeny";

const hasUser = petitions.resolve()({
  f: ({ query }) => query && query?.user ? query.user : null,
});

const forbiden = new Response(null, { status: 403 });

const root = wrap()()
  .get({
    path: "/ping",
    resolve: {
      hasUser,
    },
    f: ({
      resolve: {
        hasUser,
      },
    }) => hasUser ? `welcome ${hasUser}!` : forbiden.clone(),
  })
  .post({
    path: "/ping",
    resolve: {
      hasUser,
    },
    f: ({
      resolve: {
        hasUser,
      },
    }) => hasUser ? `welcome ${hasUser}!` : forbiden.clone(),
  });
