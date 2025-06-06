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
				<p className="text-gray-600 dark:text-gray-400 mt-2">
					{description}
				</p>
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
				<div ref={skillsRef} className="mb-16">
					<motion.h3
						initial={{ opacity: 0, y: 20 }}
						animate={
							skillsInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
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
						Technical Skills
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
						{/* Cloud & Infrastructure */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={
								skillsInView
									? { opacity: 1, y: 0 }
									: { opacity: 0, y: 20 }
							}
							transition={{ duration: 0.5, delay: 0.3 }}
							className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
						>
							<div className="flex items-center mb-4">
								<svg
									className="w-6 h-6 text-orange-500 mr-2"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M18.75 8.25L12 13.5l-6.75-5.25v10.5h13.5V8.25z" />
									<path d="M12 2.25L5.25 6.75h13.5L12 2.25z" />
								</svg>
								<h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
									Cloud & Infrastructure
								</h4>
							</div>
							<div className="flex flex-wrap gap-2">
								{[
									"AWS",
									"EC2",
									"Lambda",
									"S3",
									"CloudFormation",
									"Docker",
									"CI/CD",
								].map((tech) => (
									<span
										key={tech}
										className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm font-medium"
									>
										{tech}
									</span>
								))}
							</div>
						</motion.div>

						{/* Frontend Development */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={
								skillsInView
									? { opacity: 1, y: 0 }
									: { opacity: 0, y: 20 }
							}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
						>
							<div className="flex items-center mb-4">
								<svg
									className="w-6 h-6 text-blue-500 mr-2"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
								</svg>
								<h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
									Frontend Development
								</h4>
							</div>
							<div className="flex flex-wrap gap-2">
								{[
									"React",
									"Next.js",
									"TypeScript",
									"JavaScript",
									"Material-UI",
									"Framer Motion",
									"Tailwind CSS",
									"HTML5",
									"CSS3",
								].map((tech) => (
									<span
										key={tech}
										className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
									>
										{tech}
									</span>
								))}
							</div>
						</motion.div>

						{/* Backend & APIs */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={
								skillsInView
									? { opacity: 1, y: 0 }
									: { opacity: 0, y: 20 }
							}
							transition={{ duration: 0.5, delay: 0.5 }}
							className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
						>
							<div className="flex items-center mb-4">
								<svg
									className="w-6 h-6 text-green-500 mr-2"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
									<path d="M12 6v6l4 2" />
								</svg>
								<h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
									Backend & APIs
								</h4>
							</div>
							<div className="flex flex-wrap gap-2">
								{[
									"Node.js",
									"Express",
									"REST APIs",
									"GraphQL",
									"MongoDB",
									"PostgreSQL",
									"Redis",
									"Microservices",
								].map((tech) => (
									<span
										key={tech}
										className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium"
									>
										{tech}
									</span>
								))}
							</div>
						</motion.div>

						{/* AI & Machine Learning */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={
								skillsInView
									? { opacity: 1, y: 0 }
									: { opacity: 0, y: 20 }
							}
							transition={{ duration: 0.5, delay: 0.6 }}
							className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
						>
							<div className="flex items-center mb-4">
								<svg
									className="w-6 h-6 text-purple-500 mr-2"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
								</svg>
								<h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
									AI & Machine Learning
								</h4>
							</div>
							<div className="flex flex-wrap gap-2">
								{[
									"OpenAI API",
									"AssemblyAI",
									"Microsoft Cognitive Services",
									"Natural Language Processing",
									"Speech Recognition",
									"Python",
									"TensorFlow",
								].map((tech) => (
									<span
										key={tech}
										className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium"
									>
										{tech}
									</span>
								))}
							</div>
						</motion.div>

						{/* Desktop & Mobile Development */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={
								skillsInView
									? { opacity: 1, y: 0 }
									: { opacity: 0, y: 20 }
							}
							transition={{ duration: 0.5, delay: 0.7 }}
							className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
						>
							<div className="flex items-center mb-4">
								<svg
									className="w-6 h-6 text-indigo-500 mr-2"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
								</svg>
								<h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
									Desktop & Mobile
								</h4>
							</div>
							<div className="flex flex-wrap gap-2">
								{[
									"Electron",
									"React Native",
									"Flutter",
									"PWA",
									"Cordova",
									"Ionic",
									"Cross-platform Development",
								].map((tech) => (
									<span
										key={tech}
										className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium"
									>
										{tech}
									</span>
								))}
							</div>
						</motion.div>

						{/* Development Tools */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={
								skillsInView
									? { opacity: 1, y: 0 }
									: { opacity: 0, y: 20 }
							}
							transition={{ duration: 0.5, delay: 0.8 }}
							className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
						>
							<div className="flex items-center mb-4">
								<svg
									className="w-6 h-6 text-gray-500 mr-2"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
								</svg>
								<h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
									Development Tools
								</h4>
							</div>
							<div className="flex flex-wrap gap-2">
								{[
									"Git",
									"GitHub",
									"VS Code",
									"Vite",
									"Webpack",
									"ESLint",
									"Prettier",
									"Jest",
									"Playwright",
									"Postman",
								].map((tech) => (
									<span
										key={tech}
										className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium"
									>
										{tech}
									</span>
								))}
							</div>
						</motion.div>
					</div>
				</div>

				<div className="py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-8">
					<div
						ref={certificationsRef}
						className="container mx-auto px-4"
					>
						<motion.h3
							variants={itemVariants}
							initial="hidden"
							animate={
								certificationsInView ? "visible" : "hidden"
							}
							className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200"
						>
							Certifications
						</motion.h3>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{data.certifications?.map(
								(certification, index) => (
									<motion.div
										key={index}
										variants={itemVariants}
										initial="hidden"
										animate={
											certificationsInView
												? "visible"
												: "hidden"
										}
										className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
									>
										<div className="flex items-start">
											<div className="mr-4">
												{certification.issuer ===
												"Scrum Alliance" ? (
													<i className="fas fa-users-cog text-2xl text-primary"></i>
												) : certification.issuer ===
												  "Microsoft" ? (
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
													Issued by:{" "}
													{certification.issuer}
												</p>
												<p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
													Credential ID:{" "}
													{certification.credentialId}
												</p>
												<p className="text-gray-700 dark:text-gray-300">
													{certification.description}
												</p>
											</div>
										</div>
									</motion.div>
								)
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
