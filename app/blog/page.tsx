import Link from "next/link";
import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import Particles from "../components/particles";
import { formatDate, publishedPosts } from "./posts";

export default function BlogPage() {
	return (
		<div className="relative min-h-screen pb-16 bg-gradient-to-tl from-black via-zinc-600/20 to-black">
			<Navigation />
			<Particles
				className="absolute inset-0 -z-10 animate-fade-in"
				quantity={100}
			/>
			<main className="relative z-10 flex flex-col items-center px-4 py-16 md:py-24">
				{/* Same hero treatment as About, Journal and Contact. The sr-only
				    prefix keeps the h1 "Engineering blog" for crawlers and screen
				    readers while the visible title stays short enough for the
				    outlined display size. */}
				<h1 className="mb-8 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
					<span className="sr-only">Engineering </span>Blog
				</h1>
				<div className="hidden w-screen h-px mb-12 animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
				<p className="max-w-2xl mb-12 text-center animate-fade-in text-zinc-400">
					Daily notes by Eric Gitangu: one real problem per post, from
					diagnosis to production. Architecture, payment integrations,
					security and compliance, delivery pipelines.
				</p>
				{publishedPosts.length === 0 ? (
					<p className="text-zinc-500">First post ships soon.</p>
				) : (
					<div className="grid w-full max-w-3xl grid-cols-1 gap-4 animate-fade-in">
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
										<h2 className="mt-2 text-xl font-medium duration-150 text-zinc-200 group-hover:text-white font-display">
											{post.title}
										</h2>
										<p className="mt-2 text-sm duration-150 text-zinc-400 group-hover:text-zinc-200">
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
			</main>
		</div>
	);
}
