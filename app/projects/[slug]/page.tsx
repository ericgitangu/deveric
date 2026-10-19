import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { redis } from "@/lib/redis";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import {
	breadcrumbSchema,
	jsonLdScript,
	projectSchema,
} from "@/lib/structured-data";

export const revalidate = 60;

type Props = {
	params: {
		slug: string;
	};
};

export async function generateStaticParams(): Promise<Props["params"][]> {
	return allProjects
		.filter((p) => p.published)
		.map((p) => ({
			slug: p.slug,
		}));
}

export function generateMetadata({ params }: Props): Metadata {
	const project = allProjects.find((p) => p.slug === params.slug);
	if (!project) {
		return {};
	}
	const base = pageMetadata({
		title: project.title,
		description: project.description,
		path: `/projects/${project.slug}`,
	});
	return {
		...base,
		openGraph: {
			...base.openGraph,
			type: "article",
			...(project.date ? { publishedTime: project.date } : {}),
			authors: ["Eric Gitangu"],
		},
	};
}

export default async function PostPage({ params }: Props) {
	const slug = params?.slug;
	const project = allProjects.find((project) => project.slug === slug);

	if (!project) {
		notFound();
	}

	const views =
		(await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;

	return (
		<div className="bg-zinc-50 min-h-screen">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: jsonLdScript([
						projectSchema({
							slug: project.slug,
							title: project.title,
							description: project.description,
							date: project.date,
							repository: project.repository
								? `https://github.com/${project.repository}`
								: undefined,
							demo: project.url,
						}),
						breadcrumbSchema([
							{ name: "Home", href: "/" },
							{ name: "Projects", href: "/projects" },
							{ name: project.title, href: `/projects/${project.slug}` },
						]),
					]),
				}}
			/>
			<Header project={project} views={views} />
			<ReportView slug={project.slug} />

			<article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
				<Mdx code={project.body.code} />
			</article>
		</div>
	);
}
