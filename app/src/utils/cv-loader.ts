import { marked } from 'marked'

const CV_HTML_PATH = '/kmavillanosa/cv/kmavillanosa_CV.html'
const CV_MARKDOWN_PATH = '/kmavillanosa/cv/kmavillanosa_CV.md'
const CV_PDF_PATH = '/kmavillanosa/cv/kmavillanosa_CV.pdf'

// Configure marked for better OCR-friendly HTML output (fallback)
marked.setOptions({
	breaks: true, // Convert line breaks to <br>
	gfm: true, // GitHub Flavored Markdown
})

/**
 * Extracts article content from RenderCV HTML file
 * The content is in <article class="markdown-body"> tag
 */
function extractArticleContent(html: string): string {
	// Try to extract the article content
	const articleMatch = html.match(/<article[^>]*class="markdown-body"[^>]*>([\s\S]*?)<\/article>/i)
	if (articleMatch && articleMatch[1]) {
		return articleMatch[1].trim()
	}
	
	// Fallback: try to find any article tag
	const articleMatchFallback = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)
	if (articleMatchFallback && articleMatchFallback[1]) {
		return articleMatchFallback[1].trim()
	}
	
	// Last resort: return body content
	const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
	if (bodyMatch && bodyMatch[1]) {
		return bodyMatch[1].trim()
	}
	
	return html
}

/**
 * Loads the CV HTML file and extracts the article content
 * Falls back to markdown conversion if HTML is not available
 * This is used for the OCR-friendly page
 */
export async function loadCvMarkdown(): Promise<string> {
	try {
		// Try to load HTML file first (better OCR quality)
		try {
			const htmlResponse = await fetch(CV_HTML_PATH)
			if (htmlResponse.ok) {
				const html = await htmlResponse.text()
				const articleContent = extractArticleContent(html)
				
				// Post-process HTML for better OCR readability
				return enhanceHtmlForOcr(articleContent)
			}
		} catch (htmlError) {
			console.warn('HTML CV not available, falling back to markdown:', htmlError)
		}
		
		// Fallback to markdown conversion
		const response = await fetch(CV_MARKDOWN_PATH)
		if (!response.ok) {
			throw new Error(`Failed to load CV: ${response.status} ${response.statusText}`)
		}
		
		const markdown = await response.text()
		
		// Convert markdown to HTML
		const html = await marked.parse(markdown)
		
		// Post-process HTML for better OCR readability
		return enhanceHtmlForOcr(html)
	} catch (error) {
		console.error('Error loading CV:', error)
		throw error
	}
}

/**
 * Enhances HTML for better OCR readability and printing
 */
function enhanceHtmlForOcr(html: string): string {
	// Add inline styles for better OCR readability
	// Use explicit pixel values and high contrast for optimal OCR recognition
	let styledHtml = html
		.replace(/<h1(?![^>]*style)/gi, '<h1 style="font-size: 24px; font-weight: bold; margin-top: 24px; margin-bottom: 12px; color: #000000; page-break-after: avoid;">')
		.replace(/<h2(?![^>]*style)/gi, '<h2 style="font-size: 20px; font-weight: bold; margin-top: 20px; margin-bottom: 10px; color: #000000; page-break-after: avoid;">')
		.replace(/<h3(?![^>]*style)/gi, '<h3 style="font-size: 18px; font-weight: bold; margin-top: 16px; margin-bottom: 8px; color: #000000; page-break-after: avoid;">')
		.replace(/<p(?![^>]*style)/gi, '<p style="margin-bottom: 12px; line-height: 1.6; color: #000000; orphans: 3; widows: 3;">')
		.replace(/<ul(?![^>]*style)/gi, '<ul style="margin-bottom: 12px; padding-left: 24px; page-break-inside: avoid;">')
		.replace(/<ol(?![^>]*style)/gi, '<ol style="margin-bottom: 12px; padding-left: 24px; page-break-inside: avoid;">')
		.replace(/<li(?![^>]*style)/gi, '<li style="margin-bottom: 6px; line-height: 1.6; color: #000000;">')
		.replace(/<strong(?![^>]*style)/gi, '<strong style="font-weight: bold; color: #000000;">')
		.replace(/<a(?![^>]*style)([^>]*)href=/gi, '<a$1style="color: #0000EE; text-decoration: underline;" href=')
	
	// Ensure links have underline even when styled
	styledHtml = styledHtml.replace(/<a([^>]*)style="([^"]*)"([^>]*)href=/gi, (match, before, styles, after, href) => {
		if (!styles.includes('text-decoration')) {
			return `<a${before}style="${styles}; text-decoration: underline;"${after}href=${href}`
		}
		return match
	})

	return styledHtml
}

/**
 * Gets the path to the CV PDF file
 */
export function getCvPdfPath(): string {
	return CV_PDF_PATH
}

