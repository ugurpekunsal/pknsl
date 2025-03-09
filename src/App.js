import React, { Suspense, lazy, useState, useEffect } from "react";
import ReactGA from "react-ga";
import $ from "jquery";
import "./App.css";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

// Lazy load components that aren't needed immediately
const About = lazy(() => import("./Components/About"));
const Portfolio = lazy(() => import("./Components/Portfolio"));
const Contact = lazy(() => import("./Components/Contact"));
const Resume = lazy(() => import("./Components/Resume"));

function App() {
	const [resumeData, setResumeData] = useState({});
	const [dataLoaded, setDataLoaded] = useState(false);

	useEffect(() => {
		// Initialize Google Analytics
		ReactGA.initialize("UA-110570651-1");
		ReactGA.pageview(window.location.pathname);
		
		// Get resume data
		$.ajax({
			url: "./resumeData.json",
			dataType: "json",
			cache: false,
			success: function (data) {
				setResumeData(data);
				setDataLoaded(true);
			},
			error: function (xhr, status, err) {
				console.log(err);
				alert(err);
			},
		});
	}, []);

	return (
		<div className="App">
			<Header data={resumeData.main} />
			{dataLoaded && (
				<Suspense fallback={<div>Loading...</div>}>
					<About data={resumeData.main} />
					<Resume data={resumeData.resume} />
					<Portfolio data={resumeData.portfolio} />
					<Contact data={resumeData.main} />
				</Suspense>
			)}
			<Footer data={resumeData.main} />
		</div>
	);
}

export default App;
