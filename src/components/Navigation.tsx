"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
	{ name: "Work", href: "#work", id: "work" },
	{ name: "About", href: "#about", id: "about" },
	{ name: "Skills", href: "#skills", id: "skills" },
	{ name: "Experience", href: "#experience", id: "experience" },
	{ name: "Contact", href: "#contact", id: "contact" },
];

export default function Navigation() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("home");

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 24);
		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const sections = ["home", ...navItems.map((item) => item.id)]
			.map((id) => document.getElementById(id))
			.filter((section): section is HTMLElement => Boolean(section));
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
				if (visible[0]) setActiveSection(visible[0].target.id);
			},
			{ rootMargin: "-18% 0px -60% 0px", threshold: [0, 0.1, 0.4] },
		);
		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsMobileMenuOpen(false);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isMobileMenuOpen]);

	return (
		<header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
			<div className="shell site-header__inner">
				<a
					href="#home"
					className="brand"
					aria-label="Ian Pekünsal — back to top"
					onClick={() => setIsMobileMenuOpen(false)}
				>
					<span className="brand__mark" aria-hidden="true">P/</span>
					<span>pknsl</span>
				</a>

				<nav className="desktop-nav" aria-label="Primary navigation">
					{navItems.map((item) => (
						<a
							key={item.name}
							href={item.href}
							className={activeSection === item.id ? "is-active" : ""}
							aria-current={activeSection === item.id ? "location" : undefined}
						>
							{item.name}
						</a>
					))}
				</nav>

				<div className="site-header__actions">
					<ThemeToggle />
					<button
						type="button"
						className="menu-toggle"
						onClick={() => setIsMobileMenuOpen((open) => !open)}
						aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
						aria-expanded={isMobileMenuOpen}
						aria-controls="mobile-navigation"
					>
						<span className={isMobileMenuOpen ? "is-open" : ""} aria-hidden="true" />
					</button>
				</div>
			</div>

			<nav
				id="mobile-navigation"
				className={`mobile-nav${isMobileMenuOpen ? " is-open" : ""}`}
				aria-label="Mobile navigation"
				aria-hidden={!isMobileMenuOpen}
			>
				<div className="shell mobile-nav__inner">
					{navItems.map((item, index) => (
						<a
							key={item.name}
							href={item.href}
							onClick={() => setIsMobileMenuOpen(false)}
							tabIndex={isMobileMenuOpen ? 0 : -1}
						>
							<span>0{index + 1}</span>
							{item.name}
						</a>
					))}
					<p>Toronto, Canada · Available online</p>
				</div>
			</nav>
		</header>
	);
}
