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
				<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">My Work</h1>
				<p className="text-xl text-gray-600">A collection of projects and work I've done</p>
			</header>

			{pages.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-gray-600 text-lg">No portfolio items yet. Check back soon!</p>
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
								className="block h-full group"
							>
								<Card 
									className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 bg-white border-gray-200 overflow-hidden"
								>
									{previewImage && (
										<div className="h-48 w-full overflow-hidden bg-gray-100">
											<img 
												src={previewImage} 
												alt={page.title}
												className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
											/>
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
						)
					})}
				</div>
			)}
		</div>
	)
}

export default PortfolioPage

