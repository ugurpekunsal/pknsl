"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navItems = [
		{ name: "Home", href: "#home" },
		{ name: "About", href: "#about" },
		{ name: "Resume", href: "#resume" },
		{ name: "Portfolio", href: "#portfolio" },
		{ name: "Contact", href: "#contact" },
	];

	return (
		<>
			<motion.nav
				className={`fixed top-0 left-0 right-0 z-40 px-4 py-3 transition-all duration-300 ${
					isScrolled
						? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md"
						: "bg-transparent"
				}`}
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<div className="container mx-auto flex justify-between items-center">
					<Link
						href="#home"
						className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
					>
						Ian Pekünsal
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-6">
						{navItems.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300"
							>
								{item.name}
							</Link>
						))}
						<ThemeToggle />
					</div>

					{/* Mobile Navigation */}
					<div className="flex items-center md:hidden space-x-2">
						<ThemeToggle />
						<button
							className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							aria-label="Toggle menu"
						>
							{isMobileMenuOpen ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>
			</motion.nav>

			{/* Mobile Navigation Menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						className="fixed inset-0 z-30 bg-white/95 dark:bg-gray-900/95 pt-20 px-4"
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -50 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex flex-col space-y-4">
							{navItems.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className="text-lg py-3 border-b border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{item.name}
								</Link>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
