import { ImageResponse } from "next/server";
import { allProjects } from "contentlayer/generated";

// Per-project share card (WhatsApp/LinkedIn/X/Slack previews). Defining it in
// this segment is also what attaches og:image to project pages — the root
// card was not inherited once generateMetadata overrode openGraph.
export const alt = "Project by Eric Gitangu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
	return allProjects.filter((p) => p.published).map((p) => ({ slug: p.slug }));
}

export default function ProjectOpengraphImage({
	params,
}: { params: { slug: string } }) {
	const project = allProjects.find((p) => p.slug === params.slug);
	const title = project?.title ?? "Projects";
	const description = project?.description ?? "";

	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: "72px 80px",
					background: "linear-gradient(135deg, #09090b 0%, #18181b 55%, #1e3a8a 100%)",
					color: "#fafafa",
					fontFamily: "sans-serif",
				}}
			>
				<div style={{ fontSize: 28, color: "#93c5fd" }}>Project</div>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
						{title}
					</div>
					<div
						style={{
							fontSize: 28,
							color: "#a1a1aa",
							marginTop: 24,
							lineHeight: 1.35,
							// Satori has no line-clamp; cap length instead.
						}}
					>
						{description.length > 180
							? `${description.slice(0, 177)}…`
							: description}
					</div>
				</div>
				<div style={{ fontSize: 26, color: "#71717a" }}>
					Eric Gitangu · developer.ericgitangu.com
				</div>
			</div>
		),
		size,
	);
}
