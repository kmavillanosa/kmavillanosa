import { execSync } from 'child_process'
import { copyFileSync, mkdirSync, existsSync, readFileSync, writeFileSync, readdirSync } from 'fs'
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
	console.log(`   Output directory: ${RENDERCV_OUTPUT_DIR}`)

try {
	// Ensure output directory exists
	if (!existsSync(RENDERCV_OUTPUT_DIR)) {
		mkdirSync(RENDERCV_OUTPUT_DIR, { recursive: true })
		console.log(`   ✅ Created output directory: ${RENDERCV_OUTPUT_DIR}`)
	}
	
	// Change to CMS directory and run RenderCV
	const originalCwd = process.cwd()
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
			console.log('   ✅ RenderCV command executed successfully')
			commandExecuted = true
			break
		} catch (error) {
			lastError = error
			// Try next command
			continue
		}
	}
	
	// Restore original working directory
	process.chdir(originalCwd)
	
	if (!commandExecuted) {
		// Check if files were generated despite the error (sometimes RenderCV exits with non-zero but still generates files)
		const pdfExists = existsSync(join(RENDERCV_OUTPUT_DIR, 'kmavillanosa_CV.pdf'))
		if (!pdfExists) {
			throw new Error(`RenderCV failed to generate PDF. Tried commands: ${commands.join(', ')}. Error: ${lastError?.message || 'Unknown error'}`)
		}
		console.log('   ✅ CV generated successfully (with warnings)')
	}
	
	// Debug: List files in output directory
	if (existsSync(RENDERCV_OUTPUT_DIR)) {
		const files = readdirSync(RENDERCV_OUTPUT_DIR)
		console.log(`   📁 Files in output directory: ${files.join(', ')}`)
	}

	// Copy PDF to public directory
	// Check multiple possible locations where RenderCV might output files
	const possiblePdfLocations = [
		join(RENDERCV_OUTPUT_DIR, 'kmavillanosa_CV.pdf'),
		join(CMS_DIR, 'kmavillanosa_CV.pdf'),
		join(CMS_DIR, 'rendercv_output', 'kmavillanosa_CV.pdf'),
	]
	
	let pdfSource = null
	for (const location of possiblePdfLocations) {
		if (existsSync(location)) {
			pdfSource = location
			console.log(`   ✅ Found PDF at: ${pdfSource}`)
			break
		}
	}
	
	if (!pdfSource) {
		// List all files in possible directories for debugging
		console.log('   🔍 Searching for PDF in:')
		for (const location of possiblePdfLocations) {
			const dir = dirname(location)
			if (existsSync(dir)) {
				const files = readdirSync(dir)
				console.log(`      ${dir}: ${files.join(', ')}`)
			} else {
				console.log(`      ${dir}: directory does not exist`)
			}
		}
		throw new Error(`PDF not found. Checked locations: ${possiblePdfLocations.join(', ')}`)
	}
	
	const pdfDest = join(APP_PUBLIC_CV_DIR, 'kmavillanosa_CV.pdf')
	copyFileSync(pdfSource, pdfDest)
	console.log(`   ✅ PDF copied to: ${pdfDest}`)

	// Copy markdown for fallback OCR-friendly HTML generation
	const possibleMdLocations = [
		join(RENDERCV_OUTPUT_DIR, 'kmavillanosa_CV.md'),
		join(CMS_DIR, 'kmavillanosa_CV.md'),
		join(CMS_DIR, 'rendercv_output', 'kmavillanosa_CV.md'),
	]
	
	let mdSource = null
	for (const location of possibleMdLocations) {
		if (existsSync(location)) {
			mdSource = location
			break
		}
	}
	
	if (mdSource) {
		const mdDest = join(APP_PUBLIC_CV_DIR, 'kmavillanosa_CV.md')
		copyFileSync(mdSource, mdDest)
		console.log(`   ✅ Markdown copied to: ${mdDest}`)
	}

	// Copy HTML for OCR-friendly page (better than markdown conversion)
	const possibleHtmlLocations = [
		join(RENDERCV_OUTPUT_DIR, 'kmavillanosa_CV.html'),
		join(CMS_DIR, 'kmavillanosa_CV.html'),
		join(CMS_DIR, 'rendercv_output', 'kmavillanosa_CV.html'),
	]
	
	let htmlSource = null
	for (const location of possibleHtmlLocations) {
		if (existsSync(location)) {
			htmlSource = location
			break
		}
	}
	
	if (htmlSource) {
		const htmlDest = join(APP_PUBLIC_CV_DIR, 'kmavillanosa_CV.html')
		copyFileSync(htmlSource, htmlDest)
		console.log(`   ✅ HTML copied to: ${htmlDest}`)
	} else {
		console.warn(`   ⚠️  HTML file not found, will use markdown fallback`)
	}

	console.log('🎉 CV generation complete!')
} catch (error) {
	console.error('❌ Error generating CV:', error.message)
	process.exit(1)
}

