// JSON-LD helpers for deveric.io — Person, ProfilePage, WebSite, Breadcrumb,
// CreativeWork. Each page injects the schemas relevant to its content type so
// Google can render rich-result entries (sitelinks, breadcrumbs, person card).

const PERSON = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Eric Gitangu",
  alternateName: ["Deveric", "ericgitangu"],
  jobTitle: "Software Engineer Architect",
  description:
    "Software Engineer Architect with 10+ years across Full Stack, ML/AI, DevOps, and Cloud Architecture. Polyglot — Python, Java, Rust, TypeScript, Go, C# — with production experience across fintech, healthcare, energy access, and government-scale infrastructure.",
  url: "https://deveric.io",
  image: "https://deveric.io/favicon.png",
  email: "deveric@unicorns.run",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  sameAs: [
    "https://github.com/ericgitangu",
    "https://linkedin.com/in/ericgitangu",
    "https://resume.ericgitangu.com",
    "https://developer.ericgitangu.com",
  ],
  knowsLanguage: ["en", "sw"],
  nationality: { "@type": "Country", name: "Kenya" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Massachusetts Lowell",
    sameAs: "https://www.uml.edu",
  },
  worksFor: {
    "@type": "Organization",
    name: "Ignite Energy Access (formerly ENGIE Energy Access)",
  },
} as const;

export function personSchema() {
  return PERSON;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "deveric.io — Eric Gitangu",
    alternateName: "Eric Gitangu Portfolio",
    url: "https://deveric.io",
    description:
      "Personal site of Eric Gitangu — projects, blog, journal, certifications.",
    inLanguage: "en-US",
    author: PERSON,
    potentialAction: {
      "@type": "SearchAction",
      target: "https://deveric.io/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2023-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    mainEntity: PERSON,
  };
}

export function breadcrumbSchema(
  trail: { name: string; href: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `https://deveric.io${t.href}`,
    })),
  };
}

export function projectListSchema(
  projects: { slug: string; title: string; description: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects — Eric Gitangu",
    url: "https://deveric.io/projects",
    description:
      "Production-ready public projects across Rust, Go, TypeScript, Python, .NET, and Java — fintech, AI/ML, distributed systems, and developer tooling.",
    author: PERSON,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://deveric.io/projects/${p.slug}`,
        name: p.title,
        description: p.description,
      })),
    },
  };
}

export function projectSchema(p: {
  slug: string;
  title: string;
  description: string;
  date?: string;
  technologies?: string[];
  repository?: string;
  demo?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: p.title,
    description: p.description,
    url: `https://deveric.io/projects/${p.slug}`,
    codeRepository: p.repository,
    sameAs: p.demo,
    author: PERSON,
    creator: PERSON,
    dateCreated: p.date,
    programmingLanguage: p.technologies,
    isPartOf: {
      "@type": "WebSite",
      name: "deveric.io",
      url: "https://deveric.io",
    },
  };
}

export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Eric Gitangu",
    url: "https://deveric.io/about",
    mainEntity: PERSON,
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Eric Gitangu",
    url: "https://deveric.io/contact",
    mainEntity: PERSON,
  };
}

// Convenience: drop a script tag with one or more schemas inline.
export function jsonLdScript(schemas: object | object[]): string {
  return JSON.stringify(Array.isArray(schemas) ? schemas : [schemas]);
}
