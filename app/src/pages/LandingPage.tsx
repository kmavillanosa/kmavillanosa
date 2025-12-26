import { Link } from 'react-router-dom'
import { Button, Card, Spinner } from 'flowbite-react'
import { usePages } from '@/hooks/usePages'
import { extractFirstImage } from '@/utils/markdown-utils'

function LandingPage() {
	const { data: pages, loading } = usePages()
	const featuredPages = pages.slice(0, 6) // Show up to 6 featured projects

	const handleDownloadResume = () => {
		window.open('http://88.222.245.88/resume/', '_blank')
	}

	const scrollToPortfolio = () => {
		const portfolioSection = document.getElementById('portfolio-section')
		portfolioSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4 py-16">
				<div className="text-center max-w-4xl w-full">
					<div className="flex flex-col items-center gap-6 animate-fade-in">
						<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
							Kim Avillanosa
						</h1>
						<p className="text-xl md:text-2xl text-gray-400">Software Engineer</p>
						<p className="text-lg text-gray-500 max-w-2xl">
							I make cool stuff for a living. Building innovative solutions and bringing ideas to life.
						</p>
						<div className="flex flex-wrap gap-4 justify-center mt-6">
							<Button 
								onClick={handleDownloadResume}
								color="purple"
								size="xl"
								className="transition-transform hover:scale-105"
							>
								Download Resume
							</Button>
							<Button 
								href="https://linkedin.com/in/kmavillanosa" 
								target="_blank" 
								rel="noopener noreferrer"
								outline
								color="purple"
								size="xl"
								as="a"
								className="transition-transform hover:scale-105"
							>
								LinkedIn
							</Button>
							<Button 
								href="https://github.com/kmavillanosa" 
								target="_blank" 
								rel="noopener noreferrer"
								outline
								color="purple"
								size="xl"
								as="a"
								className="transition-transform hover:scale-105"
							>
								GitHub
							</Button>
							<Button 
								as={Link}
								to="/contact"
								outline
								color="purple"
								size="xl"
								className="transition-transform hover:scale-105"
							>
								Contact Me
							</Button>
						</div>
						{featuredPages.length > 0 && (
							<Button
								onClick={scrollToPortfolio}
								outline
								color="gray"
								size="lg"
								className="mt-8 transition-transform hover:scale-105"
							>
								View My Work ↓
							</Button>
						)}
					</div>
				</div>
			</section>

			{/* Portfolio Section */}
			{featuredPages.length > 0 && (
				<section id="portfolio-section" className="py-16 px-4 bg-gray-800/50">
					<div className="max-w-7xl mx-auto">
						<div className="text-center mb-12">
							<h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
								Featured Work
							</h2>
							<p className="text-xl text-gray-400 max-w-2xl mx-auto">
								Explore some of my recent projects and contributions
							</p>
						</div>

						{loading ? (
							<div className="flex justify-center items-center min-h-[400px]">
								<Spinner size="xl" />
							</div>
						) : (
							<>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
									{featuredPages.map((page) => {
										const previewImage = extractFirstImage(page.body)
										
										return (
											<a
												key={page.slug}
												href={`/kmavillanosa/portfolio/${page.slug}`}
												target="_blank"
												rel="noopener noreferrer"
												className="block h-full group"
											>
												<Card 
													className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 bg-gray-900 border-gray-700 overflow-hidden"
												>
													{previewImage && (
														<div className="h-48 w-full overflow-hidden">
															<img 
																src={previewImage} 
																alt={page.title}
																className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
															/>
														</div>
													)}
													<div className="p-5">
														<h5 className="text-2xl font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors mb-2">
															{page.title}
														</h5>
														{page.description && (
															<p className="font-normal text-gray-400 line-clamp-3 mb-2">
																{page.description}
															</p>
														)}
														{page.date && (
															<p className="text-sm text-gray-500">
																{new Date(page.date).toLocaleDateString('en-US', {
																	year: 'numeric',
																	month: 'long',
																	day: 'numeric',
																})}
															</p>
														)}
													</div>
												</Card>
											</a>
										)
									})}
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
		</div>
	)
}

export default LandingPage

