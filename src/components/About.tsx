"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import type { Main } from "@/types";

interface AboutProps {
	data: Main;
}

export default function About({ data }: AboutProps) {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 },
		},
	};

	return (
		<section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
			<div ref={ref} className="container mx-auto px-4">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate={inView ? "visible" : "hidden"}
					className="max-w-4xl mx-auto"
				>
					<motion.h2
						variants={itemVariants}
						className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
					>
						About Me
					</motion.h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
						<motion.div variants={itemVariants} className="relative">
							<div className="relative h-80 w-full overflow-hidden rounded-xl">
								<div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 mix-blend-overlay rounded-xl" />
								<Image
									src="/images/about.png"
									alt="About Ian"
									fill
									sizes="(max-width: 768px) 100vw, 50vw"
									style={{ objectFit: "cover" }}
								/>
							</div>
							<div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border-4 border-primary/40 rounded-xl -z-10" />
						</motion.div>

						<motion.div variants={itemVariants}>
							<h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
								Web Developer with Full-Stack Experience
							</h3>
							<p className="text-gray-600 dark:text-gray-400 mb-4">
								{data.bio}
							</p>

							<p className="text-gray-700 dark:text-gray-300 mb-4">
								<span className="font-medium">Certifications:</span> Certified
								ScrumMaster® (CSM), Microsoft Azure Fundamentals
							</p>

							<div className="grid grid-cols-2 gap-4 my-6">
								<div>
									<p className="font-medium text-gray-700 dark:text-gray-300">
										Name:
									</p>
									<p className="text-gray-600 dark:text-gray-400">
										{data.name}
									</p>
								</div>
								<div>
									<p className="font-medium text-gray-700 dark:text-gray-300">
										Email:
									</p>
									<p className="text-gray-600 dark:text-gray-400 break-words">
										{data.email.split(" or ")[0]}
									</p>
								</div>
								<div>
									<p className="font-medium text-gray-700 dark:text-gray-300">
										Phone:
									</p>
									<p className="text-gray-600 dark:text-gray-400">
										{data.phone}
									</p>
								</div>
								<div>
									<p className="font-medium text-gray-700 dark:text-gray-300">
										Location:
									</p>
									<p className="text-gray-600 dark:text-gray-400">
										{data.address.city}, {data.address.state}
									</p>
								</div>
							</div>

							<motion.a
								href={data.resumedownload}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block px-6 py-3 mt-4 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								Download Resume
							</motion.a>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
