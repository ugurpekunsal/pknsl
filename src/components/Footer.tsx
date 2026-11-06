import type { Main } from "@/types";
import SocialIcon from "./SocialIcon";

interface FooterProps {
	data: Main;
}

export default function Footer({ data }: FooterProps) {
	return (
		<footer className="site-footer">
			<div className="shell">
				<div className="site-footer__top">
					<a href="#home" className="brand" aria-label="Back to top">
						<span className="brand__mark" aria-hidden="true">P/</span>
						<span>pknsl</span>
					</a>
					<p>Thoughtful digital experiences,<br />built end to end.</p>
					<a href="#home" className="back-to-top">
						Back to top
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
					</a>
				</div>
				<div className="site-footer__bottom">
					<p>&copy; {new Date().getFullYear()} {data.name}. Built with care in Toronto.</p>
					<div className="site-footer__socials">
						{data.social.map((social) => <SocialIcon key={social.name} name={social.name} url={social.url} />)}
					</div>
				</div>
			</div>
		</footer>
	);
}
