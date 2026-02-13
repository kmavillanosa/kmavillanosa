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
		{ id: 'availability-section', label: 'Availability' },
		{ id: 'services-section', label: 'Services' },
		{ id: 'stats-section', label: 'Stats' },
		{ id: 'value-props-section', label: 'What I bring' },
		{ id: 'certifications-section', label: 'Certifications' },
		{ id: 'skills-section', label: 'Skills' },
		{ id: 'portfolio-section', label: 'Portfolio' },
		{ id: 'experience-section', label: 'Experience' },
		{ id: 'cta-section', label: 'Contact' },
	].filter((section) => {
		// Filter sections based on content availability
		if (section.id === 'portfolio-section' && featuredPages.length === 0) return false
		if (section.id === 'experience-section' && experiences.length === 0) return false
		if (section.id === 'availability-section' && !siteSettings?.availability?.openTo?.length && !siteSettings?.availability?.timezone) return false
		if (section.id === 'value-props-section' && (siteSettings?.valueProps ?? []).length === 0) return false
		if (section.id === 'certifications-section' && (siteSettings?.certifications ?? []).length === 0) return false
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
				<div className="absolute inset-0 bg-theme-hero-overlay"></div>

				<div className="text-center max-w-3xl w-full relative z-10">
					<div className="flex flex-col items-center gap-5 animate-fade-in">
						{/* Badge */}
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-theme-elevated border border-theme rounded-md text-sm text-theme-text-secondary font-medium">
							<svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
							</svg>
							<span className="whitespace-nowrap">📍 Open to new opportunities</span>
						</div>

						<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-theme-text-primary tracking-tight leading-tight">
							Kim Avillanosa
						</h1>
						<p className="text-lg sm:text-xl font-semibold text-theme-accent">
							{siteSettings?.hero?.subtitle || 'Full Stack Software Engineer'}
						</p>
						<p className="text-sm sm:text-base text-theme-text-secondary max-w-xl mx-auto leading-relaxed">
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
								className="bg-theme-accent hover:bg-theme-accent-hover text-theme-accent-foreground border-0 px-4 py-2.5 text-sm font-medium rounded-md transition-colors"
							>
								Download CV
							</Button>
							<Button
								href="https://linkedin.com/in/kmavillanosa"
								target="_blank"
								rel="noopener noreferrer"
								as="a"
								className="bg-transparent border border-theme text-theme-text-secondary hover:border-theme-muted hover:bg-theme-elevated px-4 py-2.5 text-sm font-medium rounded-md transition-colors"
							>
								LinkedIn
							</Button>
							<Button
								href="https://github.com/kmavillanosa"
								target="_blank"
								rel="noopener noreferrer"
								as="a"
								className="bg-transparent border border-theme text-theme-text-secondary hover:border-theme-muted hover:bg-theme-elevated px-4 py-2.5 text-sm font-medium rounded-md transition-colors"
							>
								GitHub
							</Button>
							<Button
								as={Link}
								to="/contact"
								className="bg-transparent border border-theme text-theme-text-secondary hover:border-theme-muted hover:bg-theme-elevated px-4 py-2.5 text-sm font-medium rounded-md transition-colors"
							>
								Contact
							</Button>
						</div>

						<button
							onClick={scrollToServices}
							className="mt-6 flex flex-col items-center gap-1 text-theme-text-muted hover:text-theme-text-secondary transition-colors text-xs font-medium"
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

			{/* Availability — open to / timezone (hirer-focused) */}
			{(siteSettings?.availability?.openTo?.length || siteSettings?.availability?.timezone) && (
				<section id="availability-section" className="py-5 sm:py-6 px-4 sm:px-6 bg-theme-surface border-y border-theme">
					<div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 sm:gap-6 text-center sm:text-left">
						{siteSettings.availability.openTo?.length > 0 && (
							<div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
								<span className="text-xs font-semibold text-theme-text-muted uppercase tracking-wider">Open to</span>
								{siteSettings.availability.openTo.map((item) => (
									<span key={item} className="px-2.5 py-1 text-sm font-medium rounded-md bg-theme-elevated text-theme-text-secondary border border-theme-muted">
										{item}
									</span>
								))}
							</div>
						)}
						{siteSettings.availability.openTo?.length > 0 && siteSettings.availability.timezone && (
							<div className="hidden sm:block w-px h-6 bg-theme-border flex-shrink-0" aria-hidden="true" />
						)}
						{siteSettings.availability.timezone && (
							<div className="flex items-center justify-center sm:justify-start gap-1.5 text-sm text-theme-text-muted">
								<svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span>{siteSettings.availability.timezone}</span>
							</div>
						)}
					</div>
				</section>
			)}

			{/* Services Section */}
			<ServicesSection />

			{/* Stats Section */}
			<StatsSection />

			{/* What I bring — value props for hirers */}
			{(siteSettings?.valueProps ?? []).length > 0 && (
				<section id="value-props-section" className="py-10 sm:py-12 px-4 sm:px-6 bg-theme-page">
					<div className="max-w-5xl mx-auto">
						<div className="text-center mb-6">
							<h2 className="text-xl sm:text-2xl font-bold text-theme-text-primary mb-1">
								What I bring
							</h2>
							<p className="text-sm text-theme-text-secondary max-w-xl mx-auto">
								Why I'm a strong fit for remote and contract roles.
							</p>
						</div>
						<ul className="space-y-3">
							{(siteSettings?.valueProps ?? []).map((text, i) => (
								<li key={i} className="flex items-start gap-3 p-4 rounded-lg bg-theme-surface border border-theme">
									<span className="flex-shrink-0 w-6 h-6 rounded-full bg-theme-accent text-theme-accent-foreground flex items-center justify-center text-xs font-bold mt-0.5">
										{i + 1}
									</span>
									<span className="text-sm text-theme-text-secondary leading-relaxed pt-0.5">
										{text}
									</span>
								</li>
							))}
						</ul>
					</div>
				</section>
			)}

			{/* Certifications */}
			{(siteSettings?.certifications ?? []).length > 0 && (
				<section id="certifications-section" className="py-10 sm:py-12 px-4 sm:px-6 bg-theme-surface">
					<div className="max-w-5xl mx-auto">
						<div className="text-center mb-6">
							<h2 className="text-xl sm:text-2xl font-bold text-theme-text-primary mb-1">
								Certifications
							</h2>
							<p className="text-sm text-theme-text-secondary max-w-xl mx-auto">
								Credentials and professional certifications.
							</p>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
							{(siteSettings?.certifications ?? []).map((cert, i) => (
								<a
									key={i}
									href={cert.url}
									target="_blank"
									rel="noopener noreferrer"
									className="block rounded-lg border border-theme bg-theme-elevated overflow-hidden hover:border-theme-muted transition-colors focus:outline-none focus:ring-2 focus:ring-theme-accent focus:ring-offset-2 focus:ring-offset-theme-page"
								>
									<div className="aspect-[4/3] bg-theme-page overflow-hidden">
										<img
											src={cert.url}
											alt={cert.title}
											className="w-full h-full object-contain"
										/>
									</div>
									<div className="p-3">
										<p className="text-sm font-semibold text-theme-text-primary">
											{cert.title}
										</p>
										{(cert.issuer || cert.year || cert.credentialId) && (
											<p className="text-xs text-theme-text-muted mt-0.5">
												{[cert.issuer, cert.year, cert.credentialId && `Credential ID ${cert.credentialId}`].filter(Boolean).join(' · ')}
											</p>
										)}
									</div>
								</a>
							))}
						</div>
					</div>
				</section>
			)}

			{/* Skills Section */}
			<SkillsSection />

			{/* Portfolio Section */}
			{featuredPages.length > 0 && (
				<section id="portfolio-section" className="py-10 sm:py-12 px-4 sm:px-6 bg-theme-elevated">
					<div className="max-w-5xl mx-auto">
						<div className="text-center mb-6">
							<h2 className="text-xl sm:text-2xl font-bold text-theme-text-primary mb-1">
								Featured Work
							</h2>
							<p className="text-sm text-theme-text-secondary max-w-xl mx-auto">
								Recent projects and contributions.
							</p>
						</div>

						{pagesLoading ? (
							<div className="flex justify-center items-center min-h-[320px]">
								<Spinner size="xl" />
							</div>
						) : (
							<>
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
									{featuredPages.map((page) => (
										<div key={page.slug} className="h-full">
											<PortfolioCard page={page} />
										</div>
									))}
								</div>

								{pages.length > featuredPages.length && (
									<div className="text-center mt-6">
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
				<section id="experience-section" className="py-10 sm:py-12 px-4 sm:px-6 bg-theme-surface">
					<div className="max-w-5xl mx-auto">
						<div className="text-center mb-6">
							<h2 className="text-xl sm:text-2xl font-bold text-theme-text-primary mb-1">
								Experience
							</h2>
							<p className="text-sm text-theme-text-secondary max-w-xl mx-auto">
								Career path and companies I've worked with.
							</p>
						</div>

						{experiencesLoading ? (
							<div className="flex justify-center items-center min-h-[320px]">
								<Spinner size="xl" />
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
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

