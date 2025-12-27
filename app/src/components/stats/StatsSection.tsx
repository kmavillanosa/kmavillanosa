import { useStats } from '@/hooks/useStats'
import { Spinner } from 'flowbite-react'

const statIcons: Record<string, JSX.Element> = {
	'Years of Experience': (
		<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
	),
	'Projects Completed': (
		<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
		</svg>
	),
	'Companies Worked With': (
		<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
		</svg>
	),
	'Specialization': (
		<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
		</svg>
	),
}

function StatsSection() {
	const { data: statsData, loading } = useStats()

	if (loading) {
		return (
			<section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
				<div className="max-w-7xl mx-auto">
					<div className="flex justify-center items-center min-h-[400px]">
						<Spinner size="xl" />
					</div>
				</div>
			</section>
		)
	}

	if (!statsData || !statsData.stats || statsData.stats.length === 0) {
		return null
	}

	const stats = statsData.stats

	return (
		<section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{stats.map((stat, index) => (
						<div
							key={index}
							className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
						>
							<div className="flex justify-center mb-4">
								<div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/40 dark:to-green-800/40 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
									{statIcons[stat.label] || statIcons['Specialization']}
								</div>
							</div>
							<div className="mb-2">
								<div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-1">
									{stat.value}
								</div>
								<div className="text-lg font-semibold text-gray-900 dark:text-white">
									{stat.label}
								</div>
							</div>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								{stat.description}
							</p>
							<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-50/0 to-green-50/0 dark:from-green-900/0 dark:to-green-900/0 group-hover:from-green-50/50 group-hover:to-green-50/30 dark:group-hover:from-green-900/20 dark:group-hover:to-green-900/10 transition-all duration-300 pointer-events-none"></div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default StatsSection

