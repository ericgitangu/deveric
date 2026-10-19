import { ImageResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

// Self-hosted 1200x630 share card. Replaces the LinkedIn CDN URL, which
// expires, is 800x800 (declared as 1200x630) and is not fetchable by
// WhatsApp's scraper. No dynamic inputs → prerendered to a static PNG at build.
export const alt = "Eric Gitangu — Software Engineering Lead & Architect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
	const photo = fs.readFileSync(
		path.join(process.cwd(), "public", "ericgitangu.jpeg"),
	);
	const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					padding: "0 80px",
					background: "linear-gradient(135deg, #09090b 0%, #18181b 55%, #1e3a8a 100%)",
					color: "#fafafa",
					fontFamily: "sans-serif",
				}}
			>
				<img
					src={photoSrc}
					width={300}
					height={300}
					style={{ borderRadius: 150, border: "6px solid #3b82f6" }}
				/>
				<div style={{ display: "flex", flexDirection: "column", marginLeft: 64 }}>
					<div style={{ fontSize: 76, fontWeight: 700 }}>Eric Gitangu</div>
					<div style={{ fontSize: 36, color: "#93c5fd", marginTop: 12 }}>
						Software Engineering Lead & Architect
					</div>
					<div style={{ fontSize: 28, color: "#a1a1aa", marginTop: 28 }}>
						Full Stack · ML/AI · DevOps · Cloud — Nairobi, Kenya
					</div>
					<div style={{ fontSize: 26, color: "#71717a", marginTop: 36 }}>
						developer.ericgitangu.com
					</div>
				</div>
			</div>
		),
		size,
	);
}
