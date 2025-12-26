export interface SiteSettings {
	title: string
	description: string
	url: string
	author: string
	logo?: string
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

