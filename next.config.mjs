import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		// `appDir: true` was required pre-13.4; it's the default in 13.4+ and
		// removed entirely in 14. Drop it before the next major upgrade.
		mdxRs: true,
	},
	// *.vercel.app aliases of the production deployment (deveric-io.vercel.app,
	// deveric-vert.vercel.app, previews) serve the full site with 200s. Mark
	// every host except the canonical one noindex so they never compete with
	// developer.ericgitangu.com in search results.
	async headers() {
		return [
			{
				source: "/:path*",
				missing: [{ type: "host", value: "developer.ericgitangu.com" }],
				headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
			},
		];
	},
};

export default withContentlayer(nextConfig);
