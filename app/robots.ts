import type { MetadataRoute } from "next";
import { headers } from "next/headers";

// Mirror the host that's serving the file so the Sitemap directive matches —
// Google won't accept a cross-host sitemap reference.
export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
	const h = headers();
	const host = h.get("x-forwarded-host") ?? h.get("host") ?? "deveric.io";
	const proto = h.get("x-forwarded-proto") ?? "https";
	const base = `${proto}://${host}`;

	return {
		rules: [
			{ userAgent: "*", allow: "/", disallow: ["/api/"] },
			{ userAgent: "Googlebot", allow: "/" },
			{ userAgent: "Googlebot-Image", allow: "/" },
			{ userAgent: "Bingbot", allow: "/" },
			{ userAgent: "DuckDuckBot", allow: "/" },
			{ userAgent: "LinkedInBot", allow: "/" },
		],
		sitemap: `${base}/sitemap.xml`,
		host: base,
	};
}
