import { execSync } from 'child_process'
import { copyFileSync, mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Paths
const ROOT_DIR = join(__dirname, '..', '..')
const CMS_DIR = join(ROOT_DIR, 'cms')
const CV_YAML = join(CMS_DIR, 'kmavillanosa_CV.yaml')
const RENDERCV_OUTPUT_DIR = join(CMS_DIR, 'rendercv_output')
const APP_PUBLIC_DIR = join(__dirname, '..', 'public')
const APP_PUBLIC_CV_DIR = join(APP_PUBLIC_DIR, 'cv')

// Ensure output directories exist
if (!existsSync(APP_PUBLIC_CV_DIR)) {
	mkdirSync(APP_PUBLIC_CV_DIR, { recursive: true })
}

console.log('📄 Generating CV with RenderCV...')
console.log(`   Input: ${CV_YAML}`)

try {
	// Change to CMS directory and run RenderCV
	process.chdir(CMS_DIR)
	
	// Run RenderCV render command
	// Try 'rendercv' first, fallback to 'python -m rendercv' if not found
	const commands = [
		`rendercv render "kmavillanosa_CV.yaml"`,
		`python -m rendercv render "kmavillanosa_CV.yaml"`,
		`python3 -m rendercv render "kmavillanosa_CV.yaml"`
	]
	
	let commandExecuted = false
	let lastError = null
	
	for (const command of commands) {
		try {
			console.log(`   Trying: ${command}`)
			execSync(command, {
				cwd: CMS_DIR,
				stdio: 'pipe', // Suppress output to avoid encoding issues
				encoding: 'utf-8',
				env: { ...process.env, PYTHONUNBUFFERED: '1' },
			})
			console.log('   ✅ CV generated successfully')
			commandExecuted = true
			break
		} catch (error) {
			lastError = error
			// Try next command
			continue
		}
	}
	
	if (!commandExecuted) {
		// Check if files were generated despite the error (sometimes RenderCV exits with non-zero but still generates files)
		const pdfExists = existsSync(join(RENDERCV_OUTPUT_DIR, 'kmavillanosa_CV.pdf'))
		if (!pdfExists) {
			throw new Error(`RenderCV failed to generate PDF. Tried commands: ${commands.join(', ')}. Error: ${lastError?.message || 'Unknown error'}`)
		}
		console.log('   ✅ CV generated successfully (with warnings)')
	}

	// Copy PDF to public directory
	const pdfSource = join(RENDERCV_OUTPUT_DIR, 'kmavillanosa_CV.pdf')
	const pdfDest = join(APP_PUBLIC_CV_DIR, 'kmavillanosa_CV.pdf')
	
	if (existsSync(pdfSource)) {
		copyFileSync(pdfSource, pdfDest)
		console.log(`   ✅ PDF copied to: ${pdfDest}`)
	} else {
		throw new Error(`PDF not found at ${pdfSource}`)
	}

	// Copy markdown for fallback OCR-friendly HTML generation
	const mdSource = join(RENDERCV_OUTPUT_DIR, 'kmavillanosa_CV.md')
	const mdDest = join(APP_PUBLIC_CV_DIR, 'kmavillanosa_CV.md')
	
	if (existsSync(mdSource)) {
		copyFileSync(mdSource, mdDest)
		console.log(`   ✅ Markdown copied to: ${mdDest}`)
	}

	// Copy HTML for OCR-friendly page (better than markdown conversion)
	const htmlSource = join(RENDERCV_OUTPUT_DIR, 'kmavillanosa_CV.html')
	const htmlDest = join(APP_PUBLIC_CV_DIR, 'kmavillanosa_CV.html')
	
	if (existsSync(htmlSource)) {
		copyFileSync(htmlSource, htmlDest)
		console.log(`   ✅ HTML copied to: ${htmlDest}`)
	} else {
		console.warn(`   ⚠️  HTML file not found at ${htmlSource}, will use markdown fallback`)
	}

	console.log('🎉 CV generation complete!')
} catch (error) {
	console.error('❌ Error generating CV:', error.message)
	process.exit(1)
}

