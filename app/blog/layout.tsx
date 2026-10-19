import { pageMetadata } from "@/lib/seo";
import {
	breadcrumbSchema,
	jsonLdScript,
} from "@/lib/structured-data";

// Server layout so this route (a client page) can export its own metadata —
// title, description and, critically, a canonical that overrides the root "/".
export const metadata = pageMetadata({
	title: "Blog",
	description:
		"Technical writing by Eric Gitangu on AI/ML, systems architecture, software engineering and cybersecurity.",
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
