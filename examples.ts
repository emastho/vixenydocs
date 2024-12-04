import { wrap } from "vixeny";


const app = wrap({
  // wrap: {
  //   startsWith: "/extension",
  // },
})()
  .get({
    path: "/one",
    f: () => "one",
  })
  .get({
    path: "/two",
    f: () => "two",
  })
  .get({
    path: "/dev-info",
    f: () => "debug sfuff",
  });


  app
  .filter(p => !p.path.includes("/dev"))
  .logPaths()

