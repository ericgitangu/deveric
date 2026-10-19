import { pageMetadata } from "@/lib/seo";
import {
	breadcrumbSchema,
	jsonLdScript,
} from "@/lib/structured-data";

// Server layout so this route (a client page) can export its own metadata —
// title, description and, critically, a canonical that overrides the root "/".
export const metadata = pageMetadata({
	title: "Journal",
	description:
		"Engineering journal by Eric Gitangu — notes, lessons learned and work in progress.",
	path: "/journal",
});

export default function JournalLayout({
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
							{ name: "Journal", href: "/journal" },
						]),
					]),
				}}
			/>
			{children}
		</>
	);
}
