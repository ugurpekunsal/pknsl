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
	activeTheme: ActiveTheme;
	setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
	undefined,
);

export function ThemeProvider({
	children,
	defaultTheme = "system",
	enableSystem = true,
}: ThemeProviderProps) {
	const [theme, setThemeState] = useState<Theme>(defaultTheme);
	const [activeTheme, setActiveTheme] = useState<ActiveTheme>("light");

	useEffect(() => {
		const savedTheme = window.localStorage.getItem("pknsl-theme") as Theme | null;
		if (savedTheme === "light" || savedTheme === "dark") {
			setThemeState(savedTheme);
		}
	}, []);

	useEffect(() => {
		const root = window.document.documentElement;
		const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
		const nextTheme: ActiveTheme = theme === "system" ? systemTheme : theme;

		root.classList.remove("light", "dark");
		root.classList.add(nextTheme);
		root.style.colorScheme = nextTheme;
		setActiveTheme(nextTheme);
	}, [theme, enableSystem]);

	useEffect(() => {
		if (!enableSystem || theme !== "system") return;

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const updateSystemTheme = (event: MediaQueryListEvent) => {
			const systemTheme = event.matches ? "dark" : "light";
			document.documentElement.classList.remove("light", "dark");
			document.documentElement.classList.add(systemTheme);
			document.documentElement.style.colorScheme = systemTheme;
			setActiveTheme(systemTheme);
		};

		mediaQuery.addEventListener("change", updateSystemTheme);
		return () => mediaQuery.removeEventListener("change", updateSystemTheme);
	}, [enableSystem, theme]);

	const setTheme = (nextTheme: Theme) => {
		window.localStorage.setItem("pknsl-theme", nextTheme);
		setThemeState(nextTheme);
	};

	return (
		<ThemeProviderContext.Provider value={{ theme, activeTheme, setTheme }}>
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
