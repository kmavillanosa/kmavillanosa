import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Page } from '@/types/cms'
import { extractFirstImage, extractFirstIframe, extractFirstLink } from '@/utils/markdown-utils'

interface PortfolioCardProps {
	page: Page
}

/** Free, no-key live screenshot of a URL (cached by WordPress). */
function screenshotUrl(url: string): string {
	return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=640&h=400`
}

function PortfolioCard({ page }: PortfolioCardProps) {
	const previewIframe = extractFirstIframe(page.body)
	const previewImage = extractFirstImage(page.body)
	const previewLink = extractFirstLink(page.body)
	const detailUrl = `/portfolio/${page.slug}`
	const [shotFailed, setShotFailed] = useState(false)
	// Use a live screenshot when there's a website link but no explicit image/iframe.
	const showScreenshot = !previewIframe && !previewImage && !!previewLink && !shotFailed

	return (
		<div className="h-full flex flex-col rounded-lg bg-theme-surface border border-theme overflow-hidden card-hover">
			{/* Thumbnail links to the detail page */}
			<Link
				to={detailUrl}
				className="block h-48 w-full overflow-hidden bg-theme-elevated-muted relative flex-shrink-0 group"
				aria-label={`${page.title} details`}
			>
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
				) : showScreenshot ? (
					<img
						src={screenshotUrl(previewLink!)}
						alt={`Preview of ${page.title}`}
						loading="lazy"
						onError={() => setShotFailed(true)}
						className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
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
			</Link>

			<div className="p-4 sm:p-5 flex-1 flex flex-col">
				<Link to={detailUrl} className="group">
					<h5 className="text-lg sm:text-xl font-bold tracking-tight text-theme-text-primary mb-2 line-clamp-2 group-hover:text-theme-accent transition-colors">
						{page.title}
					</h5>
				</Link>
				{page.description && (
					<p className="font-normal text-theme-text-secondary line-clamp-3 mb-3 flex-1 text-sm leading-relaxed">
						{page.description}
					</p>
				)}
				{(page.tags || page.technologies) && (
					<div className="flex flex-wrap gap-1.5 mb-4">
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

				{/* Action buttons */}
				<div className="flex flex-wrap items-center gap-2 mt-auto">
					{previewLink && (
						<a
							href={previewLink}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-theme-accent text-theme-accent-foreground hover:bg-theme-accent-hover transition-colors"
						>
							<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
							</svg>
							Visit site
						</a>
					)}
					<Link
						to={detailUrl}
						className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-theme-muted text-theme-text-secondary hover:border-theme-accent hover:text-theme-accent transition-colors"
					>
						Details
						<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default PortfolioCard
