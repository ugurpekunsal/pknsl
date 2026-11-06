import Image from "next/image";
import type { Portfolio as PortfolioType } from "@/types";

interface PortfolioProps {
	data: PortfolioType;
}

export default function Portfolio({ data }: PortfolioProps) {
	return (
		<section id="work" className="work-section section-dark" aria-labelledby="work-title">
			<div className="shell">
				<div className="section-heading section-heading--split">
					<div>
						<p className="section-kicker">01 / Selected work</p>
						<h2 id="work-title">A few things I&apos;ve helped bring to life.</h2>
					</div>
					<p>
						Web experiences across travel, technology, music, and wellness—each
						shaped around the people who use it.
					</p>
				</div>

				<div className="project-grid">
					{data.projects.map((project, index) => (
						<article className="project-card" key={project.title}>
							<a href={project.url} target="_blank" rel="noopener noreferrer">
								<div className="project-card__image">
									<Image
										src={`/images/${project.image}`}
										alt={`${project.title} project artwork`}
										fill
										sizes="(max-width: 760px) 100vw, 50vw"
										className="project-card__img"
									/>
									<span className="project-card__number">0{index + 1}</span>
									<span className="project-card__arrow" aria-hidden="true">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
											<path d="M7 17 17 7M7 7h10v10" />
										</svg>
									</span>
								</div>
								<div className="project-card__body">
									<div>
										<p>{project.category}</p>
										<h3>{project.title}</h3>
									</div>
									<span className="project-card__link">
										Visit live site
										<span className="sr-only"> (opens in a new tab)</span>
									</span>
								</div>
							</a>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
