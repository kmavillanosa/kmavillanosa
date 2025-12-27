import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react'
import { useSiteSettings } from '@/hooks/useSiteSettings'

function CTASection() {
	const { data: siteSettings } = useSiteSettings()

	const handleDownloadResume = () => {
		const resumeUrl = siteSettings?.resumeUrl || 'http://88.222.245.88/resume/'
		window.open(resumeUrl, '_blank')
	}

	return (
		<section className="py-20 px-4 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 dark:from-green-800 dark:via-emerald-800 dark:to-green-900 relative overflow-hidden">
			{/* Decorative background elements */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
				<div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
			</div>

			<div className="max-w-4xl mx-auto text-center relative z-10">
				<div className="mb-8">
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
						{siteSettings?.cta?.title || "Ready to Build Something Amazing?"}
					</h2>
					<p className="text-xl md:text-2xl text-green-50 dark:text-green-100 mb-8 leading-relaxed">
						{siteSettings?.cta?.description || "I'm actively seeking new opportunities to create impactful solutions. Let's discuss how I can contribute to your team's success."}
					</p>
				</div>

				<div className="flex flex-wrap gap-4 justify-center">
					<Button
						onClick={handleDownloadResume}
						size="xl"
						className="px-8 py-4 bg-white text-green-600 font-semibold text-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-lg active:scale-95"
					>
						<span className="flex items-center gap-2.5">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							Download Resume
						</span>
					</Button>
					<Button
						as={Link}
						to="/contact"
						outline
						size="xl"
						className="px-8 py-4 border-2 border-white text-white font-semibold text-lg transition-all duration-200 hover:bg-white hover:text-green-600 hover:border-white active:scale-95"
					>
						<span className="flex items-center gap-2.5">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
							</svg>
							Get In Touch
						</span>
					</Button>
					<Button
						href="https://linkedin.com/in/kmavillanosa"
						target="_blank"
						rel="noopener noreferrer"
						outline
						size="xl"
						as="a"
						className="px-8 py-4 border-2 border-white text-white font-semibold text-lg transition-all duration-200 hover:bg-white hover:text-green-600 hover:border-white active:scale-95"
					>
						<span className="flex items-center gap-2.5">
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
							</svg>
							Connect on LinkedIn
						</span>
					</Button>
				</div>

				{siteSettings?.cta?.availability && (
					<div className="mt-12 pt-8 border-t border-green-500/30">
						<p className="text-green-100 dark:text-green-200 text-sm">
							📍 {siteSettings.cta.availability}
						</p>
					</div>
				)}
			</div>
		</section>
	)
}

export default CTASection

