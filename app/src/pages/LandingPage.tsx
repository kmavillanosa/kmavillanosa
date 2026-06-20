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
				
				{/* Dotted grid texture */}
				<div className="absolute inset-0 hero-grid pointer-events-none" aria-hidden="true"></div>

				{/* Layered overlay for readability + accent glow — no blur */}
				<div className="absolute inset-0 hero-overlay-gradient pointer-events-none"></div>

				<div className="text-center max-w-3xl w-full relative z-10">
					<div className="flex flex-col items-center gap-5 animate-fade-in">
						{/* Live availability badge */}
						<div className="inline-flex items-center gap-2.5 px-4 py-2 bg-theme-elevated/80 backdrop-blur-sm border border-theme rounded-full text-sm text-theme-text-secondary font-medium shadow-sm">
							<span className="availability-dot" aria-hidden="true"></span>
							<span className="whitespace-nowrap">Open to new opportunities</span>
						</div>

						<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient-accent tracking-tight leading-tight pb-1">
							Kim Avillanosa
						</h1>
						<p className="text-lg sm:text-xl font-semibold text-theme-text-primary">
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

						<div className="flex flex-wrap items-center justify-center gap-2.5 mt-5">
							<Button
								onClick={handleDownloadResume}
								className="btn-accent-glow bg-theme-accent hover:bg-theme-accent-hover text-theme-accent-foreground border-0 px-5 py-2.5 text-sm font-semibold rounded-full transition-colors"
							>
								<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
								</svg>
								Download CV
							</Button>
							<Button
								as={Link}
								to="/contact"
								className="bg-transparent border border-theme-muted text-theme-text-secondary hover:border-theme-accent hover:text-theme-accent hover:bg-theme-elevated px-5 py-2.5 text-sm font-semibold rounded-full transition-colors"
							>
								Get in touch
							</Button>
						</div>

						{/* Social links */}
						<div className="flex items-center gap-1 mt-1">
							<a
								href="https://linkedin.com/in/kmavillanosa"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="LinkedIn"
								className="w-9 h-9 flex items-center justify-center rounded-full text-theme-text-muted hover:text-theme-accent hover:bg-theme-elevated transition-colors"
							>
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
								</svg>
							</a>
							<a
								href="https://github.com/kmavillanosa"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="GitHub"
								className="w-9 h-9 flex items-center justify-center rounded-full text-theme-text-muted hover:text-theme-accent hover:bg-theme-elevated transition-colors"
							>
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
								</svg>
							</a>
						</div>

						<button
							onClick={scrollToServices}
							className="mt-4 flex flex-col items-center gap-1 text-theme-text-muted hover:text-theme-accent transition-colors text-xs font-medium animate-bounce-slow"
							aria-label="Scroll to services"
						>
							<span>Explore</span>
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
				<section id="value-props-section" className="py-12 sm:py-16 px-4 sm:px-6 bg-theme-page">
					<div className="max-w-5xl mx-auto">
						<div className="flex flex-col items-center text-center mb-8">
							<span className="section-eyebrow mb-3">What I bring</span>
							<h2 className="text-2xl sm:text-3xl font-bold text-theme-text-primary mb-2">
								Why I'm a strong fit
							</h2>
							<p className="text-sm sm:text-base text-theme-text-secondary max-w-xl mx-auto">
								Built for remote and contract roles across time zones.
							</p>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{(siteSettings?.valueProps ?? []).map((text, i) => (
								<div key={i} className="card-hover card-accent-edge flex items-start gap-4 p-5 rounded-xl bg-theme-surface border border-theme">
									<span className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-theme-accent to-theme-accent-hover text-theme-accent-foreground flex items-center justify-center text-sm font-bold shadow-sm">
										{i + 1}
									</span>
									<span className="text-sm text-theme-text-secondary leading-relaxed pt-1">
										{text}
									</span>
								</div>
							))}
						</div>
					</div>
				</section>
			)}

			{/* Certifications */}
			{(siteSettings?.certifications ?? []).length > 0 && (
				<section id="certifications-section" className="py-12 sm:py-16 px-4 sm:px-6 bg-theme-surface">
					<div className="max-w-5xl mx-auto">
						<div className="flex flex-col items-center text-center mb-8">
							<span className="section-eyebrow mb-3">Credentials</span>
							<h2 className="text-2xl sm:text-3xl font-bold text-theme-text-primary mb-2">
								Certifications
							</h2>
							<p className="text-sm sm:text-base text-theme-text-secondary max-w-xl mx-auto">
								Professional certifications and verified credentials.
							</p>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
							{(siteSettings?.certifications ?? []).map((cert, i) => (
								<a
									key={i}
									href={cert.url}
									target="_blank"
									rel="noopener noreferrer"
									className="card-hover group flex flex-col rounded-xl border border-theme bg-theme-elevated p-5 focus:outline-none focus:ring-2 focus:ring-theme-accent focus:ring-offset-2 focus:ring-offset-theme-surface"
								>
									<div className="flex items-start justify-between gap-3 mb-4">
										<span className="flex-shrink-0 w-11 h-11 rounded-lg bg-gradient-to-br from-theme-accent to-theme-accent-hover text-theme-accent-foreground flex items-center justify-center font-bold text-lg shadow-sm">
											{(cert.issuer || cert.title).charAt(0)}
										</span>
										<svg className="w-4 h-4 text-theme-text-muted group-hover:text-theme-accent transition-colors mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
										</svg>
									</div>
									<p className="text-sm font-semibold text-theme-text-primary leading-snug flex-1">
										{cert.title}
									</p>
									{(cert.issuer || cert.year) && (
										<p className="text-xs font-medium text-theme-text-secondary mt-2">
											{[cert.issuer, cert.year].filter(Boolean).join(' · ')}
										</p>
									)}
									{cert.credentialId && (
										<p className="text-[11px] text-theme-text-muted mt-0.5">
											Credential ID {cert.credentialId}
										</p>
									)}
									<span className="text-xs font-semibold text-theme-accent mt-3 inline-flex items-center gap-1">
										View credential
										<span className="transition-transform group-hover:translate-x-0.5">→</span>
									</span>
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
				<section id="portfolio-section" className="py-12 sm:py-16 px-4 sm:px-6 bg-theme-elevated">
					<div className="max-w-5xl mx-auto">
						<div className="flex flex-col items-center text-center mb-8">
							<span className="section-eyebrow mb-3">Portfolio</span>
							<h2 className="text-2xl sm:text-3xl font-bold text-theme-text-primary mb-2">
								Featured Work
							</h2>
							<p className="text-sm sm:text-base text-theme-text-secondary max-w-xl mx-auto">
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
				<section id="experience-section" className="py-12 sm:py-16 px-4 sm:px-6 bg-theme-surface">
					<div className="max-w-5xl mx-auto">
						<div className="flex flex-col items-center text-center mb-8">
							<span className="section-eyebrow mb-3">Career</span>
							<h2 className="text-2xl sm:text-3xl font-bold text-theme-text-primary mb-2">
								Experience
							</h2>
							<p className="text-sm sm:text-base text-theme-text-secondary max-w-xl mx-auto">
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

