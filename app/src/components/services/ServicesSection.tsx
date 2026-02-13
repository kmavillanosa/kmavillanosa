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
		'Consultancy Work': (
			<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
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
		<section id="services-section" className="py-10 sm:py-12 px-4 sm:px-6 bg-theme-page">
			<div className="max-w-5xl mx-auto">
				<div className="text-center mb-8">
					<h2 className="text-xl sm:text-2xl font-bold text-theme-text-primary mb-1">
						What I Offer
					</h2>
					<p className="text-sm text-theme-text-secondary max-w-xl mx-auto">
						Development services across web, desktop, and automation.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
					{services.services.map((service, index) => (
						<div
							key={index}
							className="bg-theme-surface rounded-lg p-4 border border-theme"
						>
							<div className="flex items-start gap-3">
								<div className="flex-shrink-0 w-10 h-10 rounded-md bg-theme-elevated-muted flex items-center justify-center text-theme-text-secondary">
									{getServiceIcon(service)}
								</div>
								<div className="flex-1 min-w-0">
									<h3 className="text-sm font-semibold text-theme-text-primary">
										{service}
									</h3>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default ServicesSection

