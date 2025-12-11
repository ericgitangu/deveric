"use client";
// /app/page.tsx

import Link from "next/link";
import React, { useState } from "react";
import Particles from "./components/particles";
import Image from "next/image";
import { Button, Tooltip, Snackbar, Alert } from "@mui/material";

const navigation = [
	{ name: "Projects", href: "/projects" },
	{ name: "Certifications", href: "/certifications" },
	{ name: "About", href: "/about" },
	{ name: "Contact", href: "/contact" },
	{ name: "Journal", href: "/journal" },
	{ name: "Fun", href: "/fun" },
];

export default function Home() {
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState<
		"success" | "error" | "warning" | "info"
	>("info");

	const handleButtonClick = () => {
		const resumeLink =
			"https://drive.google.com/file/d/15RahOYQMSFlZtL2i2kkRW3qHSQSW8K8s/view?usp=sharing";
		const mailtoLink = "mailto:developer.ericgitangu@gmail.com";

		window.open(resumeLink, "_blank", "noopener,noreferrer");

		setSnackbarMessage(
			"Resume requested initiated! Use your preferred Gmail account to request.",
		);
		setSnackbarSeverity("success");
		setSnackbarOpen(true);
	};

	const handleSnackbarClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string,
	) => {
		if (reason === "clickaway") {
			return;
		}
		setSnackbarOpen(false);
	};

	return (
		<div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black relative">
			{/* Navigation Menu */}
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

			{/* Decorative Gradient Lines */}
			<div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

			{/* Particles Background */}
			<Particles
				className="absolute inset-0 -z-10 animate-fade-in"
				quantity={100}
			/>

			{/* Main Heading */}
			<h1 className="flex z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
				deveric{" "}
				<span aria-hidden="true">
					<Image
						style={{ borderRadius: "50%", marginTop: "-1rem" }}
						src="/favicon.png"
						width={75}
						height={75}
						alt="Eric Gitangus photo"
					/>
				</span>
			</h1>

			{/* Another Decorative Gradient Line */}
			<div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

			{/* About Me */}
			<div className="my-16 mx-8 text-center animate-fade-in">
				<h2 className="text-sm text-slate-400 ">
					I'm Eric Gitangu<b>(Deveric)</b>, a code-blooded Experienced
					engineering leader skilled in architecting scalable systems, driving
					technical strategy, and building high-performing teams and solutions..
				</h2>
			</div>
			{/* Resume Request Button */}
			<div className="my-16 mx-8 text-center animate-fade-in">
				<Tooltip title="Download my resume from Google Drive">
					<Button
						variant="contained"
						color="primary"
						onClick={handleButtonClick}
						className="rounded-md uppercase animate-fade-in"
						sx={{
							paddingX: 4,
							paddingY: 1.5,
							fontWeight: "bold",
							backgroundColor: "#3b82f6",
							border: "2px solid #3b82f6",
							"&:hover": {
								backgroundColor: "transparent",
								color: "#3b82f6",
								borderColor: "#3b82f6",
								transform: "scale(1.05)",
							},
							transition: "transform 0.2s, background-color 0.3s, color 0.3s",
						}}
						aria-label="Request my Resume"
					>
						REQUEST MY RESUME
					</Button>
				</Tooltip>
			</div>

			{/* Snackbar for Notifications */}
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={handleSnackbarClose}
					severity={snackbarSeverity}
					sx={{ width: "100%" }}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</div>
	);
}
