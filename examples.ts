import { wrap } from "vixeny";

const app = await wrap()()
  .get({
    path: "/api/first",
    f: () => "one",
  })
  .get({
    path: "/api/*",
    f: () => "two",
  })
  .get({
    // Becomes default case
    path: "/*",
    f: () => "default",
  })
  .testPetitions();

  // Logs `one two default`
console.log(
  await app('/api/first').then(async res => await res.text()),
  await app('/api/anyValues').then(async res => await res.text()),
  await app('/randomValue').then(async res => await res.text()),
)

  
