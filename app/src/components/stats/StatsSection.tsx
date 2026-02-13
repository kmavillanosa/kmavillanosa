import { useStats } from '@/hooks/useStats'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { Spinner } from 'flowbite-react'
import { getYearsOfExperience } from '@/utils/years-of-experience'

const statIcons: Record<string, JSX.Element> = {
	'Years of Experience': (
		<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
	),
	'Specialization': (
		<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
		</svg>
	),
	'Client Experience': (
		<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
	),
}

function StatsSection() {
	const { data: statsData, loading } = useStats()
	const { data: siteSettings } = useSiteSettings()
	const experienceSince = siteSettings?.experienceSince

	if (loading) {
		return (
			<section id="stats-section" className="py-20 px-4 bg-ivory-50 dark:bg-gray-900">
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

	const stats = statsData.stats.map((stat) => {
		const isYearsStat =
			stat.label === 'Years of Experience' ||
			stat.value === '{{years}}+'
		const value = isYearsStat
			? `${getYearsOfExperience(experienceSince)}+`
			: stat.value
		return { ...stat, value }
	})

	return (
		<section id="stats-section" className="py-10 sm:py-12 px-4 sm:px-6 bg-ivory-100 dark:bg-gray-800">
			<div className="max-w-5xl mx-auto">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
					{stats.map((stat, index) => (
						<div
							key={index}
							className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-stone-200 dark:border-gray-700 text-center"
						>
							<div className="flex justify-center mb-2">
								<div className="w-10 h-10 rounded-md bg-ivory-100 dark:bg-gray-700 flex items-center justify-center text-stone-600 dark:text-gray-300">
									{statIcons[stat.label] || statIcons['Specialization']}
								</div>
							</div>
							<div className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
								{stat.value}
							</div>
							<div className="text-sm font-semibold text-stone-800 dark:text-gray-200">
								{stat.label}
							</div>
							<p className="text-xs text-stone-600 dark:text-gray-400 mt-0.5">
								{stat.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default StatsSection

