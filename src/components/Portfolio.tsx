"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import type { Portfolio as PortfolioType } from "@/types";

interface PortfolioProps {
	data: PortfolioType;
}

export default function Portfolio({ data }: PortfolioProps) {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const [activeItem, setActiveItem] = useState<number | null>(null);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, scale: 0.9 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: { duration: 0.5 },
		},
	};

	return (
		<section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-900">
			<div className="container mx-auto px-4">
				<motion.h2
					initial={{ opacity: 0, y: -20 }}
					animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
					transition={{ duration: 0.6 }}
					className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
				>
					Portfolio
				</motion.h2>

				<motion.div
					ref={ref}
					variants={containerVariants}
					initial="hidden"
					animate={inView ? "visible" : "hidden"}
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					{data.projects.map((project, index) => (
						<motion.div
							key={index}
							variants={itemVariants}
							whileHover={{ y: -10 }}
							className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
							onMouseEnter={() => setActiveItem(index)}
							onMouseLeave={() => setActiveItem(null)}
						>
							<div className="relative w-full aspect-[4/3] overflow-hidden">
								<Image
									src={`/images/${project.image}`}
									alt={project.title}
									fill
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
									style={{ objectFit: "cover" }}
									className="transition-transform duration-500 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</div>

							<div className="p-4">
								<h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
									{project.title}
								</h3>
								<p className="text-gray-600 dark:text-gray-400 text-sm">
									{project.category}
								</p>
							</div>

							<AnimatePresence>
								{activeItem === index && (
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 20 }}
										transition={{ duration: 0.2 }}
										className="absolute inset-0 flex items-center justify-center bg-black/70"
									>
										<a
											href={project.url}
											target="_blank"
											rel="noopener noreferrer"
											className="px-6 py-3 bg-primary rounded-full text-white font-medium transform hover:scale-105 transition-transform duration-200"
										>
											View Project
										</a>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
