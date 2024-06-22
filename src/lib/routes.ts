export const routes: { href: string; name: string; categoryId: number; newTab?: boolean }[] = [
	{ href: '/framework/init', name: 'Quick start', categoryId: 1 },
	{ href: '/framework/routing', name: 'Routing', categoryId: 1 },
	{ href: '/framework/composing', name: 'Composing', categoryId: 1 },
	{ href: '/library/wrap', name: 'Wrap', categoryId: 2 },
	{ href: '/library/test', name: 'Testing', categoryId: 2 },
];

export const categories = [
	{ id: 1, name: 'Basics' },
	{ id: 2, name: 'Library' },
	{ id: 3, name: "@perspective" },
	{ id: 4, name: "@plugins" },
	{ id: 5, name: "about" },
];
