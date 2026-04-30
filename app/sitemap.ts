import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import fs from "node:fs";
import path from "node:path";

// Render at request time so URLs match whichever host served the sitemap
// (deveric.io and developer.ericgitangu.com both point at this app — Google
// rejects sitemap entries on a different host than the sitemap file).
export const dynamic = "force-dynamic";

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

function resolveBase(): string {
	const h = headers();
	const host = h.get("x-forwarded-host") ?? h.get("host") ?? "deveric.io";
	const proto = h.get("x-forwarded-proto") ?? "https";
	return `${proto}://${host}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
	const base = resolveBase();
	const projectsDir = path.join(process.cwd(), "content", "projects");
	const projectEntries: MetadataRoute.Sitemap = fs.existsSync(projectsDir)
		? fs
				.readdirSync(projectsDir)
				.filter((f) => f.endsWith(".mdx"))
				.map((f) => {
					const slug = f.replace(/\.mdx$/, "");
					const stat = fs.statSync(path.join(projectsDir, f));
					return {
						url: `${base}/projects/${slug}`,
						lastModified: stat.mtime,
						changeFrequency: "monthly" as const,
						priority: 0.7,
					};
				})
		: [];

	return [
		...staticPages.map((p) => ({
			url: `${base}${p.path}`,
			lastModified: new Date(),
			changeFrequency: p.changeFrequency,
			priority: p.priority,
		})),
		...projectEntries,
	];
}
