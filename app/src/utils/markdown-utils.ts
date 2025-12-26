/**
 * Extracts the first iframe from markdown content
 */
export function extractFirstIframe(markdown: string): { src: string; height?: string; width?: string } | null {
	if (!markdown) return null

	// Try HTML iframe tag: <iframe src="url" ...>
	const iframeRegex = /<iframe[^>]+src=["']([^"']+)["'][^>]*(?:height=["']?([^"'\s>]+)["']?)?[^>]*(?:width=["']?([^"'\s>]+)["']?)?[^>]*>/i
	const iframeMatch = markdown.match(iframeRegex)
	if (iframeMatch && iframeMatch[1]) {
		return {
			src: iframeMatch[1],
			height: iframeMatch[2] || undefined,
			width: iframeMatch[3] || undefined,
		}
	}

	// Try iframe without quotes
	const iframeRegex2 = /<iframe[^>]+src=([^\s>]+)[^>]*>/i
	const iframeMatch2 = markdown.match(iframeRegex2)
	if (iframeMatch2 && iframeMatch2[1]) {
		return {
			src: iframeMatch2[1].replace(/["']/g, ''),
		}
	}

	return null
}

/**
 * Extracts the first URL/link from markdown content
 * Supports markdown links [text](url) and plain URLs
 */
export function extractFirstLink(markdown: string): string | null {
	if (!markdown) return null

	// Try markdown link syntax: [text](url)
	const markdownLinkRegex = /\[.*?\]\((https?:\/\/[^\s\)]+)\)/i
	const markdownLinkMatch = markdown.match(markdownLinkRegex)
	if (markdownLinkMatch && markdownLinkMatch[1]) {
		return markdownLinkMatch[1]
	}

	// Try plain URL (http:// or https://)
	const urlRegex = /(https?:\/\/[^\s<>"']+)/i
	const urlMatch = markdown.match(urlRegex)
	if (urlMatch && urlMatch[1]) {
		return urlMatch[1]
	}

	return null
}

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

