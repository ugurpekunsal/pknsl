import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with your API key
// You'll need to add your Resend API key to your environment variables in Vercel
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
	try {
		const formData = await request.json();
		const { name, email, subject, message } = formData;

		// Validate the form data
		if (!name || !email || !subject || !message) {
			return NextResponse.json(
				{ error: "All fields are required" },
				{ status: 400 }
			);
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: "Please enter a valid email address" },
				{ status: 400 }
			);
		}

		// Only actually send email if RESEND_API_KEY is defined
		// This makes it safe to test locally without an API key
		if (process.env.RESEND_API_KEY) {
			const { data, error } = await resend.emails.send({
				from: `Contact Form <${
					process.env.EMAIL_FROM || "onboarding@resend.dev"
				}>`,
				to: process.env.EMAIL_TO || email, // Fallback to sender's email for testing
				subject: `New Contact: ${subject}`,
				replyTo: email,
				text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
				html: `
					<!DOCTYPE html>
					<html>
						<head>
							<meta charset="utf-8">
							<title>New Contact Form Submission</title>
							<style>
								body {
									font-family: Arial, sans-serif;
									line-height: 1.6;
									color: #333;
									margin: 0;
									padding: 0;
								}
								.container {
									max-width: 600px;
									margin: 0 auto;
									padding: 20px;
									border: 1px solid #ddd;
									border-radius: 5px;
								}
								.header {
									background: linear-gradient(to right, #7878c6, #8F66FF);
									padding: 20px;
									color: white;
									border-radius: 5px 5px 0 0;
									text-align: center;
								}
								.content {
									padding: 20px;
									background-color: #f9f9f9;
								}
								.field {
									margin-bottom: 15px;
									border-bottom: 1px solid #eee;
									padding-bottom: 15px;
								}
								.label {
									font-weight: bold;
									color: #555;
								}
								.footer {
									text-align: center;
									font-size: 12px;
									color: #777;
									margin-top: 20px;
								}
							</style>
						</head>
						<body>
							<div class="container">
								<div class="header">
									<h1>New Contact Message</h1>
								</div>
								<div class="content">
									<div class="field">
										<p class="label">Name:</p>
										<p>${name}</p>
									</div>
									<div class="field">
										<p class="label">Email:</p>
										<p>${email}</p>
									</div>
									<div class="field">
										<p class="label">Subject:</p>
										<p>${subject}</p>
									</div>
									<div class="field">
										<p class="label">Message:</p>
										<p>${message.replace(/\n/g, "<br>")}</p>
									</div>
								</div>
								<div class="footer">
									<p>This message was sent from your portfolio website contact form.</p>
								</div>
							</div>
						</body>
					</html>
				`,
			});

			if (error) {
				console.error("Email error:", error);
				return NextResponse.json(
					{ error: "Failed to send email" },
					{ status: 500 }
				);
			}

			console.log("Email sent successfully:", data);
		} else {
			console.log(
				"RESEND_API_KEY not defined, email would have been sent with:",
				{
					name,
					email,
					subject,
					message,
				}
			);
		}

		return NextResponse.json(
			{ message: "Message sent successfully!" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Contact form error:", error);
		return NextResponse.json(
			{ error: "Failed to send message" },
			{ status: 500 }
		);
	}
}
