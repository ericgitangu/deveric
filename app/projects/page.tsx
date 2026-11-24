import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import Particles from "../components/particles";
import { redis } from "@/lib/redis";
import { Eye } from "lucide-react";
import { jsonLdScript, projectListSchema } from "@/lib/structured-data";

export const revalidate = 60;
export default async function ProjectsPage() {
	const views = (
		await redis.mget<number[]>(
			...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":")),
		)
	).reduce((acc, v, i) => {
		acc[allProjects[i].slug] = v ?? 0;
		return acc;
	}, {} as Record<string, number>);

	const byDate = allProjects
		.filter((p) => p.published)
		.sort((a, b) => {
			const aDate = a.date ? new Date(a.date).getTime() : Number.NaN;
			const bDate = b.date ? new Date(b.date).getTime() : Number.NaN;
			if (!Number.isFinite(aDate)) return Number.isFinite(bDate) ? 1 : 0;
			if (!Number.isFinite(bDate)) return -1;
			return bDate - aDate;
		});
	const displayOrder = [
		...byDate.filter((project) => project.featured),
		...byDate.filter((project) => !project.featured),
	];
	const [featured, top2, top3, ...sorted] = displayOrder;
	return (
		<div className="relative min-h-screen pb-16 bg-gradient-to-tl from-black via-zinc-600/20 to-black">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: jsonLdScript(
						projectListSchema(
							displayOrder.map((p) => ({
								slug: p.slug,
								title: p.title,
								description: p.description,
							})),
						),
					),
				}}
			/>
			<Navigation />
			<Particles
				className="absolute inset-0 -z-10 animate-fade-in"
				quantity={100}
			/>
			{/* Same hero treatment as About, Journal, Contact and Blog. */}
			<main className="relative z-10 flex flex-col items-center px-4 pt-16 md:pt-24">
				<h1 className="mb-8 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
					Projects
				</h1>
				<div className="hidden w-screen h-px mb-12 animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
				<p className="max-w-2xl mb-12 text-center animate-fade-in text-zinc-400">
					Welcome to my tinkering workspace. Here you will find a collection of
					my hobby projects some inflight. I am always working on something new,
					so check back often.{" "}
					<Link
						href="https://github.com/ericgitangu/"
						className="duration-150 text-zinc-200 hover:text-white"
					>
						View more of my projects <span aria-hidden="true">&rarr;</span>
					</Link>
				</p>
			</main>
			<div className="relative z-10 px-6 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 animate-fade-in">
				<div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
					<Card>
						<Link href={`/projects/${featured.slug}`}>
							<article className="relative h-full w-full p-4 md:p-8">
								<div className="flex justify-between gap-2 items-center">
									<div className="text-xs text-zinc-100">
										{featured.date ? (
											<time dateTime={new Date(featured.date).toISOString()}>
												{Intl.DateTimeFormat(undefined, {
													dateStyle: "medium",
												}).format(new Date(featured.date))}
											</time>
										) : (
											<span>SOON</span>
										)}
									</div>
									<span className="text-slate-400 text-xs  flex items-center gap-1">
										<Eye className="w-4 h-4" />{" "}
										{Intl.NumberFormat("en-US", { notation: "compact" }).format(
											views[featured.slug] ?? 0,
										)}
									</span>
								</div>

								<h2
									id="featured-post"
									className="mt-4 text-3xl font-bold  text-zinc-100 group-hover:text-white sm:text-4xl font-display"
								>
									{featured.title}
								</h2>
								<p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
									{featured.description}
								</p>
								<div className="absolute bottom-4 md:bottom-8">
									<p className="text-zinc-200 hover:text-zinc-50 hidden lg:block">
										Read more <span aria-hidden="true">&rarr;</span>
									</p>
								</div>
							</article>
						</Link>
					</Card>

					<div className="flex flex-col w-full gap-8  mx-auto border-t border-gray-900/10  lg:mx-0  lg:border-t-0 ">
						{[top2, top3].map((project) => (
							<Card key={project.slug}>
								<Article project={project} views={views[project.slug] ?? 0} />
							</Card>
						))}
					</div>
				</div>
				<div className="hidden w-full h-px md:block bg-zinc-800" />

				<div className="grid  grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
					<div className="grid grid-cols-1 gap-4">
						{sorted
							.filter((_, i) => i % 3 === 0)
							.map((project) => (
								<Card key={project.slug}>
									<Article project={project} views={views[project.slug] ?? 0} />
								</Card>
							))}
					</div>
					<div className="grid grid-cols-1 gap-4">
						{sorted
							.filter((_, i) => i % 3 === 1)
							.map((project) => (
								<Card key={project.slug}>
									<Article project={project} views={views[project.slug] ?? 0} />
								</Card>
							))}
					</div>
					<div className="grid grid-cols-1 gap-4">
						{sorted
							.filter((_, i) => i % 3 === 2)
							.map((project) => (
								<Card key={project.slug}>
									<Article project={project} views={views[project.slug] ?? 0} />
								</Card>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
