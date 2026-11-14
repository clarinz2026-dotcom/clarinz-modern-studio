export const STUDIO = {
  displayName: "Clarinz",
  fullName: "Clarinz Abrasaldo",
  brand: "THE DEVIGN STUDIO",
  tagline: "BUILD TO PERFORM ONLY.",
  email: "clarinz2026@gmail.com",
  phone: "+639553991034",
  phoneDisplay: "+63 955 399 1034",
  mobile: "+63 955 399 1034",
  contact: {
    email: "clarinz2026@gmail.com",
    name: "Clarinz Abrasaldo",
  },
  portfolio: "https://clar1nz.freebuff.app/",
  github: "https://github.com/clarinz2026-dotcom",
  linkedin: "https://www.linkedin.com/in/clarinz-abrasaldo-28a2a4445",
} as const;

export const mailtoHref = `mailto:${STUDIO.email}`;

export const consultationHref = `${mailtoHref}?subject=${encodeURIComponent(
  "Consultation request — THE DEVIGN STUDIO",
)}`;

export const SOCIAL_LINKS = [
  {
    label: "Portfolio",
    href: STUDIO.portfolio,
    key: "portfolio",
  },
  {
    label: "GitHub",
    href: STUDIO.github,
    key: "github",
  },
  {
    label: "LinkedIn",
    href: STUDIO.linkedin,
    key: "linkedin",
  },
] as const;
