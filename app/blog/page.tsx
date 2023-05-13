import Link from "next/link";
import React from "react";
import Particles from "../components/particles";
import { Navigation } from "../components/nav";

export default function About() {
	return (
		<div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
            <Navigation />
			<Particles
				className="absolute inset-0 -z-10 animate-fade-in"
				quantity={100}
			/>
			<h1 className="z-10 text-xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
				<Link className="cursor-pointer" href="https://deveric-blog-io.azuresites.net">
                    Blog <span aria-hidden="true">&rarr;</span>
                </Link>
			</h1>
			<div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			<div className="my-16 text-center animate-fade-in">
				<h2 className="text-sm text-slate-400 ">
                    Visit my blog and see what I am up to.
                </h2>
			</div>
		</div>
	);
}
