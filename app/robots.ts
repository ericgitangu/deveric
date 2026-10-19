import type { MetadataRoute } from "next";
import { headers } from "next/headers";

// Mirror the host that's serving the file so the Sitemap directive matches —
// Google won't accept a cross-host sitemap reference.
export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
	const h = headers();
	const host = h.get("x-forwarded-host") ?? h.get("host") ?? "developer.ericgitangu.com";
	const proto = h.get("x-forwarded-proto") ?? "https";
	const base = `${proto}://${host}`;

	return {
		// One "*" group only. A crawler obeys only its most specific matching
		// group, so the old per-bot "Allow: /" groups silently re-opened /api/
		// to Googlebot/Bingbot.
		rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
		sitemap: `${base}/sitemap.xml`,
		host: base,
	};
}
