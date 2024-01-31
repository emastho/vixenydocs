export const routes: { href?: string, name: string, categoryId: number }[] = [
    { href: "/framework/init", name: "Quick start", categoryId: 1 },
    { href: "/framework/routing", name: "Routing", categoryId: 1 },
    { href: '/framework/wrap', name: 'Wrap', categoryId: 1 },
    { href: '/framework/branch', name: 'Branch', categoryId: 1 },
    { href: '/framework/plugins', name: 'Extending', categoryId: 1 },
    { href: "/framework/mutable", name: "Mutable", categoryId: 1 },
    { href:'https://github.com/mimiMonads/bunSQLVixeny', name: "SQLBun", categoryId: 2 },
    // { name: 'Encode', categoryId: 3 },
    // { name: 'Files', categoryId: 3 },
    // { name: 'JWT', categoryId: 3 },
    // { name: 'Runtime', categoryId: 3 },
];

export const categories = [
    { id: 1, name: "Framework" },
    //{ id: 3, name: "Components" },
    { id: 2, name: "Examples" },
]

