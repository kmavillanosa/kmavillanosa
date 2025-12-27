import { Card } from 'flowbite-react'
import type { Page } from '@/types/cms'
import { extractFirstImage, extractFirstIframe, extractFirstLink } from '@/utils/markdown-utils'

interface PortfolioCardProps {
	page: Page
}

function PortfolioCard({ page }: PortfolioCardProps) {
	const previewIframe = extractFirstIframe(page.body)
	const previewImage = extractFirstImage(page.body)
	const previewLink = extractFirstLink(page.body)
	const pageUrl = `/portfolio/${page.slug}`

	return (
		<a
			href={pageUrl}
			target="_blank"
			rel="noopener noreferrer"
			className="block h-full group"
		>
			<Card 
				className="h-full flex flex-col hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden"
			>
				{/* Card thumbnail - uniform height, prioritize iframe, then image, then link preview */}
				<div className="h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-700 relative flex-shrink-0">
					{previewIframe ? (
						<iframe
							src={previewIframe.src}
							className="w-full h-full border-0 pointer-events-none"
							title={`Preview of ${page.title}`}
							loading="lazy"
							sandbox="allow-same-origin allow-scripts"
							style={{
								transform: 'scale(0.5)',
								transformOrigin: 'top left',
								width: '200%',
								height: '200%',
							}}
						/>
					) : previewImage ? (
						<img 
							src={previewImage} 
							alt={page.title}
							className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
						/>
					) : previewLink ? (
						<div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-4">
							<svg className="w-12 h-12 text-green-500 dark:text-green-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
							</svg>
							<p className="text-xs text-gray-600 dark:text-gray-300 text-center break-all line-clamp-2">
								{previewLink.replace(/^https?:\/\//, '').replace(/\/$/, '')}
							</p>
						</div>
					) : (
						<div className="h-full w-full flex items-center justify-center">
							<svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
						</div>
					)}
				</div>
				<div className="p-5 flex-1 flex flex-col">
					<h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-2 line-clamp-2">
						{page.title}
					</h5>
					{page.description && (
						<p className="font-normal text-gray-600 dark:text-gray-400 line-clamp-3 mb-3 flex-1 text-sm">
							{page.description}
						</p>
					)}
					{page.date && (
						<div className="flex items-center gap-2 mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
							<svg className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								{new Date(page.date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'short',
									day: 'numeric',
								})}
							</p>
						</div>
					)}
				</div>
			</Card>
		</a>
	)
}

export default PortfolioCard

