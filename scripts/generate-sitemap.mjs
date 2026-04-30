#!/usr/bin/env node
// Generates public/sitemap.xml from app/ pages + content/projects/*.mdx.
// Run before each build: `node scripts/generate-sitemap.mjs`.
// Wired into the `prebuild` npm script so it stays current.

import fs from "node:fs";
import path from "node:path";

const BASE = "https://deveric.io";
const ROOT = path.resolve(import.meta.dirname, "..");

const staticPages = [
  { path: "/",               changefreq: "weekly",  priority: "1.0" },
  { path: "/about",          changefreq: "monthly", priority: "0.9" },
  { path: "/projects",       changefreq: "weekly",  priority: "0.9" },
  { path: "/blog",           changefreq: "weekly",  priority: "0.8" },
  { path: "/journal",        changefreq: "weekly",  priority: "0.7" },
  { path: "/certifications", changefreq: "monthly", priority: "0.7" },
  { path: "/contact",        changefreq: "yearly",  priority: "0.6" },
  { path: "/fun",            changefreq: "monthly", priority: "0.5" },
];

const projectsDir = path.join(ROOT, "content", "projects");
const projectPages = fs.existsSync(projectsDir)
  ? fs
      .readdirSync(projectsDir)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => {
        const slug = f.replace(/\.mdx$/, "");
        const stat = fs.statSync(path.join(projectsDir, f));
        return {
          path: `/projects/${slug}`,
          changefreq: "monthly",
          priority: "0.7",
          lastmod: stat.mtime.toISOString(),
        };
      })
  : [];

const all = [...staticPages, ...projectPages];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    (p) => `  <url>
    <loc>${BASE}${p.path}</loc>${p.lastmod ? `
    <lastmod>${p.lastmod}</lastmod>` : ""}
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const out = path.join(ROOT, "public", "sitemap.xml");
fs.writeFileSync(out, xml);
console.log(`sitemap: wrote ${all.length} URLs → ${out}`);
