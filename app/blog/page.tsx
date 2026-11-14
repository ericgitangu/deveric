import Link from "next/link";
import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { formatDate, publishedPosts } from "./posts";

export default function BlogPage() {
	return (
		<div className="relative pb-16">
			<Navigation />
			<div className="px-6 pt-16 mx-auto space-y-8 max-w-3xl lg:px-8 md:space-y-12 md:pt-24 lg:pt-32">
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
						Engineering blog
					</h1>
					<p className="mt-4 text-zinc-400">
						Daily notes by Eric Gitangu: one real problem per post, from
						diagnosis to production. Architecture, payment integrations,
						security and compliance, delivery pipelines.
					</p>
				</div>
				<div className="w-full h-px bg-zinc-800" />
				{publishedPosts.length === 0 ? (
					<p className="text-zinc-500">First post ships soon.</p>
				) : (
					<div className="grid grid-cols-1 gap-4">
						{publishedPosts.map((post) => (
							<Card key={post.slug}>
								<Link href={`/blog/${post.slug}`}>
									<article className="p-4 md:p-8">
										<time
											dateTime={new Date(post.date).toISOString()}
											className="text-xs text-zinc-400"
										>
											{formatDate(post.date)}
										</time>
										<h2 className="mt-2 text-xl font-medium text-zinc-200 group-hover:text-white font-display">
											{post.title}
										</h2>
										<p className="mt-2 text-sm text-zinc-400 group-hover:text-zinc-200">
											{post.description}
										</p>
										{post.tags && post.tags.length > 0 ? (
											<p className="mt-3 text-xs text-zinc-500">
												{post.tags.map((t) => `#${t}`).join(" ")}
											</p>
										) : null}
									</article>
								</Link>
							</Card>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
