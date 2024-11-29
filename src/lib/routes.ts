

// I dont want to merge conflicts xd
// Here the new routes

export const categories = [
  { id: 1, name: "Basics" },
  { id: 2, name: "Environment" },
  { id: 3, name: "Library" },
];

export const routes: {
  href: string;
  name: string;
  categoryId: number;
  newTab?: boolean;
}[] = [
  { href: "/basics/quick_start", name: "Introduction", categoryId: 1 },
  { href: "/basics/guides", name: "Guides", categoryId: 1 },
  { href: "/environment/core", name: "Core", categoryId: 2 },
  { href: "/environment/plugins", name: "Plugins", categoryId: 2 },
  { href: "/environment/perspective", name: "Perspective", categoryId: 2 },
  { href: "/environment/create", name: "Create", categoryId: 3 },
  { href: "/library/qa", name: "Q&A", categoryId: 3 },
];
