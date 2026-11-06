import Image from "next/image";
import type { Main } from "@/types";
import SocialIcon from "./SocialIcon";

interface HeroProps {
	data: Main;
}

export default function Hero({ data }: HeroProps) {
	return (
		<section id="home" className="hero" aria-labelledby="hero-title">
			<div className="shell hero__layout">
				<div className="hero__copy">
					<p className="eyebrow hero__eyebrow">
						<span className="status-dot" aria-hidden="true" />
						Full-stack developer · Toronto, Canada
					</p>
					<h1 id="hero-title" className="hero__title">
						I make the web feel <em>effortless.</em>
					</h1>
					<p className="hero__intro">
						I&apos;m Ian Pekünsal. I pair front-end sensibility with back-end
						depth to turn complex ideas into clear, useful digital products.
					</p>
					<div className="hero__actions">
						<a className="button button--primary" href="#work">
							Explore my work
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
								<path d="M5 12h14M13 6l6 6-6 6" />
							</svg>
						</a>
						<a
							className="text-link"
							href={data.resumedownload}
							target="_blank"
							rel="noopener noreferrer"
						>
							Download résumé
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
								<path d="M7 17 17 7M7 7h10v10" />
							</svg>
						</a>
					</div>
					<div className="hero__socials">
						{data.social.map((social) => (
							<SocialIcon key={social.name} name={social.name} url={social.url} />
						))}
						<span>Find me elsewhere</span>
					</div>
				</div>

				<div className="hero__visual">
					<Image
						src="/images/about.png"
						alt="PKNSL personal brand mark"
						fill
						priority
						sizes="(max-width: 900px) 100vw, 38vw"
						className="hero__image"
					/>
					<div className="hero__visual-top" aria-hidden="true">
						<span>PKNSL®</span>
						<span>EST. 2019</span>
					</div>
					<div className="hero__visual-caption">
						<span>Front-end sensibility.</span>
						<span>Back-end depth.</span>
					</div>
				</div>
			</div>

			<div className="shell hero__meta" aria-label="Professional overview">
				<div>
					<span className="hero__meta-label">Currently</span>
					<strong>Full Stack Developer at Nelson</strong>
				</div>
				<div>
					<span className="hero__meta-label">Expertise</span>
					<strong>Product, web &amp; cloud</strong>
				</div>
				<div>
					<span className="hero__meta-label">Approach</span>
					<strong>Curious, collaborative, precise</strong>
				</div>
			</div>
		</section>
	);
}
