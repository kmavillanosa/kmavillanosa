import { usePages } from '@/hooks/usePages'
import { extractFirstImage } from '@/utils/markdown-utils'
import { Card, Spinner, Alert } from 'flowbite-react'

function PortfolioPage() {
	const { data: pages, loading, error } = usePages()

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-[400px]">
				<Spinner size="xl" />
			</div>
		)
	}

	if (error) {
		return (
			<div className="max-w-4xl mx-auto p-4">
				<Alert color="failure">
					Error loading portfolio: {error.message}
				</Alert>
			</div>
		)
	}

	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<header className="text-center mb-12">
				<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">My Work</h1>
				<p className="text-xl text-gray-400">A collection of projects and work I've done</p>
			</header>

			{pages.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-gray-400 text-lg">No portfolio items yet. Check back soon!</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{pages.map((page) => {
						const previewImage = extractFirstImage(page.body)
						
						return (
							<a
								key={page.slug}
								href={`/kmavillanosa/portfolio/${page.slug}`}
								target="_blank"
								rel="noopener noreferrer"
								className="block h-full"
							>
								<Card 
									className="h-full hover:shadow-lg transition-shadow cursor-pointer"
									imgSrc={previewImage || undefined}
									imgAlt={page.title}
								>
									<h5 className="text-2xl font-bold tracking-tight text-white">
										{page.title}
									</h5>
									{page.description && (
										<p className="font-normal text-gray-400 line-clamp-3">
											{page.description}
										</p>
									)}
									{page.date && (
										<p className="text-sm text-gray-500">
											{new Date(page.date).toLocaleDateString('en-US', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											})}
										</p>
									)}
								</Card>
							</a>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default PortfolioPage

