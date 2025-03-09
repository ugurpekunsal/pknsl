import React, { useState } from "react";
import { Fade, Slide } from "react-reveal";
import axios from "axios";

import "firebase/compat/firestore";

const Contact = (props) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: ""
	});
	const [loading, setLoading] = useState(false);
	const [messageSuccess, setMessageSuccess] = useState(false);
	const [messageError, setMessageError] = useState("");

	if (!props.data) return null;

	const { name, address, phone, contactmessage } = props.data;
	const { street, city, state, zip } = address;

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id.replace("contact", "").toLowerCase()]: e.target.value
		});
	};

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	const sendMessage = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessageError("");
		setMessageSuccess(false);

		if (!validateEmail(formData.email)) {
			setMessageError("Please enter a valid email address.");
			setLoading(false);
			return;
		}
		
		if (!formData.message) {
			setMessageError("Please enter a message.");
			setLoading(false);
			return;
		}

		try {
			const response = await axios.post(
				"https://us-central1-pknsldotcom.cloudfunctions.net/sendMailOverHTTP",
				formData
			);
			
			if (response.data.includes("OK")) {
				setMessageSuccess(true);
			} else {
				setMessageError("An error occurred. Please try again later.");
			}
		} catch (error) {
			console.error("Error sending message:", error);
			setMessageError("Failed to send message. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<section id="contact">
			<Fade bottom duration={1000}>
				<div className="row section-head">
					<div className="two columns header-col">
						<h1>
							<span>Get In Touch.</span>
						</h1>
					</div>

					<div className="ten columns">
						<p className="lead">{contactmessage}</p>
					</div>
				</div>
			</Fade>

			<div className="row">
				<Slide left duration={1000}>
					<div className="eight columns">
						<form onSubmit={sendMessage} id="contactForm" name="contactForm">
							<fieldset>
								<div>
									<label htmlFor="contactName">
										Name <span className="required">*</span>
									</label>
									<input
										type="text"
										defaultValue=""
										size="35"
										id="contactName"
										name="contactName"
										onChange={handleChange}
									/>
								</div>

								<div>
									<label htmlFor="contactEmail">
										Email <span className="required">*</span>
									</label>
									<input
										type="text"
										defaultValue=""
										size="35"
										id="contactEmail"
										name="contactEmail"
										onChange={handleChange}
									/>
								</div>

								<div>
									<label htmlFor="contactSubject">Subject</label>
									<input
										type="text"
										defaultValue=""
										size="35"
										id="contactSubject"
										name="contactSubject"
										onChange={handleChange}
									/>
								</div>

								<div>
									<label htmlFor="contactMessage">
										Message <span className="required">*</span>
									</label>
									<textarea
										cols="50"
										rows="15"
										id="contactMessage"
										name="contactMessage"
										onChange={handleChange}
									></textarea>
								</div>

								<div>
									<button className="submit">Submit</button>
									<span id="image-loader">
										{loading && <img alt="loading" src="images/loader.gif" />}
									</span>
								</div>
							</fieldset>
						</form>

						<div id="message-warning">{messageError}</div>
						<div id="message-success">
							{messageSuccess && (
								<>
									<i className="fa fa-check"></i>Your message was sent, thank you!
									<br />
								</>
							)}
						</div>
					</div>
				</Slide>
			</div>
		</section>
	);
};

export default Contact;
