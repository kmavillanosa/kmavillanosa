import { useState } from 'react'
import { Card } from 'flowbite-react'
import type { Page } from '@/types/cms'
import { extractFirstImage } from '@/utils/markdown-utils'

interface PortfolioCardProps {
	page: Page
}

function PortfolioCard({ page }: PortfolioCardProps) {
	const [showPreview, setShowPreview] = useState(false)
	const previewImage = extractFirstImage(page.body)
	const pageUrl = `/kmavillanosa/portfolio/${page.slug}`

	return (
		<div
			className="relative block h-full group"
			onMouseEnter={() => setShowPreview(true)}
			onMouseLeave={() => setShowPreview(false)}
		>
			<a
				href={pageUrl}
				target="_blank"
				rel="noopener noreferrer"
				className="block h-full"
			>
				<Card 
					className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 bg-white border-gray-200 overflow-visible"
				>
					{/* Preview overlay with iframe - appears above card */}
					{showPreview && (
						<div 
							className="absolute -top-2 left-0 right-0 z-50 bg-white rounded-lg shadow-2xl border border-gray-300 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
							style={{ 
								height: '400px',
								transform: 'translateY(-100%)',
								marginBottom: '8px'
							}}
						>
							<div className="w-full h-full relative">
								<div className="absolute top-2 right-2 z-10 bg-gray-100 rounded px-2 py-1 text-xs text-gray-600">
									Live Preview
								</div>
								<iframe
									src={pageUrl}
									className="w-full h-full border-0"
									title={`Preview of ${page.title}`}
									loading="lazy"
									sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
									style={{ pointerEvents: 'none' }}
								/>
							</div>
						</div>
					)}

					{/* Card content */}
					{previewImage ? (
						<div className="h-48 w-full overflow-hidden bg-gray-100 relative">
							<img 
								src={previewImage} 
								alt={page.title}
								className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
							/>
						</div>
					) : (
						<div className="h-48 w-full bg-gray-100 flex items-center justify-center">
							<svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
						</div>
					)}
					<div className="p-5">
						<h5 className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
							{page.title}
						</h5>
						{page.description && (
							<p className="font-normal text-gray-600 line-clamp-3 mb-3">
								{page.description}
							</p>
						)}
						{page.date && (
							<div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-200">
								<svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
								<p className="text-sm text-gray-500">
									{new Date(page.date).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</p>
							</div>
						)}
					</div>
				</Card>
			</a>
		</div>
	)
}

export default PortfolioCard

