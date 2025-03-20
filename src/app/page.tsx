"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Resume from "@/components/Resume";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import type { ResumeData } from "@/types";
import resumeData from "@/data/resumeData.json";

export default function Home() {
	const [data, setData] = useState<ResumeData | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setData(resumeData as ResumeData);
		setIsLoading(false);
	}, []);

	if (isLoading || !data) {
		return (
			<div className="flex h-screen w-full items-center justify-center">
				<div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
			<Navigation />

			<motion.main
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6 }}
			>
				<Hero data={data.main} />
				<About data={data.main} />
				<Resume data={data.resume} />
				<Portfolio data={data.portfolio} />
				<Contact data={data.main} />
				<Footer data={data.main} />
			</motion.main>
		</div>
	);
}
