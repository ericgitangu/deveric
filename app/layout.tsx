import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import { SnackbarProvider } from "@/context/SnakebarContext";
import { HapticSnackbarProvider } from "@/context/HapticSnackbarContext";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { BusinessCardPanel } from "./components/BusinessCardPanel";
import Script from "next/script";
import {
	personSchema,
	websiteSchema,
	profilePageSchema,
	jsonLdScript,
} from "./lib/structured-data";
import { SITE_NAME, SITE_URL, TWITTER_HANDLE } from "./lib/seo";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: "Eric Gitangu — Software Engineering Lead & Architect",
		template: "%s · Eric Gitangu",
	},
	description:
		"Eric Gitangu (Deveric) — Nairobi-based software engineering lead and architect: full stack, ML/AI, DevOps and cloud. Fintech and distributed systems projects.",
	keywords: [
		"Eric Gitangu",
		"Deveric",
		"software engineer Nairobi",
		"software architect Kenya",
		"engineering lead",
		"full stack developer",
		"fintech engineer",
		"cloud architecture",
		"Rust",
		"TypeScript",
		"Go",
		"Python",
	],
	// Canonical for "/" only. The home page is a client component and can't
	// export metadata, so it lives here — but children INHERIT it, so every
	// route MUST override via pageMetadata() (app/lib/seo.ts), otherwise Google
	// treats that route as a duplicate of the home page.
	alternates: { canonical: "/" },
	authors: [{ name: "Eric Gitangu", url: SITE_URL }],
	creator: "Eric Gitangu",
	publisher: "Eric Gitangu",
	applicationName: "Eric Gitangu — Portfolio",
	category: "technology",
	manifest: "/manifest.json",
	themeColor: "#3b82f6",
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
		title: "Deveric",
	},
	openGraph: {
		title: "Eric Gitangu — Software Engineering Lead & Architect",
		description:
			"Software engineering lead / architect — full stack, ML/AI, DevOps and cloud architecture. Projects, writing and certifications.",
		url: "/",
		siteName: SITE_NAME,
		locale: "en_US",
		type: "profile",
		firstName: "Eric",
		lastName: "Gitangu",
		username: "ericgitangu",
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
		card: "summary_large_image",
		title: "Eric Gitangu — Software Engineering Lead & Architect",
		site: TWITTER_HANDLE,
		creator: TWITTER_HANDLE,
	},
	// Search Console / Bing Webmaster ownership tokens, supplied via env so
	// they are not hard-coded. Unset → tag omitted.
	verification: {
		google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
		other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
			? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
			: undefined,
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
				{/* JSON-LD: Person + WebSite + ProfilePage so Google emits the
				    knowledge-panel-style person card + sitelinks search box for
				    "Eric Gitangu" queries. */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: jsonLdScript([
							personSchema(),
							websiteSchema(),
							profilePageSchema(),
						]),
					}}
				/>
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
