import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
	title: {
		default: "Eric Gitangu - https://deveric.io",
		template: "%s | deveric.io",
	},
	description:
		"Developer, Engineer %26 code-blooded tinkerer - Director of Engineering at Vishnu Systems, Inc.",
	openGraph: {
		title: "Eric Gitangu - Deveric.",
		description:
			"Eric Gitangu, Director of Engineering / Co-Founder at Vishnu Systems, Inc. Primally, a code-blooded software engineer.",
		url: "https://developer.ericgitangu.com/",
		siteName: "Eric Gitangu - deveric.io",
		images: [
			{
				url: "https://media.licdn.com/dms/image/D4D03AQGrFBDkYWUNqA/profile-displayphoto-shrink_800_800/0/1664606973025?e=2147483647&v=beta&t=k0kebZyN6d08jZJ9rQGx33XFWr2xlep8JlAWl6Z47aY",
				width: 1200,
				height: 630,
			},
		],
		locale: "en-US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "dev_ericgitangu",
		card: "summary_large_image",
	},
	icons: {
		shortcut: "/favicon.png",
	},
};
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const calSans = LocalFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
			<body
				className={`bg-black ${
					process.env.NODE_ENV === "development" ? "debug-screens" : undefined
				}`}
			>
				<Analytics />
				{children}
			</body>
		</html>
	);
}
