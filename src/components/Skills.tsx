import type { Resume } from "@/types";

interface SkillsProps {
	data: Resume;
}

const skillGroups = [
	{
		title: "Front-end development",
		description: "Interfaces that are responsive, accessible, and easy to use.",
		skills: ["React", "Next.js", "Redux-Saga", "TypeScript", "JavaScript", "HTML5", "CSS3", "SASS/SCSS", "Material-UI", "Tailwind CSS"],
	},
	{
		title: "Back-end & APIs",
		description: "Reliable services and data layers built to grow with the product.",
		skills: ["Node.js", "Go (Golang)", "Protobuf", "Express", "REST APIs", "GraphQL (Apollo)", "MongoDB", "PostgreSQL", "MySQL", "Redis", "Microservices"],
	},
	{
		title: "Cloud & infrastructure",
		description: "Practical infrastructure, observability, and deployment workflows.",
		skills: ["AWS", "EC2", "Lambda", "S3", "CloudFormation", "Docker", "Istio", "Kibana", "CI/CD"],
	},
	{
		title: "AI & machine learning",
		description: "Applying intelligent services where they add genuine product value.",
		skills: ["OpenAI API", "Google Cloud Vision", "Azure Neural Speech", "Firebase", "Microsoft Cognitive Services", "NLP", "Python", "TensorFlow"],
	},
	{
		title: "Tools & methodologies",
		description: "A collaborative engineering practice grounded in quality and iteration.",
		skills: ["Git", "GitHub", "VS Code", "Jest", "Playwright", "Agile", "Scrum", "Code Review"],
	},
];

export default function Skills({ data }: SkillsProps) {
	return (
		<section id="skills" className="skills-section section" aria-labelledby="skills-title">
			<div className="shell">
				<div className="section-heading section-heading--split">
					<div>
						<p className="section-kicker">03 / Capabilities</p>
						<h2 id="skills-title">Across the stack.<br /><em>Without the silos.</em></h2>
					</div>
					<p>{data.skillmessage}</p>
				</div>

				<div className="skills-list">
					{skillGroups.map((group, index) => (
						<article className="skill-row" key={group.title}>
							<span className="skill-row__number">0{index + 1}</span>
							<div className="skill-row__title">
								<h3>{group.title}</h3>
								<p>{group.description}</p>
							</div>
							<ul className="skill-tags" aria-label={`${group.title} technologies`}>
								{group.skills.map((skill) => <li key={skill}>{skill}</li>)}
							</ul>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
