import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import Image from "next/image";

const navigation = [
	{ name: "Projects", href: "/projects" },
	{ name: "About", href: "/about" },
	{ name: "Contact", href: "/contact" },
	{ name: "Blog", href: "/blog" },
];

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
			<nav className="my-16 animate-fade-in">
				<ul className="flex items-center justify-center gap-4">
					{navigation.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="text-sm duration-500 text-slate-400 hover:text-zinc-300"
						>
							{item.name}
						</Link>
					))}

				</ul>
			</nav>
			<div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			<Particles
				className="absolute inset-0 -z-10 animate-fade-in"
				quantity={100}
			/>
			<h1 className="flex z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
				deveric <span aria-hidden="true"><Image style={{borderRadius:"50%",marginTop:"-1rem"}} src="/favicon.png" width={75} height={75} /></span>
			</h1>

			<div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			<div className="my-16 mx-8 text-center animate-fade-in">
				<h2 className="text-sm text-slate-400 ">
					I'm Eric Gitangu<b>(Deveric)</b>, a code-blooded Full Stack Senior Software Decentralized App Developer that never strays from challenges but rather embraces them. I get a thrill from solving challenging problems optimally.
				</h2>
			</div>
		</div>
	);
}
