import Link from "next/link";
import React from "react";
import Particles from "../components/particles";
import { Navigation } from "../components/nav";

export default function About() {
	return (
		<div className="flex flex-col items-center justify-center w-screen h-screen  bg-gradient-to-tl from-black via-zinc-600/20 to-black">
			<Navigation />
			<Particles
				className="absolute inset-0 -z-10 animate-fade-in"
				quantity={500}
			/>
			<div className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
				About
			</div>

			<div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			<div className="text-center animate-fade-in">
				<p style={{ margin: "1.5em" }} />
				<div className="mx-4 text-xs text-slate-400">
					The name's <b>Eric Gitangu</b> but it just easier to call me{" "}
					<b>Eric</b> or <b>Deveric</b> online. I'm currently the Director of
					Engineering at
					<Link href={"https://vishnusystems.life"} className="text-blue-600">
						{" Vishnu Systems, Inc. "}
					</Link>{" "}
					with a little over 10 years of experience as a Senior FullStack, DApp,
					ML, Data, and AI Engineer using various stacks; Rust, Golang, Java,
					Kotlin, JavaScript Frameworks, Elixir + Phoenix, with various
					interests and skils not limited to Distributed Development, Data
					Science, Artificial Inteligence & Machine Learning with a focus on
					CNN, RAGs, CNNs and LLMs using PyTorch & TensorFlow.
				</div>
				<p style={{ margin: "1.5em" }} />
				<div className="mx-8 text-xs text-slate-400">
					I'm passionate about many creative pursuits, including tech for good,
					demystifying the elusive world of tech in a relatable way and not to
					mention an enthusiast for ethical software practices. This combination
					of interests is what ultimately led me to my passion for contributing
					and joining various developer communities on Slack and Discord. I love
					building projects from scratch. From the ground up from a single
					initial init commit to a full blown project. Outside of development, I
					participate actively on various programming platforms, LeetCode,
					TopCoder, Hackerrank & CodingGames but I wouldn't mind taking on
					activities that are completely non tech related and to that end, I am
					a sponge for things that spark interest, quirky fun facts and DIY
					projects.
				</div>
			</div>
		</div>
	);
}
