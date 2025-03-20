"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { Resume as ResumeType } from "@/types";

interface ResumeProps {
	data: ResumeType;
}

export default function Resume({ data }: ResumeProps) {
	const [educationRef, educationInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});
	const [workRef, workInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});
	const [skillsRef, skillsInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});
	const [certificationsRef, certificationsInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

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
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5 },
		},
	};

	const renderBulletPoints = (description: string) => {
		if (!description) return null;

		const points = description
			.split("\n")
			.filter((point) => point.trim() !== "");

		if (points.length <= 1) {
			return (
				<p className="text-gray-600 dark:text-gray-400 mt-2">{description}</p>
			);
		}

		return (
			<ul className="list-disc ml-5 mt-2 space-y-1 text-gray-600 dark:text-gray-400">
				{points.map((point, i) => (
					<li key={i}>{point}</li>
				))}
			</ul>
		);
	};

	return (
		<section id="resume" className="py-20">
			<div className="container mx-auto px-4">
				<motion.h2
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
				>
					Resume
				</motion.h2>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
					{/* Education Section */}
					<div>
						<motion.h3
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 mr-2 text-primary"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path d="M12 14l9-5-9-5-9 5 9 5z" />
								<path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
								/>
							</svg>
							Education
						</motion.h3>

						<motion.div
							ref={educationRef}
							variants={containerVariants}
							initial="hidden"
							animate={educationInView ? "visible" : "hidden"}
							className="space-y-6"
						>
							{data.education.map((education, index) => (
								<motion.div
									key={index}
									variants={itemVariants}
									className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-primary before:to-secondary"
								>
									<div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
									<h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
										{education.school}
									</h4>
									<p className="text-gray-600 dark:text-gray-400 font-medium">
										{education.degree}
									</p>
									<p className="text-gray-500 dark:text-gray-500">
										{education.graduated}
									</p>
									{education.description && (
										<p className="text-gray-600 dark:text-gray-400 mt-2">
											{education.description}
										</p>
									)}
								</motion.div>
							))}
						</motion.div>
					</div>

					{/* Work Experience Section */}
					<div>
						<motion.h3
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 mr-2 text-primary"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
							Work Experience
						</motion.h3>

						<motion.div
							ref={workRef}
							variants={containerVariants}
							initial="hidden"
							animate={workInView ? "visible" : "hidden"}
							className="space-y-6"
						>
							{data.work.map((work, index) => (
								<motion.div
									key={index}
									variants={itemVariants}
									className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-primary before:to-secondary"
								>
									<div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
									<h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
										{work.company}
									</h4>
									<p className="text-gray-600 dark:text-gray-400 font-medium">
										{work.title}
									</p>
									<p className="text-gray-500 dark:text-gray-500">
										{work.years}
									</p>
									{renderBulletPoints(work.description)}
								</motion.div>
							))}
						</motion.div>
					</div>
				</div>

				{/* Skills Section */}
				<div ref={skillsRef}>
					<motion.h3
						initial={{ opacity: 0, y: 20 }}
						animate={
							skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
						}
						transition={{ duration: 0.6 }}
						className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 mr-2 text-primary"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
							/>
						</svg>
						Skills
					</motion.h3>

					<motion.p
						initial={{ opacity: 0 }}
						animate={skillsInView ? { opacity: 1 } : { opacity: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-gray-600 dark:text-gray-400 mb-8"
					>
						{data.skillmessage}
					</motion.p>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{data.skills.map((skill, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={
									skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
								}
								transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
								className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
							>
								<div className="flex justify-between items-center mb-2">
									<h4 className="font-medium text-gray-800 dark:text-gray-200">
										{skill.name}
									</h4>
									<span className="text-sm text-gray-600 dark:text-gray-400">
										{skill.level}
									</span>
								</div>
								<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
									<div
										className="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full"
										style={{ width: skill.level }}
									></div>
								</div>
							</motion.div>
						))}
					</div>
				</div>

				<div className="py-12 bg-white dark:bg-gray-800">
					<div ref={certificationsRef} className="container mx-auto px-4">
						<motion.h3
							variants={itemVariants}
							initial="hidden"
							animate={certificationsInView ? "visible" : "hidden"}
							className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200"
						>
							Certifications
						</motion.h3>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{data.certifications?.map((certification, index) => (
								<motion.div
									key={index}
									variants={itemVariants}
									initial="hidden"
									animate={certificationsInView ? "visible" : "hidden"}
									className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
								>
									<div className="flex items-start">
										<div className="mr-4">
											{certification.issuer === "Scrum Alliance" ? (
												<i className="fas fa-users-cog text-2xl text-primary"></i>
											) : certification.issuer === "Microsoft" ? (
												<i className="fab fa-microsoft text-2xl text-primary"></i>
											) : (
												<i className="fas fa-certificate text-2xl text-primary"></i>
											)}
										</div>
										<div>
											<h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
												{certification.title}
											</h4>
											<p className="text-gray-600 dark:text-gray-400 mb-2">
												Issued by: {certification.issuer}
											</p>
											<p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
												Credential ID: {certification.credentialId}
											</p>
											<p className="text-gray-700 dark:text-gray-300">
												{certification.description}
											</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
