"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { Main } from "@/types";

interface ContactProps {
	data: Main;
}

export default function Contact({ data }: ContactProps) {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [formStatus, setFormStatus] = useState<
		"idle" | "submitting" | "success" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setFormStatus("submitting");
		setErrorMessage("");

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to send message");
			}

			setFormStatus("success");
			setFormData({ name: "", email: "", subject: "", message: "" });

			// Reset the form status after 5 seconds
			setTimeout(() => {
				setFormStatus("idle");
			}, 5000);
		} catch (error) {
			setFormStatus("error");
			if (error instanceof Error) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage("An unknown error occurred");
			}
			console.error("Error submitting form:", error);
		}
	};

	const contactItems = [
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
					/>
				</svg>
			),
			title: "Phone",
			content: data.phone,
		},
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
					/>
				</svg>
			),
			title: "Email",
			content: data.email.split(" or ")[0],
		},
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
			),
			title: "Location",
			content: `${data.address.city}, ${data.address.state}`,
		},
	];

	return (
		<section id="contact" className="py-20">
			<div ref={ref} className="container mx-auto px-4">
				<motion.h2
					initial={{ opacity: 0, y: -20 }}
					animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
					transition={{ duration: 0.6 }}
					className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
				>
					Get In Touch
				</motion.h2>

				<motion.p
					initial={{ opacity: 0 }}
					animate={inView ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
				>
					{data.contactmessage}
				</motion.p>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
					{contactItems.map((item, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
							transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
							className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
						>
							<div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">
								{item.icon}
							</div>
							<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
								{item.title}
							</h3>
							<p className="text-gray-600 dark:text-gray-400 text-center">
								{item.content}
							</p>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
					transition={{ duration: 0.6, delay: 0.6 }}
					className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
				>
					<h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
						Send Me a Message
					</h3>

					<form onSubmit={handleSubmit}>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
								>
									Your Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required
									className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
								/>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
								>
									Your Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required
									className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
								/>
							</div>
						</div>

						<div className="mb-6">
							<label
								htmlFor="subject"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
							>
								Subject
							</label>
							<input
								type="text"
								id="subject"
								name="subject"
								value={formData.subject}
								onChange={handleChange}
								required
								className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
							/>
						</div>

						<div className="mb-6">
							<label
								htmlFor="message"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
							>
								Message
							</label>
							<textarea
								id="message"
								name="message"
								rows={5}
								value={formData.message}
								onChange={handleChange}
								required
								className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
							></textarea>
						</div>

						<button
							type="submit"
							disabled={formStatus === "submitting"}
							className="w-full py-3 px-6 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70"
						>
							{formStatus === "submitting" ? "Sending..." : "Send Message"}
						</button>

						{formStatus === "success" && (
							<p className="mt-4 text-green-600 dark:text-green-400">
								Your message has been sent successfully!
							</p>
						)}

						{formStatus === "error" && (
							<p className="mt-4 text-red-600 dark:text-red-400">
								{errorMessage || "An error occurred. Please try again later."}
							</p>
						)}
					</form>
				</motion.div>
			</div>
		</section>
	);
}
