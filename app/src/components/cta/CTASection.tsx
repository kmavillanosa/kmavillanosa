import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react'
import { useSiteSettings } from '@/hooks/useSiteSettings'

function CTASection() {
	const { data: siteSettings } = useSiteSettings()

	const handleDownloadResume = () => {
		const resumeUrl = siteSettings?.resumeUrl || 'https://kmavillanosa.github.io/kmavillanosa/cv/Kim_Cyriel_S._Avillanosa_CV.pdf'
		window.open(resumeUrl, '_blank')
	}

	return (
		<section id="cta-section" className="py-12 sm:py-14 px-4 sm:px-6 bg-theme-cta-bg">
			<div className="max-w-2xl mx-auto text-center">
				<div className="mb-6">
					<h2 className="text-xl sm:text-2xl font-bold text-theme-accent-foreground mb-2">
						{siteSettings?.cta?.title || "Ready to work together?"}
					</h2>
					<p className="text-sm text-white/90">
						{siteSettings?.cta?.description || "Open to new opportunities. Let's talk."}
					</p>
				</div>

				<div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
					<Button
						onClick={handleDownloadResume}
						className="w-full sm:w-auto px-4 py-2.5 bg-theme-accent-foreground text-theme-cta-bg font-medium text-sm rounded-md border-0 hover:opacity-90 transition-opacity"
					>
						<span className="flex items-center gap-2">
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							Download CV
						</span>
					</Button>
					<Button
						as={Link}
						to="/contact"
						className="w-full sm:w-auto px-4 py-2.5 bg-transparent border border-white text-white font-medium text-sm rounded-md hover:bg-white hover:text-theme-cta-bg transition-colors"
					>
						<span className="flex items-center justify-center gap-2">
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
							</svg>
							Get In Touch
						</span>
					</Button>
					<Button
						href="https://linkedin.com/in/kmavillanosa"
						target="_blank"
						rel="noopener noreferrer"
						as="a"
						className="w-full sm:w-auto px-4 py-2.5 bg-transparent border border-white text-white font-medium text-sm rounded-md hover:bg-white hover:text-theme-cta-bg transition-colors"
					>
						<span className="flex items-center gap-2">
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
							</svg>
							LinkedIn
						</span>
					</Button>
				</div>

				<p className="mt-6 text-white/80 text-xs">
					Open to new opportunities
				</p>
			</div>
		</section>
	)
}

export default CTASection

