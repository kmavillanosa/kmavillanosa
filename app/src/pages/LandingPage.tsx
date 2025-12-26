import { Link } from 'react-router-dom'
import { Button, Spinner } from 'flowbite-react'
import { usePages } from '@/hooks/usePages'
import { useExperiences } from '@/hooks/useExperiences'
import PortfolioCard from '@/components/portfolio/PortfolioCard'
import ExperienceCard from '@/components/experience/ExperienceCard'
import ServicesSection from '@/components/services/ServicesSection'

function LandingPage() {
	const { data: pages, loading: pagesLoading } = usePages()
	const { data: experiences, loading: experiencesLoading } = useExperiences()
	const featuredPages = pages.slice(0, 6) // Show up to 6 featured projects

	const handleDownloadResume = () => {
		window.open('http://88.222.245.88/resume/', '_blank')
	}

	const scrollToServices = () => {
		const servicesSection = document.getElementById('services-section')
		servicesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative flex items-center justify-center min-h-[calc(100vh-200px)] px-4 py-20 overflow-hidden bg-white dark:bg-gray-900">
				{/* Decorative background elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-20 left-10 w-72 h-72 bg-purple-100 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-blob"></div>
					<div className="absolute top-40 right-10 w-72 h-72 bg-blue-100 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000"></div>
					<div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-100 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-blob animation-delay-4000"></div>
				</div>

				<div className="text-center max-w-5xl w-full relative z-10">
					<div className="flex flex-col items-center gap-8 animate-fade-in">
						{/* Badge */}
						<div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-full text-sm text-purple-700 dark:text-purple-300 font-medium shadow-sm">
							<svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
							</svg>
							<span className="whitespace-nowrap">Available for opportunities</span>
						</div>

						<h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent animate-gradient leading-tight">
							Kim Avillanosa
						</h1>
						
						<div className="space-y-4">
							<p className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">Software Engineer</p>
							<p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
								I make cool stuff for a living. Building innovative solutions and bringing ideas to life through code.
							</p>
						</div>

						<div className="flex flex-wrap gap-4 justify-center mt-8">
							<Button 
								onClick={handleDownloadResume}
								color="purple"
								size="xl"
								className="px-6 py-3.5 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl group"
							>
								<span className="flex items-center gap-2.5">
									<svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
									</svg>
									<span>Download Resume</span>
								</span>
							</Button>
							<Button 
								href="https://linkedin.com/in/kmavillanosa" 
								target="_blank" 
								rel="noopener noreferrer"
								outline
								color="purple"
								size="xl"
								as="a"
								className="px-6 py-3.5 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
							>
								<span className="flex items-center gap-2.5">
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
									</svg>
									<span>LinkedIn</span>
								</span>
							</Button>
							<Button 
								href="https://github.com/kmavillanosa" 
								target="_blank" 
								rel="noopener noreferrer"
								outline
								color="purple"
								size="xl"
								as="a"
								className="px-6 py-3.5 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
							>
								<span className="flex items-center gap-2.5">
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
									</svg>
									<span>GitHub</span>
								</span>
							</Button>
							<Button 
								as={Link}
								to="/contact"
								outline
								color="purple"
								size="xl"
								className="px-6 py-3.5 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
							>
								<span className="flex items-center gap-2.5">
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
									</svg>
									<span>Contact Me</span>
								</span>
							</Button>
						</div>

						<button
							onClick={scrollToServices}
							className="mt-12 flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
						>
							<span className="text-sm font-medium">What I Offer</span>
							<svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
							</svg>
						</button>
					</div>
				</div>
			</section>

			{/* Services Section */}
			<ServicesSection />

			{/* Portfolio Section */}
			{featuredPages.length > 0 && (
				<section id="portfolio-section" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
					<div className="max-w-7xl mx-auto">
						<div className="text-center mb-16">
							<div className="inline-block mb-4">
								<span className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-wider">Portfolio</span>
							</div>
							<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
								Featured Work
							</h2>
							<p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
								Explore some of my recent projects and contributions. Each project represents a unique challenge and creative solution.
							</p>
						</div>

						{pagesLoading ? (
							<div className="flex justify-center items-center min-h-[400px]">
								<Spinner size="xl" />
							</div>
						) : (
							<>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
											color="purple"
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
				<section id="experience-section" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
					<div className="max-w-7xl mx-auto">
						<div className="text-center mb-16">
							<div className="inline-block mb-4">
								<span className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-wider">Experience</span>
							</div>
							<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
								Professional Journey
							</h2>
							<p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
								My career path and the companies I've had the privilege to work with.
							</p>
						</div>

						{experiencesLoading ? (
							<div className="flex justify-center items-center min-h-[400px]">
								<Spinner size="xl" />
							</div>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
		</div>
	)
}

export default LandingPage

