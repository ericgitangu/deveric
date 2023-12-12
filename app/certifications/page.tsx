"use client";

import React from "react";
import Particles from "../components/particles";
import { Navigation } from "../components/nav";

export default function Certification() {
	const redirect: React.MouseEventHandler<HTMLSpanElement> | undefined =
		(): void => {
			window.location.href = "https://www.linkedin.com/in/ericgitangu/details/certifications/";
		};
	return (
		<div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
			<Navigation />
			<Particles
				className="absolute inset-0 -z-10 animate-fade-in"
				quantity={100}
			/>
			<h1
				className="z-10 text-4xl text-transparent duration-1000 bg-white text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text cursor-pointer"
				onClick={redirect}
			>
				Certifcations <span aria-hidden="true">&rarr;</span>
			</h1>
			<div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			<div className="my-16 text-center animate-fade-in">
				<h2 className="text-sm text-slate-400 ">
					View  my skills verified and endorsed <a href='https://www.linkedin.com/in/ericgitangu/details/skills/' className="text-blue-700"> more certifcations </a>.
				</h2>
			</div>
		</div>
	);
}
