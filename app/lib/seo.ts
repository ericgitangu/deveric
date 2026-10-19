import type { Metadata } from "next";

export const SITE_URL = "https://developer.ericgitangu.com";
export const SITE_NAME = "Eric Gitangu";
export const TWITTER_HANDLE = "@dev_ericgitangu";

// Per-route metadata. Every route MUST set its own canonical — a canonical on
// the root layout is inherited by all children and tells Google every page is
// a duplicate of "/". Relative paths resolve against metadataBase.
export function pageMetadata({
	title,
	description,
	path,
}: {
	title: string;
	description: string;
	path: string;
}): Metadata {
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
