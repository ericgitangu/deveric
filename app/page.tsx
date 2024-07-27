import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import Image from "next/image";

const navigation = [
	{ name: "Projects", href: "/projects" },
	{ name: "Certifications", href: "/certifications" },
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
				deveric{" "}
				<span aria-hidden="true">
					<Image
						style={{ borderRadius: "50%", marginTop: "-1rem" }}
						src="/favicon.png"
						width={75}
						height={75}
						alt={"Eric Gitangus photo"}
					/>
				</span>
			</h1>

			<div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			<div className="my-16 mx-8 text-center animate-fade-in">
				<h2 className="text-sm text-slate-400 ">
					I'm Eric Gitangu<b>(Deveric)</b>, a code-blooded Experienced
					engineering leader skilled in architecting scalable systems, driving
					technical strategy, and building high-performing teams and solutions..
					<br />
					Currently working as a Director of Engineering at
					<Link href={"https://vishnusystems.life"} className="text-blue-600">
						{" Vishnu Systems, Inc. "}
					</Link>{" "}
					As the owner of this vertical market product suite, I'm be responsible
					for driving the market research, requirements gathering, engineering
					coordination, partnering with interdisciplinary teams. My goal is to
					initially understand the customers and understand the cybersecurity
					industry vertical for health delivery organizations, medical device
					manufacturers and innovation centers’ requirements, identify
					opportunities for new products and features for existing and new
					customers. I oversee our product from the beginning of its lifecycle
					to its end. This means I set the vision and as an engineer participate
					in the product for internal and external execution, direct any
					updates, and make sure the product is filling customer needs until the
					product is retired.
				</h2>
			</div>
		</div>
	);
}
