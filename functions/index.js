const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
admin.initializeApp();
const cors = require("cors");
const corsHandler = cors({ origin: true });
/* gmail  credentials */
var transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: "ugurpekunsal@gmail.com",
		pass: process.env.API_KEY,
	},
});
exports.sendMailOverHTTP = functions.https.onRequest((req, res) => {
	corsHandler(req, res, async () => {
		const mailOptions = {
			from: `ian@pknsl.com`,
			to: `ugurpekunsal@gmail.com`,
			subject: "Email From PKNSL.COM | Contact Form Message",
			html: `<h1>Contact Form Message</h1>
                            <p>
                                <b>Email: </b>${req.body.email}<br>
                                <b>Name: </b>${req.body.name}<br>
                                <b>Subject: </b>${req.body.subject}<br>
                                <b>Message: </b>${req.body.message}<br>
                            </p>`,
		};
		return transporter.sendMail(mailOptions, (error, data) => {
			if (error) {
				return res.send(error.toString());
			}
			var data = JSON.stringify(data);
			return res.send(`Sent! ${data}`);
		});
	});
});
