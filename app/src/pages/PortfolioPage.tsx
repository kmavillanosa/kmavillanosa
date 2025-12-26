import { usePages } from '@/hooks/usePages'
import { extractFirstImage } from '@/utils/markdown-utils'
import './portfolio-page.css'
import './pages.css'

function PortfolioPage() {
	const { data: pages, loading, error } = usePages()

	if (loading) {
		return <div className="loading">Loading portfolio...</div>
	}

	if (error) {
		return <div className="error">Error loading portfolio: {error.message}</div>
	}

	return (
		<div className="portfolio-page">
			<header className="portfolio-header">
				<h1>My Work</h1>
				<p className="portfolio-subtitle">A collection of projects and work I've done</p>
			</header>

			{pages.length === 0 ? (
				<div className="empty-state">
					<p>No portfolio items yet. Check back soon!</p>
				</div>
			) : (
				<div className="portfolio-grid">
					{pages.map((page) => {
						const previewImage = extractFirstImage(page.body)
						
						return (
							<a
								key={page.slug}
								href={`/kmavillanosa/portfolio/${page.slug}`}
								target="_blank"
								rel="noopener noreferrer"
								className="portfolio-item-link"
							>
								<article className="portfolio-item">
									{previewImage && (
										<div className="portfolio-image-wrapper">
											<img 
												src={previewImage} 
												alt={page.title}
												className="portfolio-preview-image"
											/>
										</div>
									)}
									<div className="portfolio-item-content">
										<h2>{page.title}</h2>
										{page.description && (
											<p className="portfolio-description">{page.description}</p>
										)}
										<div className="portfolio-meta">
											{page.date && (
												<span className="portfolio-date">
													{new Date(page.date).toLocaleDateString('en-US', {
														year: 'numeric',
														month: 'long',
														day: 'numeric',
													})}
												</span>
											)}
										</div>
									</div>
								</article>
							</a>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default PortfolioPage

