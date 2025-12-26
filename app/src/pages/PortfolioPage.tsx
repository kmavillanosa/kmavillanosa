import { usePages } from '@/hooks/usePages'
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
					{pages.map((page) => (
						<article key={page.slug} className="portfolio-item">
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
						</article>
					))}
				</div>
			)}
		</div>
	)
}

export default PortfolioPage

