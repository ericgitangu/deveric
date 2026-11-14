import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Mdx } from "@/components/mdx";
import { pageMetadata } from "@/lib/seo";
import {
	blogPostingSchema,
	breadcrumbSchema,
	jsonLdScript,
} from "@/lib/structured-data";
import { formatDate, publishedPosts } from "../posts";
import "../../projects/[slug]/mdx.css";

type Props = {
	params: {
		slug: string;
	};
};

export function generateStaticParams(): Props["params"][] {
	return publishedPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
	const post = publishedPosts.find((p) => p.slug === params.slug);
	if (!post) {
		return {};
	}
	const base = pageMetadata({
		title: post.title,
		description: post.description,
		path: `/blog/${post.slug}`,
	});
	return {
		...base,
		keywords: post.tags,
		authors: [{ name: "Eric Gitangu", url: "https://developer.ericgitangu.com" }],
		openGraph: {
			...base.openGraph,
			type: "article",
			publishedTime: post.date,
			authors: ["Eric Gitangu"],
			tags: post.tags,
		},
	};
}

export default function BlogPostPage({ params }: Props) {
	const post = publishedPosts.find((p) => p.slug === params.slug);
	if (!post) {
		notFound();
	}

	return (
		<div className="bg-zinc-50 min-h-screen">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: jsonLdScript([
						blogPostingSchema({
							slug: post.slug,
							title: post.title,
							description: post.description,
							date: post.date,
							tags: post.tags,
						}),
						breadcrumbSchema([
							{ name: "Home", href: "/" },
							{ name: "Blog", href: "/blog" },
							{ name: post.title, href: `/blog/${post.slug}` },
						]),
					]),
				}}
			/>
			<header className="bg-gradient-to-tl from-black via-zinc-900 to-black px-6 py-24 sm:py-32">
				<div className="mx-auto max-w-2xl text-center">
					<Link
						href="/blog"
						className="text-sm text-zinc-400 hover:text-zinc-100 duration-200"
					>
						&larr; Blog
					</Link>
					<h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl font-display">
						{post.title}
					</h1>
					<p className="mt-6 text-lg leading-8 text-zinc-300">
						{post.description}
					</p>
					<p className="mt-6 text-sm text-zinc-400">
						By{" "}
						<Link href="/about" className="underline hover:text-zinc-100">
							Eric Gitangu
						</Link>{" "}
						·{" "}
						<time dateTime={new Date(post.date).toISOString()}>
							{formatDate(post.date)}
						</time>
					</p>
				</div>
			</header>
			<article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
				<Mdx code={post.body.code} />
			</article>
		</div>
	);
}
