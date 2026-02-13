import { Link } from 'react-router-dom'
import { Button, Spinner } from 'flowbite-react'
import { usePages } from '@/hooks/usePages'
import { useExperiences } from '@/hooks/useExperiences'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import PortfolioCard from '@/components/portfolio/PortfolioCard'
import ExperienceCard from '@/components/experience/ExperienceCard'
import ServicesSection from '@/components/services/ServicesSection'
import SkillsSection from '@/components/skills/SkillsSection'
import StatsSection from '@/components/stats/StatsSection'
import CTASection from '@/components/cta/CTASection'
import ScrollMinimap from '@/components/layout/ScrollMinimap'
import SEOHead from '@/components/seo/SEOHead'
import { replaceYearsPlaceholder } from '@/utils/years-of-experience'

function LandingPage() {
	const { data: pages, loading: pagesLoading } = usePages()
	const { data: experiences, loading: experiencesLoading } = useExperiences()
	const { data: siteSettings } = useSiteSettings()
	const featuredPages = pages.slice(0, 6) // Show up to 6 featured projects

	const sections = [
		{ id: 'hero-section', label: 'Home' },
		{ id: 'services-section', label: 'Services' },
		{ id: 'stats-section', label: 'Stats' },
		{ id: 'skills-section', label: 'Skills' },
		{ id: 'portfolio-section', label: 'Portfolio' },
		{ id: 'experience-section', label: 'Experience' },
		{ id: 'cta-section', label: 'Contact' },
	].filter((section) => {
		// Filter sections based on content availability
		if (section.id === 'portfolio-section' && featuredPages.length === 0) return false
		if (section.id === 'experience-section' && experiences.length === 0) return false
		return true
	})

	const handleDownloadResume = () => {
		const resumeUrl = siteSettings?.resumeUrl || 'http://88.222.245.88/resume/'
		window.open(resumeUrl, '_blank')
	}

	const scrollToServices = () => {
		const servicesSection = document.getElementById('services-section')
		servicesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	return (
		<div className="min-h-screen relative" style={{ isolation: 'isolate' }}>
			<SEOHead
				title="Full Stack Software Engineer"
				keywords="Full Stack Developer, React Developer, TypeScript, Node.js, 3D Graphics, WebGL, System Architecture, Remote Developer, Philippines"
			/>
			<ScrollMinimap sections={sections} />

			{/* Hero Section */}
			<section id="hero-section" className="relative flex items-center justify-center min-h-[calc(100vh-140px)] sm:min-h-[calc(100vh-160px)] px-4 pt-20 sm:pt-24 pb-10 sm:pb-14 overflow-hidden">
				{/* Background timelapse GIF */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<img
						src="/kmavillanosa/cms/media/timelapse.gif"
						alt=""
						className="w-full h-full object-cover opacity-60 dark:opacity-30 brightness-75 dark:brightness-100"
						aria-hidden="true"
					/>
				</div>
				
				{/* Solid overlay for readability — no blur */}
				<div className="absolute inset-0 bg-ivory-50/85 dark:bg-gray-900/70"></div>

				<div className="text-center max-w-3xl w-full relative z-10">
					<div className="flex flex-col items-center gap-6 animate-fade-in">
						{/* Badge */}
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-ivory-100 dark:bg-green-900/30 border border-stone-300 dark:border-green-800 rounded-md text-sm text-stone-700 dark:text-green-300 font-medium">
							<svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
							</svg>
							<span className="whitespace-nowrap">📍 Available for remote work • Contract opportunities</span>
						</div>

						<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-white tracking-tight leading-tight">
							Kim Avillanosa
						</h1>
						<p className="text-lg sm:text-xl font-semibold text-green-700 dark:text-green-400">
							{siteSettings?.hero?.subtitle || 'Full Stack Software Engineer'}
						</p>
						<p className="text-sm sm:text-base text-stone-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
							{replaceYearsPlaceholder(
								siteSettings?.hero?.description ||
									siteSettings?.description ||
									'I make cool stuff for a living',
								siteSettings?.experienceSince
							)}
						</p>

						<div className="flex flex-wrap justify-center gap-2 mt-4">
							<Button
								onClick={handleDownloadResume}
								className="bg-green-600 hover:bg-green-700 text-white border-0 px-4 py-2.5 text-sm font-medium rounded-md transition-colors"
							>
								Download CV
							</Button>
							<Button
								href="https://linkedin.com/in/kmavillanosa"
								target="_blank"
								rel="noopener noreferrer"
								as="a"
								className="bg-transparent border border-stone-400 text-stone-700 hover:border-stone-600 hover:bg-stone-50 dark:border-stone-500 dark:text-stone-300 dark:hover:bg-stone-800 px-4 py-2.5 text-sm font-medium rounded-md transition-colors"
							>
								LinkedIn
							</Button>
							<Button
								href="https://github.com/kmavillanosa"
								target="_blank"
								rel="noopener noreferrer"
								as="a"
								className="bg-transparent border border-stone-400 text-stone-700 hover:border-stone-600 hover:bg-stone-50 dark:border-stone-500 dark:text-stone-300 dark:hover:bg-stone-800 px-4 py-2.5 text-sm font-medium rounded-md transition-colors"
							>
								GitHub
							</Button>
							<Button
								as={Link}
								to="/contact"
								className="bg-transparent border border-stone-400 text-stone-700 hover:border-stone-600 hover:bg-stone-50 dark:border-stone-500 dark:text-stone-300 dark:hover:bg-stone-800 px-4 py-2.5 text-sm font-medium rounded-md transition-colors"
							>
								Contact
							</Button>
						</div>

						<button
							onClick={scrollToServices}
							className="mt-6 flex flex-col items-center gap-1 text-stone-500 dark:text-gray-400 hover:text-stone-700 dark:hover:text-gray-300 transition-colors text-xs font-medium"
							aria-label="Scroll to services"
						>
							<span>Scroll</span>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
							</svg>
						</button>
					</div>
				</div>
			</section>

			{/* Services Section */}
			<ServicesSection />

			{/* Stats Section */}
			<StatsSection />

			{/* Skills Section */}
			<SkillsSection />

			{/* Portfolio Section */}
			{featuredPages.length > 0 && (
				<section id="portfolio-section" className="py-10 sm:py-12 px-4 sm:px-6 bg-ivory-100 dark:bg-gray-800">
					<div className="max-w-5xl mx-auto">
						<div className="text-center mb-8">
							<h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white mb-1">
								Featured Work
							</h2>
							<p className="text-sm text-stone-600 dark:text-gray-400 max-w-xl mx-auto">
								Recent projects and contributions.
							</p>
						</div>

						{pagesLoading ? (
							<div className="flex justify-center items-center min-h-[400px]">
								<Spinner size="xl" />
							</div>
						) : (
							<>
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
									{featuredPages.map((page) => (
										<div key={page.slug} className="h-full">
											<PortfolioCard page={page} />
										</div>
									))}
								</div>

								{pages.length > featuredPages.length && (
									<div className="text-center mt-8">
										<Button
											as={Link}
											to="/portfolio"
											color="success"
											size="xl"
											className="transition-transform hover:scale-105"
										>
											View All Projects ({pages.length})
										</Button>
									</div>
								)}
							</>
						)}
					</div>
				</section>
			)}

			{/* Experience Section */}
			{experiences.length > 0 && (
				<section id="experience-section" className="py-10 sm:py-12 px-4 sm:px-6 bg-ivory-50 dark:bg-gray-800">
					<div className="max-w-5xl mx-auto">
						<div className="text-center mb-8">
							<h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white mb-1">
								Experience
							</h2>
							<p className="text-sm text-stone-600 dark:text-gray-400 max-w-xl mx-auto">
								Career path and companies I've worked with.
							</p>
						</div>

						{experiencesLoading ? (
							<div className="flex justify-center items-center min-h-[400px]">
								<Spinner size="xl" />
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
								{experiences.map((experience) => (
									<div key={experience.slug} className="h-full">
										<ExperienceCard experience={experience} />
									</div>
								))}
							</div>
						)}
					</div>
				</section>
			)}

			{/* Call to Action Section */}
			<CTASection />
		</div>
	)
}

export default LandingPage

