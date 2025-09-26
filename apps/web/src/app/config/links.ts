type Link = { label: string; to: string };

export const publicNavLinks: Link[] = [
  { label: "Courses", to: "/courses" },
  { label: "Pricing", to: "/pricing" },
  { label: "About", to: "/about" }
];

export const protectedNavLinks: Link[] = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Pricing", to: "/pricing" },
  { label: "About", to: "/about" }
];
