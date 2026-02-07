import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import { SnackbarProvider } from "@/context/SnakebarContext";
import { HapticSnackbarProvider } from "@/context/HapticSnackbarContext";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { BusinessCardPanel } from "./components/BusinessCardPanel";
import Script from "next/script";

export const metadata: Metadata = {
	title: {
		default: "Eric Gitangu - https://deveric.io",
		template: "%s | deveric.io",
	},
	description:
		"Software Engineer Architect with 10+ years in Full Stack, ML/AI, DevOps, and Cloud Architecture.",
	manifest: "/manifest.json",
	themeColor: "#3b82f6",
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
		title: "Deveric",
	},
	openGraph: {
		title: "Eric Gitangu - Deveric.",
		description:
			"Software Engineer Architect / Lead with expertise in Full Stack, ML/AI, DevOps, and Cloud Architecture.",
		url: "https://deveric.io/",
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
		apple: "/favicon.png",
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
			<head>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="mobile-web-app-capable" content="yes" />
				<link rel="apple-touch-icon" href="/favicon.png" />
			</head>
			<SnackbarProvider>
				<HapticSnackbarProvider>
					<body
						className={`bg-black ${
							process.env.NODE_ENV === "development" ? "debug-screens" : undefined
						}`}
					>
						<Analytics />
						{children}
						<BusinessCardPanel />
						<PWAInstallPrompt />
						<Script id="sw-register" strategy="afterInteractive">
							{`
								if ('serviceWorker' in navigator) {
									window.addEventListener('load', () => {
										navigator.serviceWorker.register('/sw.js')
											.then((registration) => {
												console.log('SW registered:', registration.scope);
											})
											.catch((error) => {
												console.log('SW registration failed:', error);
											});
									});
								}
							`}
						</Script>
					</body>
				</HapticSnackbarProvider>
			</SnackbarProvider>
		</html>
	);
}
