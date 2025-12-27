import { useServices } from '@/hooks/useServices'
import { Spinner } from 'flowbite-react'

function ServicesSection() {
	const { data: services, loading } = useServices()

	const serviceIcons: Record<string, JSX.Element> = {
		'Front-end Development': (
			<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
			</svg>
		),
		'Back-end Development': (
			<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
			</svg>
		),
		'Desktop Applications Development': (
			<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
			</svg>
		),
		'Web Scraping and other automation': (
			<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
			</svg>
		),
		'Mobile Development': (
			<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
			</svg>
		),
		'Workflow Automations': (
			<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
			</svg>
		),
	}

	const getServiceIcon = (service: string): JSX.Element => {
		return serviceIcons[service] || (
			<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		)
	}

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-[400px]">
				<Spinner size="xl" />
			</div>
		)
	}

	if (!services || !services.services || services.services.length === 0) {
		return null
	}

	return (
		<section id="services-section" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<div className="inline-block mb-4">
						<span className="text-green-600 dark:text-green-400 font-semibold text-sm uppercase tracking-wider">Services</span>
					</div>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
						What I Offer
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
						Comprehensive development services to bring your ideas to life across multiple platforms and technologies.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{services.services.map((service, index) => (
						<div
							key={index}
							className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
						>
							<div className="flex items-start gap-4">
								<div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/40 dark:to-green-800/40 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
									{getServiceIcon(service)}
								</div>
								<div className="flex-1 min-w-0">
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
										{service}
									</h3>
								</div>
							</div>
							<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-50/0 to-green-50/0 dark:from-green-900/0 dark:to-green-900/0 group-hover:from-green-50/50 group-hover:to-green-50/30 dark:group-hover:from-green-900/20 dark:group-hover:to-green-900/10 transition-all duration-300 pointer-events-none"></div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default ServicesSection

