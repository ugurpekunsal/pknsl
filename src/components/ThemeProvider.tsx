"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";
type ActiveTheme = "dark" | "light";

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	enableSystem?: boolean;
};

type ThemeProviderState = {
	theme: Theme;
	activeTheme: ActiveTheme; // The actual applied theme (light or dark)
	setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
	undefined
);

export function ThemeProvider({
	children,
	defaultTheme = "system",
	enableSystem = true,
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(defaultTheme);
	const [activeTheme, setActiveTheme] = useState<ActiveTheme>("dark"); // Default until hydrated

	// Update the active theme when the theme changes or on initial load
	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove("light", "dark");

		let newActiveTheme: ActiveTheme = theme as ActiveTheme;

		if (theme === "system" && enableSystem) {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
				.matches
				? "dark"
				: "light";
			root.classList.add(systemTheme);
			newActiveTheme = systemTheme;
		} else {
			root.classList.add(theme);
			newActiveTheme = theme as ActiveTheme;
		}

		setActiveTheme(newActiveTheme);
	}, [theme, enableSystem]);

	// Listen for system preference changes
	useEffect(() => {
		if (!enableSystem || theme !== "system") return;

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const updateSystemTheme = (e: MediaQueryListEvent) => {
			const root = window.document.documentElement;
			const systemTheme = e.matches ? "dark" : "light";

			root.classList.remove("light", "dark");
			root.classList.add(systemTheme);
			setActiveTheme(systemTheme);
		};

		mediaQuery.addEventListener("change", updateSystemTheme);
		return () => mediaQuery.removeEventListener("change", updateSystemTheme);
	}, [enableSystem, theme]);

	const value = {
		theme,
		activeTheme,
		setTheme: (theme: Theme) => setTheme(theme),
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
