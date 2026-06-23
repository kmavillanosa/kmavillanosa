import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Spinner } from 'flowbite-react'
import { usePages } from '@/hooks/usePages'
import { useExperiences } from '@/hooks/useExperiences'
import { useServices } from '@/hooks/useServices'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import PortfolioCard from '@/components/portfolio/PortfolioCard'
import ExperienceCard from '@/components/experience/ExperienceCard'
import SkillsSection from '@/components/skills/SkillsSection'
import StatsSection from '@/components/stats/StatsSection'
import CTASection from '@/components/cta/CTASection'
import ScrollMinimap from '@/components/layout/ScrollMinimap'
import SEOHead from '@/components/seo/SEOHead'
import { replaceYearsPlaceholder } from '@/utils/years-of-experience'

/** Short blurb shown under each expertise row. Falls back to a generic line. */
const EXPERTISE_BLURBS: Record<string, string> = {
	'Front-end Development':
		'Building fast, accessible interfaces with React, TypeScript and modern tooling — from design systems to data-heavy dashboards.',
	'Back-end Development':
		'Designing APIs, services and data models that stay reliable under load, with clean architecture and sensible trade-offs.',
	'Desktop Applications Development':
		'Cross-platform desktop apps that feel native, packaged and shipped to real users.',
	'Web Scraping and other automation':
		'Automating the tedious — scraping, pipelines and scripts that turn manual work into a scheduled job.',
	'Mobile Development':
		'Shipping mobile experiences that share logic with the web and stay maintainable as they grow.',
	'Consultancy Work':
		'Helping teams make the right technical call, untangle legacy code, and move faster with confidence.',
}

function LandingPage() {
	const { data: pages, loading: pagesLoading } = usePages()
	const { data: experiences, loading: experiencesLoading } = useExperiences()
	const { data: services } = useServices()
	const { data: siteSettings } = useSiteSettings()

	const featuredPages = pages.slice(0, 6)
	const expertise = services?.services ?? []

	// Tabs for the "Featured work" section, ING "Jobs for you" style.
	const tabs = [
		{ id: 'featured', label: 'Featured' },
		{ id: 'recent', label: 'Recent' },
	] as const
	const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['id']>('featured')
	const sortedByDate = [...pages].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	)
	const tabPages = (activeTab === 'recent' ? sortedByDate : featuredPages).slice(0, 6)

	const sections = [
		{ id: 'hero-section', label: 'Home' },
		{ id: 'intro-section', label: 'About' },
		{ id: 'stats-section', label: 'Stats' },
		{ id: 'expertise-section', label: 'What I do' },
		{ id: 'work-section', label: 'Work' },
		{ id: 'programme-section', label: "Let's talk" },
		{ id: 'more-section', label: 'Experience' },
		{ id: 'skills-section', label: 'Skills' },
		{ id: 'cta-section', label: 'Contact' },
	].filter((section) => {
		if (section.id === 'work-section' && featuredPages.length === 0) return false
		if (section.id === 'more-section' && experiences.length === 0) return false
		if (section.id === 'expertise-section' && expertise.length === 0) return false
		return true
	})

	const handleDownloadResume = () => {
		const resumeUrl = siteSettings?.resumeUrl || 'http://88.222.245.88/resume/'
		window.open(resumeUrl, '_blank')
	}

	const scrollTo = (id: string) => {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	return (
		<div className="min-h-screen relative" style={{ isolation: 'isolate' }}>
			<SEOHead
				title="Full Stack Software Engineer"
				keywords="Full Stack Developer, React Developer, TypeScript, Node.js, 3D Graphics, WebGL, System Architecture, Remote Developer, Philippines"
			/>
			<ScrollMinimap sections={sections} />

			{/* ============================================================
			    HERO — full-bleed accent block with a "find" card (ING hero)
			    ============================================================ */}
			<section
				id="hero-section"
				className="relative overflow-hidden text-white"
			>
				{/* Background timelapse GIF (full-bleed) */}
				<div className="absolute inset-0 pointer-events-none">
					<img
						src="/kmavillanosa/cms/media/timelapse.gif"
						alt=""
						aria-hidden="true"
						className="w-full h-full object-cover"
					/>
					{/* Dark scrim for text legibility over the GIF */}
					<div
						className="absolute inset-0"
						style={{
							background:
								'linear-gradient(120deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.2) 100%)',
						}}
					/>
				</div>

				<div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16 sm:pt-32 sm:pb-24">
					<div className="grid lg:grid-cols-12 gap-10 items-center">
						{/* Headline */}
						<div className="lg:col-span-7 animate-fade-in">
							<div className="inline-flex items-center gap-2.5 px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium">
								<span className="availability-dot" aria-hidden="true"></span>
								<span className="whitespace-nowrap">Open to new opportunities</span>
							</div>
							<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
								{siteSettings?.hero?.subtitle
									? siteSettings.hero.subtitle
									: 'Building software that works for everyone'}
							</h1>
							<p className="mt-5 text-base sm:text-lg text-white/85 max-w-xl leading-relaxed">
								{replaceYearsPlaceholder(
									siteSettings?.hero?.description ||
										siteSettings?.description ||
										'Full Stack Software Engineer crafting fast, reliable products end to end.',
									siteSettings?.experienceSince
								)}
							</p>
						</div>

						{/* "Find a job" style action card */}
						<div className="lg:col-span-5">
							<div className="bg-theme-surface text-theme-text-primary rounded-2xl shadow-2xl p-6 sm:p-7 border border-theme">
								<h2 className="text-lg font-bold mb-1">Let's work together</h2>
								<p className="text-sm text-theme-text-secondary mb-5">
									Grab my CV or reach out — I usually reply within a day.
								</p>
								<div className="flex flex-col gap-2.5">
									<Button
										onClick={handleDownloadResume}
										className="btn-accent-glow bg-theme-accent hover:bg-theme-accent-hover text-theme-accent-foreground border-0 py-2.5 text-sm font-semibold rounded-lg transition-colors"
									>
										<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
										</svg>
										Download CV
									</Button>
									<Button
										as={Link}
										to="/contact"
										className="bg-transparent border border-theme-muted text-theme-text-secondary hover:border-theme-accent hover:text-theme-accent hover:bg-theme-elevated py-2.5 text-sm font-semibold rounded-lg transition-colors"
									>
										Get in touch
									</Button>
									<button
										onClick={() => scrollTo('work-section')}
										className="text-sm font-semibold text-theme-accent hover:underline py-1 mt-1"
									>
										Explore my work →
									</button>
								</div>
								<div className="flex items-center gap-1 mt-5 pt-4 border-t border-theme">
									<a href="https://linkedin.com/in/kmavillanosa" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
										className="w-9 h-9 flex items-center justify-center rounded-full text-theme-text-muted hover:text-theme-accent hover:bg-theme-elevated transition-colors">
										<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
									</a>
									<a href="https://github.com/kmavillanosa" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
										className="w-9 h-9 flex items-center justify-center rounded-full text-theme-text-muted hover:text-theme-accent hover:bg-theme-elevated transition-colors">
										<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ============================================================
			    INTRO — "Growing the difference" style narrow-heading block
			    ============================================================ */}
			<section id="intro-section" className="py-14 sm:py-20 px-4 sm:px-6 bg-theme-page">
				<div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-8 md:gap-12">
					<div className="md:col-span-4">
						<h2 className="text-2xl sm:text-3xl font-bold text-theme-text-primary leading-tight">
							Doing the work,<br />done well
						</h2>
					</div>
					<div className="md:col-span-8 space-y-4 text-sm sm:text-base text-theme-text-secondary leading-relaxed">
						<p>
							{replaceYearsPlaceholder(
								siteSettings?.description ||
									"I'm a full stack engineer who likes shipping things that hold up — clean code, sensible architecture, and interfaces people actually enjoy using.",
								siteSettings?.experienceSince
							)}
						</p>
						{(siteSettings?.valueProps ?? []).length > 0 && (
							<ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 pt-2">
								{(siteSettings?.valueProps ?? []).map((vp, i) => (
									<li key={i} className="flex items-start gap-2.5">
										<svg className="w-5 h-5 flex-shrink-0 text-theme-accent mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
										</svg>
										<span>{vp}</span>
									</li>
								))}
							</ul>
						)}
						{(siteSettings?.availability?.openTo?.length || siteSettings?.availability?.timezone) && (
							<div className="flex flex-wrap items-center gap-2 pt-3">
								{siteSettings?.availability?.openTo?.map((item) => (
									<span key={item} className="px-2.5 py-1 text-xs font-medium rounded-md bg-theme-elevated text-theme-text-secondary border border-theme-muted">
										{item}
									</span>
								))}
								{siteSettings?.availability?.timezone && (
									<span className="text-xs text-theme-text-muted">· {siteSettings.availability.timezone}</span>
								)}
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Stats band */}
			<StatsSection />

			{/* ============================================================
			    EXPERTISE — "Where would you fit?" vertical list with arrows
			    ============================================================ */}
			{expertise.length > 0 && (
				<section id="expertise-section" className="py-14 sm:py-20 px-4 sm:px-6 bg-theme-surface">
					<div className="max-w-4xl mx-auto">
						<div className="text-center mb-10">
							<span className="section-eyebrow mb-3">What I do</span>
							<h2 className="text-2xl sm:text-3xl font-bold text-theme-text-primary mt-3">
								Where I can help
							</h2>
							<p className="text-sm sm:text-base text-theme-text-secondary max-w-xl mx-auto mt-2">
								Explore the areas I work across and find the fit for your project.
							</p>
						</div>

						<div className="divide-y divide-theme border-y border-theme">
							{expertise.map((service, i) => (
								<button
									key={i}
									onClick={() => scrollTo('cta-section')}
									className="group w-full flex items-center gap-4 sm:gap-6 py-5 text-left transition-colors hover:bg-theme-elevated/60 -mx-3 px-3 rounded-lg"
								>
									<div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-theme-accent to-theme-accent-hover text-theme-accent-foreground flex items-center justify-center font-bold text-xl shadow-sm">
										{String(i + 1).padStart(2, '0')}
									</div>
									<div className="flex-1 min-w-0">
										<h3 className="text-base sm:text-lg font-bold text-theme-text-primary group-hover:text-theme-accent transition-colors">
											{service}
										</h3>
										<p className="text-sm text-theme-text-secondary mt-1 leading-relaxed">
											{EXPERTISE_BLURBS[service] || 'Pragmatic, well-built solutions tailored to what you actually need.'}
										</p>
									</div>
									<span className="flex-shrink-0 w-10 h-10 rounded-full bg-theme-accent text-theme-accent-foreground flex items-center justify-center transition-transform group-hover:translate-x-1">
										<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
										</svg>
									</span>
								</button>
							))}
						</div>
					</div>
				</section>
			)}

			{/* ============================================================
			    FEATURED WORK — "Jobs for you" tabbed card grid
			    ============================================================ */}
			{featuredPages.length > 0 && (
				<section id="work-section" className="py-14 sm:py-20 px-4 sm:px-6 bg-theme-elevated">
					<div className="max-w-5xl mx-auto">
						<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
							<div>
								<span className="section-eyebrow mb-3">Work for you</span>
								<h2 className="text-2xl sm:text-3xl font-bold text-theme-text-primary mt-3">
									Featured work
								</h2>
							</div>
							<div className="flex flex-wrap gap-2">
								{tabs.map((tab) => (
									<button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`px-4 py-2 text-sm font-semibold rounded-full border transition-colors ${
											activeTab === tab.id
												? 'bg-theme-accent text-theme-accent-foreground border-theme-accent'
												: 'bg-theme-surface text-theme-text-secondary border-theme hover:border-theme-accent hover:text-theme-accent'
										}`}
									>
										{tab.label}
									</button>
								))}
							</div>
						</div>

						{pagesLoading ? (
							<div className="flex justify-center items-center min-h-[320px]">
								<Spinner size="xl" />
							</div>
						) : (
							<>
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
									{tabPages.map((page) => (
										<div key={page.slug} className="h-full">
											<PortfolioCard page={page} />
										</div>
									))}
								</div>

								{pages.length > tabPages.length && (
									<div className="text-center mt-8">
										<Button
											as={Link}
											to="/portfolio"
											color="success"
											size="xl"
											className="transition-transform hover:scale-105"
										>
											View all projects ({pages.length})
										</Button>
									</div>
								)}
							</>
						)}
					</div>
				</section>
			)}

			{/* ============================================================
			    PROGRAMME BANNER — ING "Talent Programme" accent banner
			    ============================================================ */}
			<section id="programme-section" className="px-4 sm:px-6 py-10 sm:py-14 bg-theme-page">
				<div className="max-w-5xl mx-auto">
					<div className="grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl">
						<div className="bg-theme-cta-bg text-theme-accent-foreground p-8 sm:p-12 flex flex-col justify-center">
							<h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-3">
								Have a project in mind?
							</h2>
							<p className="text-sm sm:text-base text-white/85 mb-6 max-w-md">
								Whether it's a new build, a rescue mission, or a few hands for a sprint —
								let's talk about what you're trying to ship.
							</p>
							<div>
								<Button
									as={Link}
									to="/contact"
									className="bg-theme-accent-foreground text-theme-cta-bg font-semibold text-sm rounded-lg border-0 px-5 py-2.5 hover:opacity-90 transition-opacity"
								>
									Start a conversation →
								</Button>
							</div>
						</div>
						<div className="relative min-h-[200px] bg-theme-elevated-muted">
							<img
								src="/kmavillanosa/cms/media/timelapse.gif"
								alt=""
								aria-hidden="true"
								className="absolute inset-0 w-full h-full object-cover"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* ============================================================
			    MORE FOR YOU — experience grid (ING "More for you")
			    ============================================================ */}
			{experiences.length > 0 && (
				<section id="more-section" className="py-14 sm:py-20 px-4 sm:px-6 bg-theme-surface">
					<div className="max-w-5xl mx-auto">
						<div className="flex flex-col items-center text-center mb-8">
							<span className="section-eyebrow mb-3">More for you</span>
							<h2 className="text-2xl sm:text-3xl font-bold text-theme-text-primary mt-3">
								Where I've worked
							</h2>
							<p className="text-sm sm:text-base text-theme-text-secondary max-w-xl mx-auto mt-2">
								Companies and teams I've helped along the way.
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

			{/* Skills */}
			<SkillsSection />

			{/* CTA / newsletter equivalent */}
			<CTASection />
		</div>
	)
}

export default LandingPage
