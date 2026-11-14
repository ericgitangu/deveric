import { allPosts } from "contentlayer/generated";

// Published posts, newest first. Single source for the index, post pages,
// RSS feed and sitemap so they never disagree.
export const publishedPosts = allPosts
	.filter((p) => p.published)
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function formatDate(date: string): string {
	return new Intl.DateTimeFormat("en-US", {
		dateStyle: "medium",
		timeZone: "UTC",
	}).format(new Date(date));
}
