import matter from 'gray-matter'
import type { Page, Post, SiteSettings } from '@/types/cms'
import type { ContentManifest } from '@/types/content-manifest'
import contentManifestJson from '../content-manifest.json'

const contentManifest = contentManifestJson as ContentManifest

const CMS_CONTENT_BASE = '/kmavillanosa/cms/content'

// Try to use import.meta.glob for build-time content loading
let pageModules: Record<string, () => Promise<string>> | Record<string, string> = {}
let postModules: Record<string, () => Promise<string>> | Record<string, string> = {}

try {
	// Attempt to use Vite's import.meta.glob (works at build time)
	const globPages = import.meta.glob('../../../../cms/content/pages/*.md', {
		eager: false,
		as: 'raw',
	})
	const globPosts = import.meta.glob('../../../../cms/content/posts/*.md', {
		eager: false,
		as: 'raw',
	})
	pageModules = globPages
	postModules = globPosts
} catch {
	// Fallback: will use fetch API at runtime
}

/**
 * Loads and parses site settings from the CMS
 */
export async function loadSiteSettings(): Promise<SiteSettings> {
	try {
		const response = await fetch(`${CMS_CONTENT_BASE}/settings/site.json`)
		if (!response.ok) {
			throw new Error('Failed to load site settings')
		}
		return await response.json()
	} catch (error) {
		console.error('Error loading site settings:', error)
		return {
			title: 'Kim Avillanosa',
			description: 'I make cool stuff for a living',
			url: 'https://kmavillanosa.github.io/kmavillanosa',
			author: 'Kim Avillanosa',
		}
	}
}

/**
 * Loads all pages from the CMS
 * Uses content manifest for metadata and fetches content at runtime
 */
export async function loadPages(): Promise<Page[]> {
	try {
		const pages: Page[] = []
		
		// Use manifest if available (generated at build time)
		if (contentManifest && Array.isArray(contentManifest.pages)) {
			for (const pageInfo of contentManifest.pages) {
				try {
					// Fetch the actual markdown content
					const response = await fetch(`${CMS_CONTENT_BASE}/${pageInfo.path}`)
					if (!response.ok) continue
					
					const content = await response.text()
					const parsed = matter(content)
					
					pages.push({
						...parsed.data as Omit<Page, 'body' | 'slug'>,
						body: parsed.content,
						slug: pageInfo.slug,
					})
				} catch (error) {
					console.error(`Error loading page ${pageInfo.path}:`, error)
				}
			}
		} else {
			// Fallback: try to use import.meta.glob modules
			for (const [path, loader] of Object.entries(pageModules)) {
				try {
					const content = typeof loader === 'function' ? await loader() : loader
					const fileContent = typeof content === 'string' ? content : ''
					const parsed = matter(fileContent)
					const filename = path.split('/').pop() || ''
					const slug = filename.replace(/\.md$/, '')
					
					pages.push({
						...parsed.data as Omit<Page, 'body' | 'slug'>,
						body: parsed.content,
						slug,
					})
				} catch (error) {
					console.error(`Error loading page ${path}:`, error)
				}
			}
		}
		
		return pages.sort((a, b) => 
			new Date(b.date).getTime() - new Date(a.date).getTime()
		)
	} catch (error) {
		console.error('Error loading pages:', error)
		return []
	}
}

/**
 * Loads a single page by slug
 */
export async function loadPage(slug: string): Promise<Page | null> {
	try {
		// Try to find in manifest first
		if (contentManifest && Array.isArray(contentManifest.pages)) {
			const pageInfo = contentManifest.pages.find((p) => p.slug === slug)
			if (pageInfo) {
				const response = await fetch(`${CMS_CONTENT_BASE}/${pageInfo.path}`)
				if (response.ok) {
					const content = await response.text()
					const parsed = matter(content)
					return {
						...parsed.data as Omit<Page, 'body'>,
						body: parsed.content,
						slug,
					}
				}
			}
		}
		
		// Fallback: try import.meta.glob
		const pageEntry = Object.entries(pageModules).find(([path]) => {
			const filename = path.split('/').pop() || ''
			return filename.replace(/\.md$/, '') === slug
		})
		
		if (pageEntry) {
			const [, loader] = pageEntry
			const content = typeof loader === 'function' ? await loader() : loader
			const fileContent = typeof content === 'string' ? content : ''
			const parsed = matter(fileContent)
			
			return {
				...parsed.data as Omit<Page, 'body'>,
				body: parsed.content,
				slug,
			}
		}
		
		return null
	} catch (error) {
		console.error(`Error loading page ${slug}:`, error)
		return null
	}
}

/**
 * Loads all posts from the CMS
 */
export async function loadPosts(): Promise<Post[]> {
	try {
		const posts: Post[] = []
		
		// Use manifest if available (generated at build time)
		if (contentManifest && Array.isArray(contentManifest.posts)) {
			for (const postInfo of contentManifest.posts) {
				try {
					// Fetch the actual markdown content
					const response = await fetch(`${CMS_CONTENT_BASE}/${postInfo.path}`)
					if (!response.ok) continue
					
					const content = await response.text()
					const parsed = matter(content)
					
					posts.push({
						...parsed.data as Omit<Post, 'body' | 'slug'>,
						body: parsed.content,
						slug: postInfo.slug,
					})
				} catch (error) {
					console.error(`Error loading post ${postInfo.path}:`, error)
				}
			}
		} else {
			// Fallback: try to use import.meta.glob modules
			for (const [path, loader] of Object.entries(postModules)) {
				try {
					const content = typeof loader === 'function' ? await loader() : loader
					const fileContent = typeof content === 'string' ? content : ''
					const parsed = matter(fileContent)
					const filename = path.split('/').pop() || ''
					
					// Extract slug from filename (format: YYYY-MM-DD-slug.md)
					const slugMatch = filename.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/)
					const slug = slugMatch ? slugMatch[1] : filename.replace(/\.md$/, '')
					
					posts.push({
						...parsed.data as Omit<Post, 'body' | 'slug'>,
						body: parsed.content,
						slug,
					})
				} catch (error) {
					console.error(`Error loading post ${path}:`, error)
				}
			}
		}
		
		return posts.sort((a, b) => 
			new Date(b.date).getTime() - new Date(a.date).getTime()
		)
	} catch (error) {
		console.error('Error loading posts:', error)
		return []
	}
}

/**
 * Loads a single post by slug
 */
export async function loadPost(slug: string): Promise<Post | null> {
	try {
		// Try to find in manifest first
		if (contentManifest && Array.isArray(contentManifest.posts)) {
			const postInfo = contentManifest.posts.find((p) => p.slug === slug)
			if (postInfo) {
				const response = await fetch(`${CMS_CONTENT_BASE}/${postInfo.path}`)
				if (response.ok) {
					const content = await response.text()
					const parsed = matter(content)
					return {
						...parsed.data as Omit<Post, 'body' | 'slug'>,
						body: parsed.content,
						slug,
					}
				}
			}
		}
		
		// Fallback: try import.meta.glob
		const postEntry = Object.entries(postModules).find(([path]) => {
			const filename = path.split('/').pop() || ''
			return filename.endsWith(`-${slug}.md`)
		})
		
		if (postEntry) {
			const [, loader] = postEntry
			const content = typeof loader === 'function' ? await loader() : loader
			const fileContent = typeof content === 'string' ? content : ''
			const parsed = matter(fileContent)
			const filename = postEntry[0].split('/').pop() || ''
			const slugMatch = filename.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/)
			const extractedSlug = slugMatch ? slugMatch[1] : filename.replace(/\.md$/, '')
			
			return {
				...parsed.data as Omit<Post, 'body' | 'slug'>,
				body: parsed.content,
				slug: extractedSlug,
			}
		}
		
		return null
	} catch (error) {
		console.error(`Error loading post ${slug}:`, error)
		return null
	}
}

