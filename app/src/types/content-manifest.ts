export interface ContentManifest {
	pages: Array<{
		slug: string
		path: string
		frontMatter: Record<string, unknown>
	}>
	posts: Array<{
		slug: string
		path: string
		frontMatter: Record<string, unknown>
	}>
	settings: {
		title: string
		description: string
		url: string
		author: string
		logo?: string
	} | null
}

