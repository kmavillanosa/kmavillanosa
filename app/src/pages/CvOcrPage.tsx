import { useEffect, useState } from 'react'
import { loadCvMarkdown } from '@/utils/cv-loader'
import { Spinner } from 'flowbite-react'

/**
 * OCR-friendly CV page optimized for printing and text extraction
 * Uses simple HTML structure without complex styling for better OCR accuracy
 */
function CvOcrPage() {
	const [cvContent, setCvContent] = useState<string>('')
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		loadCvMarkdown()
			.then((content) => {
				setCvContent(content)
				setLoading(false)
			})
			.catch((err) => {
				console.error('Error loading CV:', err)
				setError(err instanceof Error ? err.message : 'Failed to load CV')
				setLoading(false)
			})
	}, [])

	// Print-friendly styles for OCR
	useEffect(() => {
		// Add print styles optimized for OCR and printing
		const style = document.createElement('style')
		style.textContent = `
			@media print {
				@page {
					margin: 1in;
					size: letter;
				}
				body {
					margin: 0;
					padding: 0;
					background: white !important;
				}
				.cv-container {
					padding: 0 !important;
					margin: 0 !important;
					max-width: 100% !important;
					background: white !important;
				}
				.no-print {
					display: none !important;
				}
				.cv-content {
					font-size: 12pt !important;
					line-height: 1.6 !important;
					color: #000000 !important;
					background: white !important;
				}
				.cv-content h1,
				.cv-content h2,
				.cv-content h3 {
					color: #000000 !important;
					page-break-after: avoid;
				}
				.cv-content p,
				.cv-content li {
					color: #000000 !important;
					orphans: 3;
					widows: 3;
				}
				.cv-content ul,
				.cv-content ol {
					page-break-inside: avoid;
				}
				.cv-content a {
					color: #000000 !important;
					text-decoration: underline !important;
				}
			}
		`
		document.head.appendChild(style)

		return () => {
			if (document.head.contains(style)) {
				document.head.removeChild(style)
			}
		}
	}, [])

	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[400px]">
				<Spinner size="xl" />
				<p className="mt-4 text-gray-600">Loading CV...</p>
			</div>
		)
	}

	if (error) {
		return (
			<div className="max-w-4xl mx-auto px-4 py-8">
				<div className="bg-red-50 border border-red-200 rounded-lg p-4">
					<h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading CV</h2>
					<p className="text-red-600">{error}</p>
				</div>
			</div>
		)
	}

	return (
		<div className="cv-container max-w-4xl mx-auto px-4 py-8 bg-white">
			{/* Print button - hidden when printing */}
			<div className="no-print mb-4 flex justify-end gap-2">
				<a
					href="/kmavillanosa/cv/Kim_Cyriel_S._Avillanosa_CV.pdf"
					target="_blank"
					rel="noopener noreferrer"
					className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
				>
					Download PDF
				</a>
				<button
					onClick={() => window.print()}
					className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
				>
					Print CV
				</button>
			</div>

			{/* OCR-optimized CV content */}
			<article
				className="cv-content"
				dangerouslySetInnerHTML={{ __html: cvContent }}
				style={{
					// OCR-friendly styling
					fontFamily: 'Arial, Helvetica, sans-serif',
					fontSize: '14px',
					lineHeight: '1.6',
					color: '#000000',
					background: '#ffffff',
				}}
			/>
		</div>
	)
}

export default CvOcrPage

