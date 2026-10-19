import { pageMetadata } from "@/lib/seo";
import {
	breadcrumbSchema,
	jsonLdScript,
} from "@/lib/structured-data";

// Server layout so this route (a client page) can export its own metadata —
// title, description and, critically, a canonical that overrides the root "/".
export const metadata = pageMetadata({
	title: "Certifications",
	description:
		"Professional certifications and courses completed by Eric Gitangu across cloud, AI/ML, security and software engineering.",
	path: "/certifications",
});

export default function CertificationsLayout({
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
							{ name: "Certifications", href: "/certifications" },
						]),
					]),
				}}
			/>
			{children}
		</>
	);
}
