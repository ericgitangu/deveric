import { SITE_URL } from "@/lib/seo";
import { publishedPosts } from "../posts";

const escape = (s: string) =>
	s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

// RSS feed for the blog: lets readers subscribe and lets syndication targets
// (dev.to "publish from RSS") pull posts with the canonical URL pointing here.
export function GET() {
	const items = publishedPosts
		.map(
			(p) => `<item>
<title>${escape(p.title)}</title>
<link>${SITE_URL}/blog/${p.slug}</link>
<guid isPermaLink="true">${SITE_URL}/blog/${p.slug}</guid>
<description>${escape(p.description)}</description>
<pubDate>${new Date(p.date).toUTCString()}</pubDate>
<author>deveric@unicorns.run (Eric Gitangu)</author>
${(p.tags ?? []).map((t) => `<category>${escape(t)}</category>`).join("\n")}
</item>`,
		)
		.join("\n");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>Eric Gitangu — Engineering blog</title>
<link>${SITE_URL}/blog</link>
<atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
<description>Daily engineering notes by Eric Gitangu: real problems from diagnosis to production.</description>
<language>en-us</language>
${items}
</channel>
</rss>`;

	return new Response(xml, {
		headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
	});
}
