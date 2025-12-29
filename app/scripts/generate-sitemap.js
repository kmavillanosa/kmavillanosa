import { readdir, readFile, writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const BASE_URL = 'https://kmavillanosa.github.io/kmavillanosa'
const CMS_CONTENT_DIR = join(__dirname, '..', '..', 'cms', 'content')

async function generateSitemap() {
	// Static routes
	const staticRoutes = [
		{ url: '', changefreq: 'weekly', priority: 1.0 },
		{ url: '/portfolio', changefreq: 'weekly', priority: 0.9 },
		{ url: '/slides', changefreq: 'monthly', priority: 0.7 },
		{ url: '/contact', changefreq: 'monthly', priority: 0.8 },
	]

	// Get all page files
	const pageRoutes = []
	try {
		const pagesDir = join(CMS_CONTENT_DIR, 'pages')
		const pageFiles = await readdir(pagesDir)
		
		for (const file of pageFiles) {
			if (!file.endsWith('.md')) continue
			const slug = file.replace(/\.md$/, '')
			pageRoutes.push({
				url: `/portfolio/${slug}`,
				changefreq: 'monthly',
				priority: 0.8,
			})
		}
	} catch (error) {
		console.warn('Could not load pages:', error.message)
	}

	// Get all experience files
	const experienceRoutes = []
	try {
		const experiencesDir = join(CMS_CONTENT_DIR, 'experiences')
		const experienceFiles = await readdir(experiencesDir)
		
		for (const file of experienceFiles) {
			if (!file.endsWith('.md')) continue
			const slug = file.replace(/\.md$/, '')
			experienceRoutes.push({
				url: `/experience/${slug}`,
				changefreq: 'monthly',
				priority: 0.7,
			})
		}
	} catch (error) {
		console.warn('Could not load experiences:', error.message)
	}

	// Combine all routes
	const allRoutes = [...staticRoutes, ...pageRoutes, ...experienceRoutes]

	// Generate sitemap XML
	const currentDate = new Date().toISOString().split('T')[0]

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allRoutes
	.map(
		(route) => `  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`

	// Write sitemap to public directory
	const sitemapPath = join(__dirname, '../public/sitemap.xml')
	await writeFile(sitemapPath, sitemap, 'utf-8')

	console.log(`✅ Generated sitemap.xml with ${allRoutes.length} URLs`)
	console.log(`   Location: ${sitemapPath}`)
}

generateSitemap().catch(console.error)

