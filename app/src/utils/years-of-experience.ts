const DEFAULT_START_YEAR = 2016

/**
 * Returns years of experience from a start year to the current year.
 * Used for stats and SEO copy so the number stays correct without hardcoding.
 */
export function getYearsOfExperience(since?: number): number {
	const start = since ?? DEFAULT_START_YEAR
	return Math.max(0, new Date().getFullYear() - start)
}

const YEARS_PLACEHOLDER = '{{years}}'

/**
 * Replaces {{years}} in a string with the computed years of experience.
 */
export function replaceYearsPlaceholder(
	text: string,
	experienceSince?: number
): string {
	if (!text || !text.includes(YEARS_PLACEHOLDER)) return text
	const years = getYearsOfExperience(experienceSince)
	return text.replace(/\{\{years\}\}/g, String(years))
}
