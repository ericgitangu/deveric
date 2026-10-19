import type { Metadata } from "next";

export const SITE_URL = "https://developer.ericgitangu.com";
export const SITE_NAME = "Eric Gitangu";
export const TWITTER_HANDLE = "@dev_ericgitangu";

// Google truncates snippets around 155-160 chars. Cut on a word boundary so
// long MDX frontmatter descriptions (up to ~400 chars) stay readable in SERPs;
// the full text still renders on the page itself.
export function snippet(text: string, max = 158): string {
	if (text.length <= max) {
		return text;
	}
	const cut = text.slice(0, max - 1);
	return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:—–-]+$/, "")}…`;
}

// Per-route metadata. Every route MUST set its own canonical — a canonical on
// the root layout is inherited by all children and tells Google every page is
// a duplicate of "/". Relative paths resolve against metadataBase.
export function pageMetadata({
	title,
	description: fullDescription,
	path,
}: {
	title: string;
	description: string;
	path: string;
}): Metadata {
	const description = snippet(fullDescription);
	return {
		title,
		description,
		alternates: { canonical: path },
		openGraph: {
			title: `${title} · ${SITE_NAME}`,
			description,
			url: path,
			siteName: SITE_NAME,
			locale: "en_US",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: `${title} · ${SITE_NAME}`,
			description,
			site: TWITTER_HANDLE,
			creator: TWITTER_HANDLE,
		},
	};
}
