import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("http://localhost:3000"),
	title: {
		default: "Next.js SEO Masterclass",
		template: "%s | Next.js SEO Masterclass",
	},
	description:
		"A comprehensive guide and demo of SEO optimization techniques in Next.js 14+, including SSR, SSG, Semantic HTML, and JSON-LD.",
	keywords: [
		"Next.js",
		"SEO",
		"SSR",
		"SSG",
		"Semantic HTML",
		"Web Development",
		"JavaScript",
		"React",
	],
	authors: [{ name: "Your Name", url: "https://yourwebsite.com" }],
	creator: "Your Name",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "http://localhost:3000",
		title: "Next.js SEO Masterclass",
		description:
			"Learn how to implement perfect SEO in Next.js with SSR, SSG, and Semantic HTML.",
		siteName: "Next.js SEO Masterclass",
		images: [
			{
				url: "/opengraph-image.png",
				width: 1200,
				height: 630,
				alt: "Next.js SEO Masterclass",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Next.js SEO Masterclass",
		description:
			"Learn how to implement perfect SEO in Next.js with SSR, SSG, and Semantic HTML.",
		images: ["/opengraph-image.png"],
		creator: "@yourhandle",
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
};

export const viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
		</html>
	);
}
