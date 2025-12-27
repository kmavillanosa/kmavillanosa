import { usePages } from '@/hooks/usePages'
import { Spinner, Alert } from 'flowbite-react'
import PortfolioCard from '@/components/portfolio/PortfolioCard'

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
		<div className="max-w-7xl mx-auto px-4 py-8 pt-4">
			<header className="text-center mb-12">
				<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">My Work</h1>
				<p className="text-xl text-gray-600 dark:text-gray-400">A collection of projects and work I've done</p>
			</header>

			{pages.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-gray-600 dark:text-gray-400 text-lg">No portfolio items yet. Check back soon!</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{pages.map((page) => (
						<div key={page.slug} className="h-full">
							<PortfolioCard page={page} />
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default PortfolioPage

