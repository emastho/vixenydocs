import { wrap } from "vixeny";


const app = await wrap({
  // wrap: {
  //   startsWith: "/extension",
  // },
})()
  .get({
    path: "/one/one",
    f: () => "one",
  })
  .get({
    path: "/one/:id",
    f: () => "two",
  })
  .testRequests();


  await app(new Request('http://hello/one/one'))
  .then( async (res) => await res.text())
  .then( console.log)

