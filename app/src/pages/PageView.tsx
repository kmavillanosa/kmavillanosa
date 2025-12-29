import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { loadPage } from '@/utils/cms-loader'
import type { Page } from '@/types/cms'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Spinner, Alert, Button } from 'flowbite-react'
import SEOHead from '@/components/seo/SEOHead'

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

		console.log('Loading page with slug:', slug)
		loadPage(slug)
			.then((pageData) => {
				console.log('Loaded page data:', pageData)
				if (!pageData) {
					setError(new Error(`Page "${slug}" not found`))
				} else {
					setPage(pageData)
				}
			})
			.catch((err) => {
				console.error('Error loading page:', err)
				setError(err)
			})
			.finally(() => setLoading(false))
	}, [slug])

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-[400px]">
				<Spinner size="xl" />
			</div>
		)
	}

	if (error || !page) {
		return (
			<div className="max-w-4xl mx-auto px-4 py-8">
				<Alert color="failure" className="mb-4">
					<h3 className="text-xl font-semibold mb-2">Page Not Found</h3>
					<p className="mb-4">The page you're looking for doesn't exist.</p>
					<Button as={Link} to="/portfolio" color="success">
						← Back to Portfolio
					</Button>
				</Alert>
			</div>
		)
	}

	return (
		<article className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pt-4">
			<SEOHead
				title={page.title}
				description={page.description || `Portfolio project: ${page.title}`}
				keywords={page.tags?.join(', ') || page.technologies?.join(', ')}
			/>
			<Button 
				as={Link} 
				to="/portfolio" 
				outline
				color="success"
				className="mb-6 text-sm sm:text-base"
			>
				← Back to Portfolio
			</Button>
			
			<header className="mb-6 sm:mb-8">
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">{page.title}</h1>
				{page.description && (
					<p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">{page.description}</p>
				)}
			</header>

			<div className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none">
				{page.body ? (
					<ReactMarkdown 
						remarkPlugins={[remarkGfm]}
						rehypePlugins={[rehypeRaw]}
						components={{
							iframe: (props: any) => (
								<iframe
									{...props}
									className="w-full border-0 rounded-lg my-4"
									loading="lazy"
									allowFullScreen
								/>
							),
						}}
					>
						{page.body}
					</ReactMarkdown>
				) : (
					<p className="text-gray-600 dark:text-gray-400">No content available.</p>
				)}
			</div>
		</article>
	)
}

export default PageView

