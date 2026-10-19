import { pageMetadata } from "@/lib/seo";
import {
	breadcrumbSchema,
	contactPageSchema,
	jsonLdScript,
} from "@/lib/structured-data";

// Server layout so this route (a client page) can export its own metadata —
// title, description and, critically, a canonical that overrides the root "/".
export const metadata = pageMetadata({
	title: "Contact",
	description:
		"Get in touch with Eric Gitangu — email, LinkedIn, GitHub and X/Twitter.",
	path: "/contact",
});

export default function ContactLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: jsonLdScript([
						contactPageSchema(),
						breadcrumbSchema([
							{ name: "Home", href: "/" },
							{ name: "Contact", href: "/contact" },
						]),
					]),
				}}
			/>
			{children}
		</>
	);
}
