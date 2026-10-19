import { pageMetadata } from "@/lib/seo";

export const metadata = {
	...pageMetadata({
		title: "Projects",
		description:
			"Production projects by Eric Gitangu across Rust, Go, TypeScript, Python, .NET and Java — fintech and core banking, AI/ML, distributed systems and developer tooling.",
		path: "/projects",
	}),
	// A plain string title here would stop the root "%s · Eric Gitangu"
	// template from reaching /projects/[slug]; re-declare it.
	title: { default: "Projects", template: "%s · Eric Gitangu" },
};

export default function ProjectsLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900 ">
			{children}
		</div>
	);
}
