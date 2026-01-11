"use client";

import React from "react";
import Particles from "../components/particles";
import { Navigation } from "../components/nav";

export default function Blog() {
	const redirectUrl = "https://blog.ericgitangu.com";

	return (
		<div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
			<Navigation />
			<Particles
				className="absolute inset-0 -z-10 animate-fade-in"
				quantity={100}
			/>
			<h1 className="z-10 text-4xl text-transparent duration-1000 bg-white text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
				Blog
			</h1>
			<div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			<div className="my-8 text-center animate-fade-in max-w-2xl px-4">
				<h2 className="text-lg text-slate-300 font-medium mb-2">
					Tech Insights
				</h2>
				<p className="text-sm text-slate-400 mb-4">
					Thoughts on AI, systems architecture, software engineering, and cybersecurity.
					Built with Django and deployed on Fly.io.
				</p>
				<ul className="text-xs text-slate-500 text-left space-y-2 mb-8">
					<li className="flex items-start gap-2">
						<span className="text-blue-400">&#x2022;</span>
						AI/ML insights and implementation patterns
					</li>
					<li className="flex items-start gap-2">
						<span className="text-green-400">&#x2022;</span>
						Systems design and architecture deep dives
					</li>
					<li className="flex items-start gap-2">
						<span className="text-purple-400">&#x2022;</span>
						Software engineering best practices
					</li>
					<li className="flex items-start gap-2">
						<span className="text-orange-400">&#x2022;</span>
						Cybersecurity tips and terminal tricks
					</li>
				</ul>
				<a
					href={redirectUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
				>
					Visit Blog
					<span aria-hidden="true" className="text-lg">&rarr;</span>
				</a>
				<p className="mt-4 text-xs text-slate-600">
					blog.ericgitangu.com
				</p>
			</div>
		</div>
	);
}
