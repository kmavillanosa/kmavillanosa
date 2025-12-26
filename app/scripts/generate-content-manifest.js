import { readdir, readFile, writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const CMS_CONTENT_DIR = join(__dirname, '..', '..', 'cms', 'content')
const OUTPUT_FILE = join(__dirname, '..', 'src', 'content-manifest.json')

async function generateManifest() {
	const manifest = {
		pages: [],
		posts: [],
		settings: null,
	}

	try {
		// Load site settings
		const settingsPath = join(CMS_CONTENT_DIR, 'settings', 'site.json')
		const settingsContent = await readFile(settingsPath, 'utf-8')
		manifest.settings = JSON.parse(settingsContent)
	} catch (error) {
		console.warn('Could not load site settings:', error.message)
	}

	try {
		// Load pages
		const pagesDir = join(CMS_CONTENT_DIR, 'pages')
		const pageFiles = await readdir(pagesDir)
		
		for (const file of pageFiles) {
			if (!file.endsWith('.md')) continue
			
			const filePath = join(pagesDir, file)
			const content = await readFile(filePath, 'utf-8')
			const parsed = matter(content)
			const slug = file.replace(/\.md$/, '')
			
			manifest.pages.push({
				slug,
				path: `pages/${file}`,
				frontMatter: parsed.data,
			})
		}
	} catch (error) {
		console.warn('Could not load pages:', error.message)
	}

	try {
		// Load posts
		const postsDir = join(CMS_CONTENT_DIR, 'posts')
		const postFiles = await readdir(postsDir)
		
		for (const file of postFiles) {
			if (!file.endsWith('.md')) continue
			
			const filePath = join(postsDir, file)
			const content = await readFile(filePath, 'utf-8')
			const parsed = matter(content)
			
			// Extract slug from filename (format: YYYY-MM-DD-slug.md)
			const slugMatch = file.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/)
			const slug = slugMatch ? slugMatch[1] : file.replace(/\.md$/, '')
			
			manifest.posts.push({
				slug,
				path: `posts/${file}`,
				frontMatter: parsed.data,
			})
		}
	} catch (error) {
		console.warn('Could not load posts:', error.message)
	}

	await writeFile(OUTPUT_FILE, JSON.stringify(manifest, null, 2), 'utf-8')
	console.log('Content manifest generated successfully')
}

generateManifest().catch(console.error)

