import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { loadPage } from '@/utils/cms-loader'
import type { Page } from '@/types/cms'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './pages.css'

function PageView() {
	const { slug } = useParams<{ slug: string }>()
	const [page, setPage] = useState<Page | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		if (!slug) {
			setError(new Error('No slug provided'))
			setLoading(false)
			return
		}

		loadPage(slug)
			.then((pageData) => {
				console.log('Loaded page data:', pageData)
				setPage(pageData)
			})
			.catch((err) => {
				console.error('Error loading page:', err)
				setError(err)
			})
			.finally(() => setLoading(false))
	}, [slug])

	if (loading) {
		return <div className="loading">Loading page...</div>
	}

	if (error || !page) {
		return (
			<div className="error">
				<h1>Page Not Found</h1>
				<p>The page you're looking for doesn't exist.</p>
				<Link to="/">← Back to Home</Link>
			</div>
		)
	}

	if (!page.body || page.body.trim() === '') {
		return (
			<article className="page-view">
				<header className="page-header">
					<h1>{page.title}</h1>
					{page.description && (
						<p className="page-description">{page.description}</p>
					)}
				</header>
				<div className="page-body">
					<p>No content available.</p>
				</div>
			</article>
		)
	}

	return (
		<article className="page-view">
			<header className="page-header">
				<h1>{page.title}</h1>
				{page.description && (
					<p className="page-description">{page.description}</p>
				)}
			</header>

			<div className="page-body">
				{page.body ? (
					<ReactMarkdown remarkPlugins={[remarkGfm]}>
						{page.body}
					</ReactMarkdown>
				) : (
					<p>No content available.</p>
				)}
			</div>
		</article>
	)
}

export default PageView

