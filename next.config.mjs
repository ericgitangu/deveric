import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		// `appDir: true` was required pre-13.4; it's the default in 13.4+ and
		// removed entirely in 14. Drop it before the next major upgrade.
		mdxRs: true,
	},
};

export default withContentlayer(nextConfig);
