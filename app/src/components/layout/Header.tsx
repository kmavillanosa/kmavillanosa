import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from '@/components/theme/ThemeToggle'

function Header() {
	const location = useLocation()
	const isLandingPage = location.pathname === '/'
	
	return (
		<nav 
			className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300 ${
				isLandingPage 
					? 'bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/30' 
					: 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm'
			}`}
		>
			<div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
				<Link 
					to="/" 
					className="flex items-center transition-opacity hover:opacity-80"
				>
					<img
						src="/kmavillanosa/cms/media/logo.jpg"
						alt="Kim Avillanosa"
						className="h-10 w-10 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
						onError={(e) => {
							;(e.target as HTMLImageElement).style.display = 'none'
						}}
					/>
				</Link>
				<div className="flex items-center space-x-4">
					<Link 
						to="/" 
						className={`px-3 py-2 transition-colors ${
							isLandingPage
								? 'text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white'
								: 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
						}`}
					>
						Home
					</Link>
					<Link 
						to="/portfolio" 
						className={`px-3 py-2 transition-colors ${
							isLandingPage
								? 'text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white'
								: 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
						}`}
					>
						Portfolio
					</Link>
					<ThemeToggle />
					<a 
						href="/kmavillanosa/cms/admin/index.html" 
						target="_blank"
						rel="noopener noreferrer"
						className={`px-2 py-1 text-sm transition-colors ${
							isLandingPage
								? 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
								: 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
						}`}
					>
						Admin
					</a>
				</div>
			</div>
		</nav>
	)
}

export default Header

