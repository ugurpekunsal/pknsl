import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Portfolio from "@/components/Portfolio";
import Resume from "@/components/Resume";
import Skills from "@/components/Skills";
import resumeData from "@/data/resumeData.json";
import type { ResumeData } from "@/types";

const data = resumeData as ResumeData;

export default function Home() {
	return (
		<>
			<Navigation />
			<main id="main-content">
				<Hero data={data.main} />
				<Portfolio data={data.portfolio} />
				<About data={data.main} />
				<Skills data={data.resume} />
				<Resume data={data.resume} />
				<Contact data={data.main} />
			</main>
			<Footer data={data.main} />
		</>
	);
}
