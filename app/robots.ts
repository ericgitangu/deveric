import type { MetadataRoute } from "next";

// Next App Router conventional robots.txt — served at /robots.txt.
// Replaces the static public/robots.txt now that we're on 13.5.
export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{ userAgent: "*", allow: "/", disallow: ["/api/"] },
			{ userAgent: "Googlebot", allow: "/" },
			{ userAgent: "Googlebot-Image", allow: "/" },
			{ userAgent: "Bingbot", allow: "/" },
			{ userAgent: "DuckDuckBot", allow: "/" },
			{ userAgent: "LinkedInBot", allow: "/" },
		],
		sitemap: "https://deveric.io/sitemap.xml",
		host: "https://deveric.io",
	};
}
