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
 * Handles basic key-value pairs, simple types, and arrays
 */
function parseYAML(yaml: string): Record<string, unknown> {
	const result: Record<string, unknown> = {}
	const lines = yaml.split('\n')
	let i = 0
	
	while (i < lines.length) {
		const line = lines[i]
		const trimmed = line.trim()
		
		// Skip empty lines and comments
		if (!trimmed || trimmed.startsWith('#')) {
			i++
			continue
		}
		
		const colonIndex = trimmed.indexOf(':')
		if (colonIndex === -1) {
			i++
			continue
		}
		
		const key = trimmed.substring(0, colonIndex).trim()
		const valueStr = trimmed.substring(colonIndex + 1).trim()
		
		// Check if this is the start of an array (value is empty and next line starts with -)
		if (valueStr === '' && i + 1 < lines.length) {
			const nextLineTrimmed = lines[i + 1].trim()
			if (nextLineTrimmed.startsWith('-')) {
				// Parse array
				const array: string[] = []
				i++ // Move to first array item
				
				while (i < lines.length) {
					const currentLine = lines[i]
					const arrayLineTrimmed = currentLine.trim()
					
					// Check if this line is an array item (starts with -) or is indented (part of array)
					if (arrayLineTrimmed.startsWith('-')) {
						// Extract value after the dash
						const itemValue = arrayLineTrimmed.substring(1).trim()
						// Remove quotes if present
						if ((itemValue.startsWith('"') && itemValue.endsWith('"')) ||
							(itemValue.startsWith("'") && itemValue.endsWith("'"))) {
							array.push(itemValue.slice(1, -1))
						} else {
							array.push(itemValue)
						}
						i++
					} else if (arrayLineTrimmed === '' || arrayLineTrimmed.startsWith('#')) {
						// Empty line or comment, continue
						i++
					} else if (arrayLineTrimmed.includes(':') && !currentLine.match(/^\s+/)) {
						// Next key-value pair (not indented), stop parsing array
						break
					} else {
						// Indented line that's not an array item, skip it
						i++
					}
				}
				
				result[key] = array
				continue
			}
		}
		
		// Regular key-value pair
		let value: unknown = valueStr
		
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
		i++
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

