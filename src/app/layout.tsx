import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const manrope = Manrope({
	subsets: ["latin"],
	variable: "--font-manrope",
	display: "swap",
});

const instrumentSerif = Instrument_Serif({
	subsets: ["latin"],
	weight: "400",
	style: ["normal", "italic"],
	variable: "--font-instrument-serif",
	display: "swap",
});

const plexMono = IBM_Plex_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
	variable: "--font-plex-mono",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://pknsl.com"),
	title: "Ian Pekünsal — Full-Stack Developer",
	description:
		"Toronto-based full-stack developer creating thoughtful digital experiences with React, Next.js, Go, and cloud technologies.",
	alternates: { canonical: "/" },
	openGraph: {
		title: "Ian Pekünsal — Full-Stack Developer",
		description:
			"Front-end sensibility. Back-end depth. Explore Ian's selected work, experience, and technical expertise.",
		url: "https://pknsl.com",
		siteName: "Ian Pekünsal",
		locale: "en_CA",
		type: "website",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#f3f1ea" },
		{ media: "(prefers-color-scheme: dark)", color: "#111713" },
	],
};

const themeScript = `
	try {
		const savedTheme = localStorage.getItem("pknsl-theme");
		const theme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
		document.documentElement.classList.add(theme);
	} catch (_) {
		document.documentElement.classList.add("light");
	}
`;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body
				className={`${manrope.variable} ${instrumentSerif.variable} ${plexMono.variable}`}
			>
				<a className="skip-link" href="#main-content">
					Skip to content
				</a>
				<ThemeProvider defaultTheme="system" enableSystem>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
