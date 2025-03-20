"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { Main } from "@/types";

interface HeroProps {
	data: Main;
}

export default function Hero({ data }: HeroProps) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<section id="home" className="relative h-screen w-full flex items-center">
			{/* Animated background */}
			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1.5 }}
				/>
				<div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_250px,rgba(120,119,198,0.3),transparent)]" />
			</div>

			<div className="container mx-auto px-4 z-10">
				<div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
					<motion.div
						className="text-center md:text-left md:w-1/2"
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4 leading-relaxed pb-2">
							{data.name}
						</h1>
						<h2 className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6">
							{data.description}
						</h2>
						<div className="flex justify-center md:justify-start space-x-4">
							{data.social.map((social, index) => (
								<motion.a
									key={index}
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 hover:bg-primary hover:text-white transition-all duration-300 dark:bg-gray-800"
									whileHover={{ y: -5, scale: 1.1 }}
									aria-label={social.name}
								>
									<i className={social.className}></i>
								</motion.a>
							))}
						</div>
					</motion.div>

					<motion.div
						className="relative w-64 h-64 md:w-96 md:h-96"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
					>
						<div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary blur-lg opacity-50 animate-pulse" />
						<div className="relative overflow-hidden rounded-full h-full w-full border-4 border-white dark:border-gray-800">
							<Image
								src={`/images/${data.image}`}
								alt={data.name}
								fill
								style={{ objectFit: "cover" }}
								priority
							/>
						</div>
					</motion.div>
				</div>

				<motion.div
					className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.8,
						delay: 1,
						repeat: Infinity,
						repeatType: "reverse",
					}}
				>
					<a
						href="#about"
						className="text-sm text-gray-600 dark:text-gray-400 flex flex-col items-center"
					>
						<span>Scroll Down</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 mt-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 14l-7 7m0 0l-7-7m7 7V3"
							/>
						</svg>
					</a>
				</motion.div>
			</div>
		</section>
	);
}
