/**
 * Extracts the first image URL from markdown content
 * Supports both markdown image syntax: ![alt](url) and HTML img tags
 */
export function extractFirstImage(markdown: string): string | null {
	if (!markdown) return null

	// Try markdown image syntax: ![alt](url)
	const markdownImageRegex = /!\[.*?\]\((.*?)\)/g
	const markdownMatch = markdownImageRegex.exec(markdown)
	if (markdownMatch && markdownMatch[1]) {
		return markdownMatch[1]
	}

	// Try HTML img tag: <img src="url" ...>
	const htmlImageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i
	const htmlMatch = markdown.match(htmlImageRegex)
	if (htmlMatch && htmlMatch[1]) {
		return htmlMatch[1]
	}

	// Try HTML img tag without quotes
	const htmlImageRegex2 = /<img[^>]+src=([^\s>]+)/i
	const htmlMatch2 = markdown.match(htmlImageRegex2)
	if (htmlMatch2 && htmlMatch2[1]) {
		return htmlMatch2[1].replace(/["']/g, '')
	}

	return null
}

