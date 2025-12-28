import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ThemeToggle from '@/components/theme/ThemeToggle'

function Header() {
	const location = useLocation()
	const isLandingPage = location.pathname === '/'
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	// Close menu when route changes
	useEffect(() => {
		setIsMenuOpen(false)
	}, [location.pathname])

	// Close menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement
			if (isMenuOpen && !target.closest('nav')) {
				setIsMenuOpen(false)
			}
		}

		if (isMenuOpen) {
			document.addEventListener('click', handleClickOutside)
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}

		return () => {
			document.removeEventListener('click', handleClickOutside)
			document.body.style.overflow = ''
		}
	}, [isMenuOpen])

	return (
		<nav 
			className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 md:py-4 transition-all duration-300 ${
				isLandingPage 
					? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 md:bg-white/10 md:dark:bg-gray-900/10 md:border-b md:border-gray-200/20 md:dark:border-gray-700/30' 
					: 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm'
			}`}
		>
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<Link 
					to="/" 
					className="flex items-center transition-opacity hover:opacity-80 gap-2 z-10"
					onClick={() => setIsMenuOpen(false)}
				>
					<img
						src="/kmavillanosa/cms/media/logo.png"
						alt="Kim Avillanosa"
						className="h-10 md:h-12 lg:h-14 w-auto object-contain"
						style={{ maxHeight: '56px' }}
						onError={(e) => {
							;(e.target as HTMLImageElement).style.display = 'none'
						}}
					/>
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden md:flex items-center space-x-4">
					<Link 
						to="/" 
						className={`px-3 py-2 transition-colors rounded-lg ${
							isLandingPage
								? 'text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white'
								: 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
						}`}
					>
						Home
					</Link>
					<Link 
						to="/portfolio" 
						className={`px-3 py-2 transition-colors rounded-lg ${
							isLandingPage
								? 'text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white'
								: 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
						}`}
					>
						Portfolio
					</Link>
					<Link 
						to="/slides" 
						className={`px-3 py-2 transition-colors rounded-lg ${
							isLandingPage
								? 'text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white'
								: 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
						}`}
					>
						Slides
					</Link>
					<ThemeToggle />
					<a 
						href="/kmavillanosa/cms/admin/index.html" 
						target="_blank"
						rel="noopener noreferrer"
						className={`px-2 py-1 text-sm transition-colors rounded-lg ${
							isLandingPage
								? 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
								: 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
						}`}
					>
						Admin
					</a>
				</div>

				{/* Mobile Menu Button */}
				<div className="md:hidden flex items-center gap-3">
					<ThemeToggle />
					<button
						onClick={(e) => {
							e.stopPropagation()
							setIsMenuOpen(!isMenuOpen)
						}}
						className={`p-2.5 rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center ${
							isLandingPage
								? 'text-gray-800 dark:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 bg-white/50 dark:bg-gray-800/50'
								: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
						}`}
						aria-label="Toggle menu"
						aria-expanded={isMenuOpen}
					>
						{isMenuOpen ? (
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						) : (
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						)}
					</button>
				</div>

				{/* Mobile Menu Overlay */}
				{isMenuOpen && (
					<>
						<div 
							className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden"
							onClick={() => setIsMenuOpen(false)}
						/>
						<div className={`mobile-menu-sidebar fixed top-0 right-0 bottom-0 w-64 z-[70] bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 md:hidden border-l border-gray-200 dark:border-gray-700 ${
							isMenuOpen ? 'translate-x-0' : 'translate-x-full'
						}`}>
							<div className="flex flex-col h-full pt-20 px-4 overflow-y-auto">
								<Link 
									to="/" 
									className={`px-4 py-3 text-lg font-medium transition-colors rounded-lg mb-2 ${
										isLandingPage
											? 'text-gray-800 dark:text-gray-200 bg-green-50 dark:bg-green-900/20'
											: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
									}`}
									onClick={() => setIsMenuOpen(false)}
								>
									Home
								</Link>
								<Link 
									to="/portfolio" 
									className="px-4 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-lg mb-2"
									onClick={() => setIsMenuOpen(false)}
								>
									Portfolio
								</Link>
								<Link 
									to="/slides" 
									className="px-4 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-lg mb-2"
									onClick={() => setIsMenuOpen(false)}
								>
									Slides
								</Link>
								<a 
									href="/kmavillanosa/cms/admin/index.html" 
									target="_blank"
									rel="noopener noreferrer"
									className="px-4 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-lg mb-2"
									onClick={() => setIsMenuOpen(false)}
								>
									Admin
								</a>
							</div>
						</div>
					</>
				)}
			</div>
		</nav>
	)
}

export default Header

