export interface ThemeColors {
	primary: string
	secondary: string
	accent: string
}

export interface SiteSettings {
	title: string
	description: string
	url: string
	author: string
	logo?: string
	theme?: {
		primaryColor: string
		secondaryColor: string
		accentColor: string
	}
}

export interface PageFrontMatter {
	title: string
	date: string
	description?: string
	slug: string
}

export interface Page extends PageFrontMatter {
	body: string
}

export interface PostFrontMatter {
	title: string
	date: string
	author: string
	tags: string[]
	image?: string
	description?: string
	slug: string
}

export interface Post extends PostFrontMatter {
	body: string
}

export interface ExperienceFrontMatter {
	type: string
	company: string
	companyAbout: string
	companyLocation: string
	companyLogo: string
	position: string
	period: string
	responsibilities: string[]
	slug: string
}

export interface Experience extends ExperienceFrontMatter {
	// No body field needed for experiences
}

export interface Services {
	services: string[]
}

