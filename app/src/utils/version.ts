// Version information injected at build time
export const VERSION = {
	commitHash: import.meta.env.VITE_COMMIT_HASH || 'dev',
	buildTime: import.meta.env.VITE_BUILD_TIME || new Date().toISOString(),
}

export function getVersionString(): string {
	const commit = VERSION.commitHash
	const buildDate = new Date(VERSION.buildTime)
	const dateStr = buildDate.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})
	return `v${commit} • ${dateStr}`
}

