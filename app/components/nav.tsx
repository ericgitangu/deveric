"use client";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { HapticLink } from "./HapticLink";

export const Navigation: React.FC = () => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header ref={ref}>
			<div
				className={`my-4 fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-zinc-900/500  border-zinc-400 "
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-2 top-0 mx-auto">
					<div className="flex justify-between gap-2">
						<HapticLink
							href="/certifications"
							className="duration-200 text-zinc-400 hover:text-zinc-100 text-sm"
						>
							Certifications
						</HapticLink>
						<HapticLink
							href="/projects"
							className="duration-200 text-zinc-400 hover:text-zinc-100 text-sm"
						>
							Projects
						</HapticLink>
						<HapticLink
							href="/contact"
							className="duration-200 text-zinc-400 hover:text-zinc-100 text-sm"
						>
							Contact
						</HapticLink>
						<HapticLink
							href="/blog"
							className="duration-200 text-zinc-400 hover:text-zinc-100 text-sm"
						>
							Blog
						</HapticLink>
						<HapticLink
							href="/journal"
							className="duration-200 text-zinc-400 hover:text-zinc-100 text-sm"
						>
							Journal
						</HapticLink>
						<HapticLink
							href="/fun"
							className="duration-200 text-zinc-400 hover:text-zinc-100 text-sm"
						>
							Fun
						</HapticLink>
					</div>

					<HapticLink
						href="/"
						className="duration-200 text-zinc-300 hover:text-zinc-100 text-sm"
					>
						<ArrowLeft className="w-6 h-6 " />
					</HapticLink>
				</div>
			</div>
		</header>
	);
};
