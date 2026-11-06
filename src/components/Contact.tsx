"use client";

import { useState } from "react";
import type { Main } from "@/types";

interface ContactProps {
	data: Main;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function Contact({ data }: ContactProps) {
	const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
	const [formStatus, setFormStatus] = useState<FormStatus>("idle");
	const [errorMessage, setErrorMessage] = useState("");
	const email = data.email.split(" or ")[0];

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormStatus("submitting");
		setErrorMessage("");

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error || "Failed to send message");

			setFormStatus("success");
			setFormData({ name: "", email: "", subject: "", message: "" });
		} catch (error) {
			setFormStatus("error");
			setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
		}
	};

	return (
		<section id="contact" className="contact-section section-dark" aria-labelledby="contact-title">
			<div className="shell contact-section__layout">
				<div className="contact-section__copy">
					<p className="section-kicker">05 / Contact</p>
					<h2 id="contact-title">Let&apos;s make something <em>worth using.</em></h2>
					<p>{data.contactmessage} Whether it&apos;s a new idea, an interesting role, or a problem that needs untangling, I&apos;d love to hear about it.</p>
					<div className="contact-details">
						<a href={`mailto:${email}`}>
							<span>Email</span>
							<strong>{email}</strong>
						</a>
						<a href={`tel:+1${data.phone.replace(/\D/g, "")}`}>
							<span>Phone</span>
							<strong>{data.phone}</strong>
						</a>
						<div>
							<span>Location</span>
							<strong>{data.address.city}, {data.address.state}</strong>
						</div>
					</div>
				</div>

				<div className="contact-form-wrap">
					{formStatus === "success" ? (
						<div className="form-success" role="status">
							<span aria-hidden="true">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m5 12 4 4L19 6" /></svg>
							</span>
							<p className="eyebrow">Message sent</p>
							<h3>Thanks for reaching out.</h3>
							<p>Your message is on its way. I&apos;ll get back to you as soon as I can.</p>
							<button type="button" className="text-link" onClick={() => setFormStatus("idle")}>Send another message</button>
						</div>
					) : (
						<form onSubmit={handleSubmit} className="contact-form">
							<div className="contact-form__heading">
								<h3>Tell me a little about it.</h3>
								<span>All fields are required</span>
							</div>
							<div className="form-grid">
								<div className="field">
									<label htmlFor="name">Your name</label>
									<input id="name" name="name" type="text" autoComplete="name" value={formData.name} onChange={handleChange} placeholder="Jane Smith" required />
								</div>
								<div className="field">
									<label htmlFor="email">Email address</label>
									<input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder="jane@company.com" required />
								</div>
							</div>
							<div className="field">
								<label htmlFor="subject">Subject</label>
								<input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} placeholder="What would you like to discuss?" required />
							</div>
							<div className="field">
								<label htmlFor="message">Message</label>
								<textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="A little context goes a long way..." required />
							</div>
							<button type="submit" className="button button--primary contact-form__submit" disabled={formStatus === "submitting"}>
								{formStatus === "submitting" ? "Sending message..." : "Send message"}
								{formStatus !== "submitting" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>}
							</button>
							<div className="form-status" aria-live="polite">
								{formStatus === "error" && <p>{errorMessage || "Your message could not be sent. Please try again or email me directly."}</p>}
							</div>
						</form>
					)}
				</div>
			</div>
		</section>
	);
}
