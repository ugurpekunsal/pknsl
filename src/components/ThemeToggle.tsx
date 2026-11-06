"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
	const { activeTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const nextTheme = activeTheme === "dark" ? "light" : "dark";

	return (
		<button
			type="button"
			className="theme-toggle"
			onClick={() => setTheme(nextTheme)}
			aria-label={mounted ? `Switch to ${nextTheme} theme` : "Toggle theme"}
			title={mounted ? `Switch to ${nextTheme} theme` : "Toggle theme"}
		>
			{mounted && activeTheme === "dark" ? (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
					<circle cx="12" cy="12" r="3.5" />
					<path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
				</svg>
			) : (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
					<path d="M20.3 15.2A8.5 8.5 0 0 1 8.8 3.7 8.5 8.5 0 1 0 20.3 15.2Z" />
				</svg>
			)}
		</button>
	);
}
