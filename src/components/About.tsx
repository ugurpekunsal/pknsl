import type { Main } from "@/types";

interface AboutProps {
	data: Main;
}

export default function About({ data }: AboutProps) {
	return (
		<section id="about" className="about-section section" aria-labelledby="about-title">
			<div className="shell">
				<p className="section-kicker">02 / About</p>
				<div className="about-section__intro">
					<h2 id="about-title">
						A product mindset, with a pilot&apos;s eye for <em>the details.</em>
					</h2>
					<div className="about-section__copy">
						<p>{data.bio}</p>
						<p>
							My experience spans product engineering, R&amp;D, digital content,
							and independent client work. I enjoy being the person who can connect
							the interface, the API, and the infrastructure—and keep the whole
							experience feeling coherent.
						</p>
					</div>
				</div>

				<div className="about-section__details">
					<div className="about-facts">
						<div>
							<span>Based in</span>
							<strong>{data.address.city}, {data.address.state}</strong>
						</div>
						<div>
							<span>Focused on</span>
							<strong>Full-stack product development</strong>
						</div>
						<div>
							<span>Background</span>
							<strong>Software engineering &amp; AI</strong>
						</div>
					</div>
					<div className="about-note">
						<span className="about-note__mark" aria-hidden="true">“</span>
						<p>
							Good software should feel clear, useful, and human—no matter how
							complex the system behind it is.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
