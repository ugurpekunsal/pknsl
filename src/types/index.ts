export interface Main {
	name: string;
	description: string;
	image: string;
	bio: string;
	contactmessage: string;
	email: string;
	phone: string;
	github: string;
	linkedin: string;
	address: {
		street: string;
		city: string;
		state: string;
		zip: string;
	};
	website: string;
	resumedownload: string;
	social: SocialLink[];
}

export interface SocialLink {
	name: string;
	url: string;
	className: string;
}

export interface Education {
	school: string;
	degree: string;
	graduated: string;
	description: string;
}

export interface Work {
	company: string;
	title: string;
	years: string;
	description: string;
}

export interface Skill {
	name: string;
	level: string;
}

export interface Certification {
	title: string;
	issuer: string;
	date: string;
	credentialId: string;
	description: string;
}

export interface Resume {
	skillmessage: string;
	education: Education[];
	work: Work[];
	skills: Skill[];
	certifications: Certification[];
}

export interface Project {
	title: string;
	category: string;
	image: string;
	url: string;
}

export interface Portfolio {
	projects: Project[];
}

export interface ResumeData {
	main: Main;
	resume: Resume;
	portfolio: Portfolio;
}
