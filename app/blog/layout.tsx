import { pageMetadata } from "@/lib/seo";
import {
	blogListSchema,
	breadcrumbSchema,
	jsonLdScript,
} from "@/lib/structured-data";
import { publishedPosts } from "./posts";

// Server layout so this route (a client page) can export its own metadata —
// title, description and, critically, a canonical that overrides the root "/".
export const metadata = pageMetadata({
	title: "Engineering blog",
	description:
		"Daily engineering notes by Eric Gitangu: real problems from diagnosis to production across architecture, payment integrations, security and delivery pipelines.",
	path: "/blog",
});

export default function BlogLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: jsonLdScript([
						blogListSchema(
							publishedPosts.map((p) => ({
								slug: p.slug,
								title: p.title,
								description: p.description,
							})),
						),
						breadcrumbSchema([
							{ name: "Home", href: "/" },
							{ name: "Blog", href: "/blog" },
						]),
					]),
				}}
			/>
			{children}
		</>
	);
}
