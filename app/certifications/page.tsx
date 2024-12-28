"use client";

import React from "react";
import Particles from "../components/particles";
import { Navigation } from "../components/nav";

export default function Certification() {
	const redirect: React.MouseEventHandler<HTMLSpanElement> | undefined =
		(): void => {
			window.location.href =
				"https://www.linkedin.com/in/ericgitangu/details/certifications/";
		};
	return (
		<div className="flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black px-4 sm:px-6 lg:px-8">
			<Navigation />
			<Particles
				className="absolute inset-0 -z-10 animate-fade-in"
				quantity={100}
			/>
			<h1
				className="z-10 text-3xl sm:text-4xl md:text-6xl lg:text-9xl text-transparent duration-1000 bg-white text-edge-outline animate-title font-display whitespace-nowrap bg-clip-text cursor-pointer text-center"
				onClick={redirect}
			>
				Certifcations <span aria-hidden="true">&rarr;</span>
			</h1>
			<div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			<div className="my-8 sm:my-16 animate-fade-in w-full max-w-4xl mx-auto">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
					<div className="space-y-4">
						<p className="text-zinc-400">1. Backend Specialization from Meta</p>
						<p className="text-zinc-400">2. Database Specialization from Meta</p>
						<p className="text-zinc-400">3. React-Native Specialization from Meta</p>
						<p className="text-zinc-400">4. Android Specialization from Meta</p>
						<p className="text-zinc-400">5. Frontend Specialization from Meta</p>
					</div>
					<div className="space-y-4">
						<p className="text-zinc-400">6. Golang Specialization from UC Irvine</p>
						<p className="text-zinc-400">7. Rust Specialization from Duke University</p>
						<p className="text-zinc-400">8. Immediate Cybersecurity from CodePath</p>
						<p className="text-zinc-400">9. Cross Platform Development from Meta</p>
						<p className="text-zinc-400">10. <a href="https://www.linkedin.com/in/ericgitangu/details/certifications/" className="text-blue-700 hover:text-blue-500 transition-colors">And 70+ more in my LinkedIn Profile</a></p>
					</div>
				</div>
			</div>
			<div className="mt-8 mb-16 text-center animate-fade-in px-4">
				<h2 className="text-sm text-slate-400">
					View my skills verified and endorsed{" "}
					<a
						href='https://www.linkedin.com/in/ericgitangu/details/skills/'
						className="text-blue-700 hover:text-blue-500 transition-colors"
					>
						skilsets
					</a>
					.
				</h2>
			</div>
		</div>
	);
}
