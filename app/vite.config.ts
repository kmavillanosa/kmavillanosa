import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { execSync } from 'child_process'

// Get git commit hash for version display
function getGitCommitHash(): string {
	try {
		return execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim()
	} catch {
		return 'dev'
	}
}

// Get build timestamp
const buildTime = new Date().toISOString()

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	base: '/kmavillanosa/',
	define: {
		'import.meta.env.VITE_COMMIT_HASH': JSON.stringify(getGitCommitHash()),
		'import.meta.env.VITE_BUILD_TIME': JSON.stringify(buildTime),
	},
	build: {
		outDir: '../dist',
		emptyOutDir: true,
		copyPublicDir: true,
	},
})

