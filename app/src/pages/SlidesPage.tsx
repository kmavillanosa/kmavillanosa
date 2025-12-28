function SlidesPage() {
	return (
		<div className="max-w-5xl mx-auto px-4 py-12 pt-4">
			<header className="text-center mb-16">
				<div className="inline-block mb-4">
					<span className="text-green-600 dark:text-green-400 font-semibold text-sm uppercase tracking-wider">Presentations</span>
				</div>
				<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">Slides</h1>
				<p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
					View my interview presentations and portfolio slides.
				</p>
			</header>

			<div className="mb-8">
				<div 
					style={{
						position: 'relative',
						width: '100%',
						height: 0,
						paddingTop: '56.2500%',
						paddingBottom: 0,
						boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
						marginTop: '1.6em',
						marginBottom: '0.9em',
						overflow: 'hidden',
						borderRadius: '8px',
						willChange: 'transform',
					}}
				>
					<iframe
						loading="lazy"
						style={{
							position: 'absolute',
							width: '100%',
							height: '100%',
							top: 0,
							left: 0,
							border: 'none',
							padding: 0,
							margin: 0,
						}}
						src="https://www.canva.com/design/DAFyu0CbJXg/HYr9u2Zv-XBSuB3s3SMW2w/view?embed"
						allowFullScreen
						allow="fullscreen"
						title="Kim Avillanosa Interview Presentation"
					/>
				</div>
				<a
					href="https://www.canva.com/design/DAFyu0CbJXg/HYr9u2Zv-XBSuB3s3SMW2w/view?utm_content=DAFyu0CbJXg&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm block mt-4"
				>
					Kim Avillanosa Interview Presentation
				</a>
				<p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
					by Kim Cyriel Avillanosa
				</p>
			</div>
		</div>
	)
}

export default SlidesPage

