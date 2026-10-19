import { pageMetadata } from "@/lib/seo";
import {
	aboutPageSchema,
	breadcrumbSchema,
	jsonLdScript,
} from "@/lib/structured-data";

// Server layout so this route (a client page) can export its own metadata —
// title, description and, critically, a canonical that overrides the root "/".
export const metadata = pageMetadata({
	title: "About",
	description:
		"About Eric Gitangu — software engineering lead and architect based in Nairobi. Background, experience, and core skills across full stack, ML/AI, DevOps and cloud architecture.",
	path: "/about",
});

export default function AboutLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: jsonLdScript([
						aboutPageSchema(),
						breadcrumbSchema([
							{ name: "Home", href: "/" },
							{ name: "About", href: "/about" },
						]),
					]),
				}}
			/>
			{children}
		</>
	);
}
