/**
 * Browser-compatible frontmatter parser
 * Parses YAML frontmatter from markdown files
 */

interface ParsedContent {
	data: Record<string, unknown>
	content: string
}

/**
 * Simple YAML frontmatter parser for browser
 * Handles basic key-value pairs and simple types
 */
function parseYAML(yaml: string): Record<string, unknown> {
	const result: Record<string, unknown> = {}
	const lines = yaml.split('\n')
	
	for (const line of lines) {
		const trimmed = line.trim()
		if (!trimmed || trimmed.startsWith('#')) continue
		
		const colonIndex = trimmed.indexOf(':')
		if (colonIndex === -1) continue
		
		const key = trimmed.substring(0, colonIndex).trim()
		let value: unknown = trimmed.substring(colonIndex + 1).trim()
		
		// Remove quotes if present
		if (typeof value === 'string') {
			if ((value.startsWith('"') && value.endsWith('"')) ||
				(value.startsWith("'") && value.endsWith("'"))) {
				value = value.slice(1, -1)
			}
		}
		
		// Try to parse as number or boolean
		if (typeof value === 'string') {
			if (value === 'true') value = true
			else if (value === 'false') value = false
			else if (value === 'null') value = null
			else if (/^-?\d+$/.test(value)) value = parseInt(value, 10)
			else if (/^-?\d*\.\d+$/.test(value)) value = parseFloat(value)
		}
		
		result[key] = value
	}
	
	return result
}

/**
 * Parses frontmatter from markdown content
 * Returns the frontmatter data and the content body
 */
export function parseFrontmatter(content: string): ParsedContent {
	// Check if content starts with frontmatter delimiter
	if (!content.startsWith('---')) {
		return {
			data: {},
			content: content.trim(),
		}
	}
	
	// Find the closing delimiter
	const endIndex = content.indexOf('\n---', 3)
	if (endIndex === -1) {
		return {
			data: {},
			content: content.trim(),
		}
	}
	
	// Extract frontmatter and content
	const frontmatter = content.substring(3, endIndex).trim()
	const body = content.substring(endIndex + 4).trim()
	
	return {
		data: parseYAML(frontmatter),
		content: body,
	}
}

