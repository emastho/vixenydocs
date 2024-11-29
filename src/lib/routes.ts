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

// I dont want to merge conflicts xd
// Here the new routes

const categorie = [
  { id: 1, name: "Basics" },
  { id: 2, name: "Environment" },
  { id: 3, name: "Library" },
];

const route: {
  href: string;
  name: string;
  categoryId: number;
  newTab?: boolean;
}[] = [
  { href: "/basics/quick_start", name: "Quick start", categoryId: 1 },
  { href: "/basics/front_end", name: "Front end", categoryId: 1 },
  { href: "/basics/back_end", name: "Back end", categoryId: 1 },
  { href: "/basics/guides", name: "Guides", categoryId: 1 },
  { href: "/environment/core", name: "Core", categoryId: 2 },
  { href: "/environment/plugins", name: "Core", categoryId: 2 },
  { href: "/environment/perspective", name: "Perspective", categoryId: 2 },
  { href: "/environment/create", name: "Create", categoryId: 3 },
  { href: "/library/theory", name: "Theory", categoryId: 3 },
  { href: "/library/qa", name: "Q&A", categoryId: 3 },
];
