const CALENDLY_URL = 'https://calendly.com/careers-kmavillanosa/30min'

const cardBase =
	'group relative rounded-xl border border-theme bg-theme-surface p-5 sm:p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-theme-accent/30'

function ContactCard({
	href,
	children,
	className = '',
}: {
	href?: string
	children: React.ReactNode
	className?: string
}) {
	const classes = `${cardBase} ${className}`.trim()
	if (href) {
		return (
			<a
				href={href}
				target={href.startsWith('http') ? '_blank' : undefined}
				rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
				className={`block ${classes}`}
			>
				{children}
			</a>
		)
	}
	return <div className={classes}>{children}</div>
}

function ContactPage() {
	return (
		<div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pt-4">
			<header className="text-center mb-12 sm:mb-16">
				<div className="inline-block mb-4">
					<span className="text-theme-accent font-semibold text-sm uppercase tracking-wider">
						Get In Touch
					</span>
				</div>
				<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-theme-text-primary mb-4 sm:mb-6">
					Contact Me
				</h1>
				<p className="text-lg sm:text-xl text-theme-text-secondary max-w-2xl mx-auto leading-relaxed px-4">
					Let's connect and discuss opportunities. I'm always open to new projects and collaborations.
				</p>
			</header>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
				{/* Schedule a call — primary CTA */}
				<ContactCard href={CALENDLY_URL} className="md:col-span-2 border-theme-accent/40 bg-theme-elevated/50">
					<div className="flex flex-col sm:flex-row sm:items-center gap-4">
						<div className="flex-shrink-0 w-14 h-14 rounded-xl bg-theme-accent/15 flex items-center justify-center text-theme-accent group-hover:bg-theme-accent/20 transition-colors">
							<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
						</div>
						<div className="flex-1 min-w-0">
							<h3 className="text-xl font-semibold text-theme-text-primary mb-1">Schedule a call</h3>
							<p className="text-theme-text-secondary text-sm sm:text-base">
								Book a 30-minute video call. Pick a time that works for you.
							</p>
						</div>
						<span className="flex-shrink-0 inline-flex items-center gap-1.5 text-theme-accent font-medium text-sm group-hover:gap-2 transition-all">
							Book now
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</span>
					</div>
				</ContactCard>

				<ContactCard href="mailto:careers.kmavillanosa@gmail.com">
					<div className="flex items-start gap-4">
						<div className="flex-shrink-0 w-12 h-12 rounded-xl bg-theme-elevated flex items-center justify-center text-theme-accent group-hover:bg-theme-accent/10 transition-colors">
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
							</svg>
						</div>
						<div className="flex-1 min-w-0">
							<h3 className="text-lg font-semibold text-theme-text-primary mb-1">Email</h3>
							<span className="text-theme-accent text-sm sm:text-base break-all group-hover:underline">
								careers.kmavillanosa@gmail.com
							</span>
						</div>
					</div>
				</ContactCard>

				<ContactCard href="https://linkedin.com/in/kmavillanosa">
					<div className="flex items-start gap-4">
						<div className="flex-shrink-0 w-12 h-12 rounded-xl bg-theme-elevated flex items-center justify-center text-theme-accent group-hover:bg-theme-accent/10 transition-colors">
							<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
							</svg>
						</div>
						<div className="flex-1 min-w-0">
							<h3 className="text-lg font-semibold text-theme-text-primary mb-1">LinkedIn</h3>
							<span className="text-theme-accent text-sm sm:text-base group-hover:underline">
								linkedin.com/in/kmavillanosa
							</span>
						</div>
					</div>
				</ContactCard>

				<ContactCard href="https://github.com/kmavillanosa">
					<div className="flex items-start gap-4">
						<div className="flex-shrink-0 w-12 h-12 rounded-xl bg-theme-elevated flex items-center justify-center text-theme-text-secondary group-hover:text-theme-accent transition-colors">
							<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
							</svg>
						</div>
						<div className="flex-1 min-w-0">
							<h3 className="text-lg font-semibold text-theme-text-primary mb-1">GitHub</h3>
							<span className="text-theme-accent text-sm sm:text-base group-hover:underline">
								github.com/kmavillanosa
							</span>
						</div>
					</div>
				</ContactCard>

				<ContactCard>
					<div className="flex items-start gap-4">
						<div className="flex-shrink-0 w-12 h-12 rounded-xl bg-theme-elevated flex items-center justify-center text-theme-accent">
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</div>
						<div className="flex-1 min-w-0">
							<h3 className="text-lg font-semibold text-theme-text-primary mb-1">Location</h3>
							<p className="text-theme-text-secondary text-sm sm:text-base">
								Puerto Princesa City, Palawan, Philippines
							</p>
						</div>
					</div>
				</ContactCard>
			</div>
		</div>
	)
}

export default ContactPage

