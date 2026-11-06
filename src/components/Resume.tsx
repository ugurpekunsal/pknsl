import type { Resume as ResumeType } from "@/types";

interface ResumeProps {
	data: ResumeType;
}

export default function Resume({ data }: ResumeProps) {
	return (
		<section id="experience" className="experience-section section" aria-labelledby="experience-title">
			<div className="shell">
				<div className="section-heading section-heading--split">
					<div>
						<p className="section-kicker">04 / Experience</p>
						<h2 id="experience-title">The work behind<br /><em>the work.</em></h2>
					</div>
					<p>
						A path from front-end foundations to full-stack product engineering,
						with plenty of collaboration and problem-solving along the way.
					</p>
				</div>

				<div className="experience-list">
					{data.work.map((job, index) => {
						const points = job.description.split("\n").filter(Boolean);
						return (
							<details className="experience-item" key={`${job.company}-${job.title}`} open={index === 0}>
								<summary>
									<span className="experience-item__years">{job.years}</span>
									<span className="experience-item__role">
										<strong>{job.title}</strong>
										<span>{job.company}</span>
									</span>
									<span className="experience-item__toggle" aria-hidden="true" />
								</summary>
								<div className="experience-item__content">
									{points.length > 1 ? (
										<ul>
											{points.map((point) => <li key={point}>{point}</li>)}
										</ul>
									) : <p>{job.description}</p>}
								</div>
							</details>
						);
					})}
				</div>

				<div className="credentials">
					<div className="education">
						<p className="section-kicker">Education</p>
						<h3>Always learning.</h3>
						<div className="education-list">
							{data.education.map((education) => (
								<article key={`${education.school}-${education.degree}`}>
									<span>{education.graduated}</span>
									<h4>{education.degree}</h4>
									<p>{education.school}</p>
									{education.description && <small>{education.description}</small>}
								</article>
							))}
						</div>
					</div>

					<div className="certifications">
						<p className="section-kicker">Certifications</p>
						<h3>Validated expertise.</h3>
						<div className="certification-list">
							{data.certifications.map((certification) => (
								<article key={certification.credentialId}>
									<div className="certification-list__top">
										<span>{certification.issuer}</span>
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
											<circle cx="12" cy="9" r="6" />
											<path d="m8.5 14-1 8 4.5-2 4.5 2-1-8M9.5 9l1.5 1.5L14.5 7" />
										</svg>
									</div>
									<h4>{certification.title}</h4>
									<p>{certification.description}</p>
									<div className="certification-list__meta">
										<span>{certification.date}</span>
										<span>ID: {certification.credentialId}</span>
									</div>
								</article>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
