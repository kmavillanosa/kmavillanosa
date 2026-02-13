import { Link } from 'react-router-dom'
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
		<Link
			to={pageUrl}
			className="block h-full group"
		>
			<Card 
				className="h-full flex flex-col hover:shadow-md transition-shadow duration-200 cursor-pointer bg-theme-surface border-theme overflow-hidden"
			>
				{/* Card thumbnail - uniform height, prioritize iframe, then image, then link preview */}
				<div className="h-48 w-full overflow-hidden bg-theme-elevated-muted relative flex-shrink-0">
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
						<div className="h-full w-full flex flex-col items-center justify-center bg-theme-elevated-muted p-4">
							<svg className="w-10 h-10 text-theme-text-muted mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
							</svg>
							<p className="text-xs text-theme-text-secondary text-center break-all line-clamp-2">
								{previewLink.replace(/^https?:\/\//, '').replace(/\/$/, '')}
							</p>
						</div>
					) : (
						<div className="h-full w-full flex items-center justify-center">
							<svg className="w-12 h-12 text-theme-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
						</div>
					)}
				</div>
				<div className="p-4 sm:p-5 flex-1 flex flex-col">
					<h5 className="text-lg sm:text-xl font-bold tracking-tight text-theme-text-primary mb-2 line-clamp-2">
						{page.title}
					</h5>
					{page.description && (
						<p className="font-normal text-theme-text-secondary line-clamp-3 mb-3 flex-1 text-sm leading-relaxed">
							{page.description}
						</p>
					)}
					{(page.tags || page.technologies) && (
						<div className="flex flex-wrap gap-1.5 mb-3">
							{(page.tags || page.technologies || []).slice(0, 4).map((tag, index) => (
								<span
									key={index}
									className="px-2 py-0.5 text-xs font-medium rounded bg-theme-elevated-muted text-theme-text-secondary"
								>
									{tag}
								</span>
							))}
							{((page.tags || page.technologies || []).length > 4) && (
								<span className="px-2 py-0.5 text-xs font-medium rounded-md bg-theme-elevated-muted text-theme-text-muted">
									+{((page.tags || page.technologies || []).length - 4)}
								</span>
							)}
						</div>
					)}
					{page.date && (
						<div className="flex items-center gap-2 mt-auto pt-3 border-t border-theme">
							<svg className="w-4 h-4 text-theme-text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							<p className="text-xs text-theme-text-muted">
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
		</Link>
	)
}

export default PortfolioCard

