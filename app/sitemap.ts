import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

const BASE = "https://deveric.io";

type StaticEntry = {
	path: string;
	changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
	priority: number;
};

const staticPages: StaticEntry[] = [
	{ path: "/", changeFrequency: "weekly", priority: 1.0 },
	{ path: "/about", changeFrequency: "monthly", priority: 0.9 },
	{ path: "/projects", changeFrequency: "weekly", priority: 0.9 },
	{ path: "/blog", changeFrequency: "weekly", priority: 0.8 },
	{ path: "/journal", changeFrequency: "weekly", priority: 0.7 },
	{ path: "/certifications", changeFrequency: "monthly", priority: 0.7 },
	{ path: "/contact", changeFrequency: "yearly", priority: 0.6 },
	{ path: "/fun", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
	const projectsDir = path.join(process.cwd(), "content", "projects");
	const projectEntries: MetadataRoute.Sitemap = fs.existsSync(projectsDir)
		? fs
				.readdirSync(projectsDir)
				.filter((f) => f.endsWith(".mdx"))
				.map((f) => {
					const slug = f.replace(/\.mdx$/, "");
					const stat = fs.statSync(path.join(projectsDir, f));
					return {
						url: `${BASE}/projects/${slug}`,
						lastModified: stat.mtime,
						changeFrequency: "monthly" as const,
						priority: 0.7,
					};
				})
		: [];

	return [
		...staticPages.map((p) => ({
			url: `${BASE}${p.path}`,
			lastModified: new Date(),
			changeFrequency: p.changeFrequency,
			priority: p.priority,
		})),
		...projectEntries,
	];
}
