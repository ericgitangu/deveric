import { pageMetadata } from "@/lib/seo";
import {
	breadcrumbSchema,
	jsonLdScript,
} from "@/lib/structured-data";

// Server layout so this route (a client page) can export its own metadata —
// title, description and, critically, a canonical that overrides the root "/".
export const metadata = pageMetadata({
	title: "Fun",
	description:
		"A playable snake game and side experiments by Eric Gitangu.",
	path: "/fun",
});

export default function FunLayout({
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
							{ name: "Fun", href: "/fun" },
						]),
					]),
				}}
			/>
			{children}
		</>
	);
}
