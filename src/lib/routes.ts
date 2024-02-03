export const routes: { href?: string, name: string, categoryId: number }[] = [
    { href: "/framework/init", name: "Quick start", categoryId: 1 },
    { href: "/framework/routing", name: "Routing", categoryId: 1 },
    { href: '/framework/wrap', name: 'Wrap', categoryId: 1 },
    { href: '/framework/morpishim', name: 'Morpishim', categoryId: 1 },
    {  name: 'Testing', categoryId: 1 },
    { href: '/framework/plugins', name: 'Plugins', categoryId: 1 },
    { href:'https://github.com/mimiMonads/bunSQLVixeny', name: "SQLBun", categoryId: 2 },
    { href:'https://github.com/mimiMonads/vixenyPluginImplementation', name: "Plugins", categoryId: 2 },
    // { name: 'Encode', categoryId: 3 },
    // { name: 'Files', categoryId: 3 },
    // { name: 'JWT', categoryId: 3 },
    // { name: 'Runtime', categoryId: 3 },
];

export const categories = [
    { id: 1, name: "Introduction" },
    //{ id: 3, name: "Components" },
    { id: 2, name: "Examples" },
]

