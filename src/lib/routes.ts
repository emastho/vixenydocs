export const routes: {
  href: string;
  name: string;
  categoryId: number;
  newTab?: boolean;
}[] = [
  { href: "/framework/init", name: "Quick start", categoryId: 1 },
  { href: "/framework/routing", name: "Routing", categoryId: 1 },
  { href: "/framework/composing", name: "Composing", categoryId: 1 },
  { href: "/framework/extending", name: "Extending", categoryId: 1 },
  { href: "/library/wrap", name: "Wrap", categoryId: 2 },
  { href: "/library/components", name: "Components", categoryId: 2 },
  { href: "/perspective/create-vixeny", name: "Quick start", categoryId: 3 },
  { href: "/plugins/native", name: "Quick start", categoryId: 4 },
  { href: "/about/questions", name: "Q&A", categoryId: 5 },
];

export const categories = [
  { id: 1, name: "Basics" },
  { id: 2, name: "Library" },
  { id: 3, name: "Perspective" },
  { id: 4, name: "Plugins" },
  { id: 5, name: "About" },
];
