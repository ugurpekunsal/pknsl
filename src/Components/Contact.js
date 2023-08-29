import React, { Component } from "react";
import { Fade, Slide } from "react-reveal";
import $ from "jquery";

import "firebase/compat/firestore";

class Contact extends Component {
	render() {
		if (!this.props.data) return null;

		const name = this.props.data.name;
		const street = this.props.data.address.street;
		const city = this.props.data.address.city;
		const state = this.props.data.address.state;
		const zip = this.props.data.address.zip;
		const phone = this.props.data.phone;
		const message = this.props.data.contactmessage;

		let sendMessage = function (e) {
			$("#image-loader").fadeIn();
			e.preventDefault();

			const validateEmail = (email) => {
				return String(email)
					.toLowerCase()
					.match(
						/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					);
			};

			const payload = {
				name: $("#contactForm #contactName").val(),
				email: $("#contactForm #contactEmail").val(),
				subject: $("#contactForm #contactSubject").val(),
				message: $("#contactForm #contactMessage").val(),
			};

			let msg;
			if (!validateEmail(payload.email))
				msg = "Please enter a valid email address.";
			if (!payload.message) msg = "Please enter a message.";
			if (msg) {
				$("#image-loader").fadeOut();
				$("#message-warning").html(msg);
				$("#message-warning").fadeIn();
				return;
			}

			var settings = {
				url: "https://us-central1-pknsldotcom.cloudfunctions.net/sendMailOverHTTP",
				method: "POST",
				timeout: 0,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				data: {
					name: payload.name,
					email: payload.email,
					subject: payload.subject,
					message: payload.message,
				},
			};

			$.ajax(settings).done(function (response) {
				console.log(response);
				if (response.includes("OK")) {
					$("#image-loader").fadeOut();
					$("#message-warning").hide();
					$("#contactForm").fadeOut();
					$("#message-success").fadeIn();
				} else {
					$("#image-loader").fadeOut();
					$("#message-warning").fadeIn();
				}
			});
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
							<p className="lead">{message}</p>
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
										></textarea>
									</div>

									<div>
										<button className="submit">Submit</button>
										<span id="image-loader">
											<img alt="loading" src="images/loader.gif" />
										</span>
									</div>
								</fieldset>
							</form>

							<div id="message-warning"> Error</div>
							<div id="message-success">
								<i className="fa fa-check"></i>Your message was sent, thank you!
								<br />
							</div>
						</div>
					</Slide>

					<Slide right duration={1000}>
						<aside className="four columns footer-widgets">
							<div className="widget widget_contact">
								<h4>Address and Phone</h4>
								<p className="address">
									{name}
									<br />
									{street} <br />
									{city}, {state} {zip}
									<br />
									<span>{phone}</span>
								</p>
							</div>

							<div className="widget widget_tweets">
								<h4 className="widget-title">Latest Tweets</h4>
								<ul id="twitter">
									<li>
										<span>
											I started offering website design services! Please check
											the link below :) Basic Website Design Package: <br></br>
											<a
												target="_blank"
												rel="noreferrer"
												href="https://t.co/Vc4t7BverT"
											>
												https://t.co/Vc4t7BverT
											</a>
										</span>
										<b>
											<a
												target="_blank"
												rel="noreferrer"
												href="https://twitter.com/PKNSLdotcom/status/1374795037813346306"
											>
												2:47 PM · Mar 24, 2021
											</a>
										</b>
									</li>
									<li>
										<span>
											8 surprising little-known facts about Bill Gates Read
											more: <br></br>
											<a
												target="_blank"
												rel="noreferrer"
												href="https://t.co/ZvErXNEvRy"
											>
												https://t.co/ZvErXNEvRy
											</a>
										</span>
										<b>
											<a
												target="_blank"
												rel="noreferrer"
												href="https://twitter.com/PKNSLdotcom/status/1344308915811573765"
											>
												10:46 AM · Dec 30, 2020
											</a>
										</b>
									</li>
								</ul>
							</div>
						</aside>
					</Slide>
				</div>
			</section>
		);
	}
}
export default Contact;
