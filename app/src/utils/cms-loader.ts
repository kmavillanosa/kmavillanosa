import type { Page, Post, SiteSettings, Experience, Services, Skills, Stats } from '@/types/cms'
import type { ContentManifest } from '@/types/content-manifest'
import contentManifestJson from '../content-manifest.json'
import { parseFrontmatter } from './frontmatter-parser'

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
			theme: {
				primaryColor: 'green',
				secondaryColor: 'emerald',
				accentColor: 'teal',
			},
		}
	}
}

/**
 * Loads services from the CMS
 */
export async function loadServices(): Promise<Services> {
	try {
		const response = await fetch(`${CMS_CONTENT_BASE}/settings/services.json`)
		if (!response.ok) {
			throw new Error('Failed to load services')
		}
		return await response.json()
	} catch (error) {
		console.error('Error loading services:', error)
		return {
			services: [
				'Front-end Development',
				'Back-end Development',
				'Desktop Applications Development',
				'Web Scraping and other automation',
				'Mobile Development',
				'Workflow Automations',
			],
		}
	}
}

/**
 * Loads skills from the CMS
 */
export async function loadSkills(): Promise<Skills> {
	try {
		const response = await fetch(`${CMS_CONTENT_BASE}/settings/skills.json`)
		if (!response.ok) {
			throw new Error('Failed to load skills')
		}
		return await response.json()
	} catch (error) {
		console.error('Error loading skills:', error)
		return {
			skills: [],
			categoryColors: {},
		}
	}
}

/**
 * Loads stats from the CMS
 */
export async function loadStats(): Promise<Stats> {
	try {
		const response = await fetch(`${CMS_CONTENT_BASE}/settings/stats.json`)
		if (!response.ok) {
			throw new Error('Failed to load stats')
		}
		return await response.json()
	} catch (error) {
		console.error('Error loading stats:', error)
		return {
			stats: [],
		}
	}
}

/**
 * Loads all pages from the CMS
 * Uses content manifest for metadata and fetches content at runtime
 * Also tries to load pages directly if manifest is incomplete
 */
export async function loadPages(): Promise<Page[]> {
	try {
		const pages: Page[] = []
		const loadedSlugs = new Set<string>()
		
		// Use manifest if available (generated at build time)
		if (contentManifest && Array.isArray(contentManifest.pages)) {
			for (const pageInfo of contentManifest.pages) {
				try {
					// Fetch the actual markdown content
					const response = await fetch(`${CMS_CONTENT_BASE}/${pageInfo.path}`)
					if (!response.ok) continue
					
					const content = await response.text()
					const parsed = parseFrontmatter(content)
					
					pages.push({
						...parsed.data as Omit<Page, 'body' | 'slug'>,
						body: parsed.content,
						slug: pageInfo.slug,
					})
					loadedSlugs.add(pageInfo.slug)
				} catch (error) {
					console.error(`Error loading page ${pageInfo.path}:`, error)
				}
			}
		}
		
		// Try to use import.meta.glob modules (for build-time bundled content)
		for (const [path, loader] of Object.entries(pageModules)) {
			try {
				const filename = path.split('/').pop() || ''
				const slug = filename.replace(/\.md$/, '')
				
				// Skip if already loaded from manifest
				if (loadedSlugs.has(slug)) continue
				
				const content = typeof loader === 'function' ? await loader() : loader
				const fileContent = typeof content === 'string' ? content : ''
				const parsed = parseFrontmatter(fileContent)
				
				pages.push({
					...parsed.data as Omit<Page, 'body' | 'slug'>,
					body: parsed.content,
					slug,
				})
				loadedSlugs.add(slug)
			} catch (error) {
				console.error(`Error loading page ${path}:`, error)
			}
		}
		
		// Note: We can't dynamically discover new pages from CMS without directory listing
		// New pages will work via loadPage() but won't appear in the list until rebuild
		// This is a limitation of static hosting - the manifest needs to be regenerated
		
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
					const parsed = parseFrontmatter(content)
					return {
						...parsed.data as Omit<Page, 'body'>,
						body: parsed.content,
						slug,
					}
				}
			}
		}
		
		// Fallback: try to fetch directly (for new content not in manifest)
		// This allows CMS-created content to work without rebuilding
		const directUrl = `${CMS_CONTENT_BASE}/pages/${slug}.md`
		console.log('Trying direct fetch from:', directUrl)
		const directResponse = await fetch(directUrl)
		if (directResponse.ok) {
			const content = await directResponse.text()
			const parsed = parseFrontmatter(content)
			
			// Ensure we have a valid body
			const body = parsed.content || ''
			
			console.log('Direct fetch - parsed content:', {
				frontMatter: parsed.data,
				bodyLength: body.length,
				bodyPreview: body.substring(0, 100),
				hasBody: body.length > 0,
			})
			
			return {
				...parsed.data as Omit<Page, 'body'>,
				body: body.trim(),
				slug,
			}
		} else {
			console.warn(`Direct fetch failed: ${directResponse.status} ${directResponse.statusText}`)
		}
		
		// Fallback: try import.meta.glob (for build-time bundled content)
		const pageEntry = Object.entries(pageModules).find(([path]) => {
			const filename = path.split('/').pop() || ''
			return filename.replace(/\.md$/, '') === slug
		})
		
		if (pageEntry) {
			const [, loader] = pageEntry
			const content = typeof loader === 'function' ? await loader() : loader
			const fileContent = typeof content === 'string' ? content : ''
			const parsed = parseFrontmatter(fileContent)
			
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
					const parsed = parseFrontmatter(content)
					
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
					const parsed = parseFrontmatter(fileContent)
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
					const parsed = parseFrontmatter(content)
					return {
						...parsed.data as Omit<Post, 'body' | 'slug'>,
						body: parsed.content,
						slug,
					}
				}
			}
		}
		
		// Fallback: try to fetch directly by searching for files matching the slug pattern
		// Posts are named YYYY-MM-DD-slug.md, so we need to try common date patterns
		// This is a workaround - ideally the manifest would be up to date
		const currentYear = new Date().getFullYear()
		const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
		
		// Try current year and previous year
		for (const year of [currentYear, currentYear - 1]) {
			for (const month of months) {
				for (let day = 1; day <= 31; day++) {
					const dayStr = day.toString().padStart(2, '0')
					const filename = `${year}-${month}-${dayStr}-${slug}.md`
					
					try {
						const response = await fetch(`${CMS_CONTENT_BASE}/posts/${filename}`)
						if (response.ok) {
							const content = await response.text()
							const parsed = parseFrontmatter(content)
							return {
								...parsed.data as Omit<Post, 'body' | 'slug'>,
								body: parsed.content,
								slug,
							}
						}
					} catch {
						// Continue searching
					}
				}
			}
		}
		
		// Fallback: try import.meta.glob (for build-time bundled content)
		const postEntry = Object.entries(postModules).find(([path]) => {
			const filename = path.split('/').pop() || ''
			return filename.endsWith(`-${slug}.md`)
		})
		
		if (postEntry) {
			const [, loader] = postEntry
			const content = typeof loader === 'function' ? await loader() : loader
			const fileContent = typeof content === 'string' ? content : ''
			const parsed = parseFrontmatter(fileContent)
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

/**
 * Loads all experiences from the CMS
 * Experiences are stored as markdown files with frontmatter
 */
export async function loadExperiences(): Promise<Experience[]> {
	try {
		const experiences: Experience[] = []
		
		// Try to use import.meta.glob for build-time content loading
		let experienceModules: Record<string, () => Promise<string>> | Record<string, string> = {}
		
		try {
			const globExperiences = import.meta.glob('../../../../cms/content/experiences/*.md', {
				eager: false,
				as: 'raw',
			})
			experienceModules = globExperiences
		} catch {
			// Fallback: will use fetch API at runtime
		}
		
		// Try to use import.meta.glob modules (for build-time bundled content)
		for (const [path, loader] of Object.entries(experienceModules)) {
			try {
				const content = typeof loader === 'function' ? await loader() : loader
				const fileContent = typeof content === 'string' ? content : ''
				const parsed = parseFrontmatter(fileContent)
				const filename = path.split('/').pop() || ''
				const slug = filename.replace(/\.md$/, '')
				
				const experienceData = parsed.data as Omit<Experience, 'slug'>
				// Ensure responsibilities is always an array
				if (!Array.isArray(experienceData.responsibilities)) {
					experienceData.responsibilities = []
				}
				
				experiences.push({
					...experienceData,
					slug,
				})
			} catch (error) {
				console.error(`Error loading experience ${path}:`, error)
			}
		}
		
		// Fallback: try to fetch directly from CMS
		// Since we don't have a manifest for experiences, we'll try common filenames
		// or fetch a directory listing if available
		const commonSlugs = ['cabinets-by-computer', 'amihan-solutions', 'palawan-group', 'yondu', 'palawan-express', 'ipp', 'city-government-puerto-princesa']
		
		for (const slug of commonSlugs) {
			try {
				// Check if already loaded
				if (experiences.some(exp => exp.slug === slug)) continue
				
				const response = await fetch(`${CMS_CONTENT_BASE}/experiences/${slug}.md`)
				if (response.ok) {
					const content = await response.text()
					const parsed = parseFrontmatter(content)
					
					const experienceData = parsed.data as Omit<Experience, 'slug'>
					// Ensure responsibilities is always an array
					if (!Array.isArray(experienceData.responsibilities)) {
						experienceData.responsibilities = []
					}
					
					experiences.push({
						...experienceData,
						slug,
					})
				}
			} catch (error) {
				console.error(`Error loading experience ${slug}:`, error)
			}
		}
		
		// Sort by period (most recent first) - simple string comparison for now
		return experiences.sort((a, b) => {
			// Extract year from period string for sorting
			const getYear = (period: string) => {
				const match = period.match(/\d{4}/)
				return match ? parseInt(match[0], 10) : 0
			}
			return getYear(b.period) - getYear(a.period)
		})
	} catch (error) {
		console.error('Error loading experiences:', error)
		return []
	}
}

/**
 * Loads a single experience by slug
 */
export async function loadExperience(slug: string): Promise<Experience | null> {
	try {
		console.log('Loading experience with slug:', slug)
		
		// Try to use import.meta.glob for build-time content loading
		let experienceModules: Record<string, () => Promise<string>> | Record<string, string> = {}
		
		try {
			const globExperiences = import.meta.glob('../../../../cms/content/experiences/*.md', {
				eager: false,
				as: 'raw',
			})
			experienceModules = globExperiences
			console.log('Found experience modules:', Object.keys(experienceModules))
		} catch (error) {
			console.log('Could not use import.meta.glob, will use fetch:', error)
			// Fallback: will use fetch API at runtime
		}
		
		// Try to find in import.meta.glob modules first
		const experienceEntry = Object.entries(experienceModules).find(([path]) => {
			const filename = path.split('/').pop() || ''
			const fileSlug = filename.replace(/\.md$/, '')
			console.log('Checking file:', filename, 'slug:', fileSlug, 'matches:', fileSlug === slug)
			return fileSlug === slug
		})
		
		if (experienceEntry) {
			console.log('Found experience in modules:', experienceEntry[0])
			const [, loader] = experienceEntry
			const content = typeof loader === 'function' ? await loader() : loader
			const fileContent = typeof content === 'string' ? content : ''
			const parsed = parseFrontmatter(fileContent)
			
			const experienceData = parsed.data as Omit<Experience, 'slug'>
			// Ensure responsibilities is always an array
			if (!Array.isArray(experienceData.responsibilities)) {
				experienceData.responsibilities = []
			}
			
			return {
				...experienceData,
				slug,
			}
		}
		
		// Fallback: try to fetch directly from CMS
		const fetchUrl = `${CMS_CONTENT_BASE}/experiences/${slug}.md`
		console.log('Trying to fetch from:', fetchUrl)
		const response = await fetch(fetchUrl)
		console.log('Fetch response status:', response.status, response.ok)
		
		if (response.ok) {
			const content = await response.text()
			const parsed = parseFrontmatter(content)
			
			const experienceData = parsed.data as Omit<Experience, 'slug'>
			// Ensure responsibilities is always an array
			if (!Array.isArray(experienceData.responsibilities)) {
				experienceData.responsibilities = []
			}
			
			return {
				...experienceData,
				slug,
			}
		} else {
			console.error(`Failed to fetch experience: ${response.status} ${response.statusText}`)
		}
		
		return null
	} catch (error) {
		console.error(`Error loading experience ${slug}:`, error)
		return null
	}
}

