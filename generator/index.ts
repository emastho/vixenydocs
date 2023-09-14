import matter from "gray-matter"
import fs from "fs/promises"
import { minify } from "html-minifier-terser";

// yes, I know
const dirs = [
    { path: "basics/+page.md", route: "/basics" },
    { path: "data_control/+page.md", route: "/data_control" },
    { path: "data_flow/+page.md", route: "/data_flow" },
    { path: "docs/+page.md", route: "/docs" },
    { path: "docs/testing/+page.md", route: "/docs/testing" },
    { path: "docs/modules/branch/+page.md", route: "/docs/modules/branch" },
    { path: "docs/modules/cookies/+page.md", route: "/docs/modules/cookies" },
    { path: "docs/modules/mutable/+page.md", route: "/docs/modules/mutable" },
    { path: "docs/modules/parameters/+page.md", route: "/docs/modules/parameters" },
    { path: "docs/modules/query/+page.md", route: "/docs/modules/query" },
    { path: "docs/modules/resolve/+page.md", route: "/docs/modules/resolve" },
    { path: "resource/fpBasics/+page.md", route: "/resource/fpBasics" },
]

let meow = dirs.map(async (dir) => {
    const a = await fs.readFile(`../src/routes/${dir.path}`, "utf-8")
    return { content: matter(a).content, route: dir.route }
})

const val = await Promise.all(meow)
const stringified = JSON.stringify(val)
await fs.writeFile("../src/lib/data.json", stringified)
