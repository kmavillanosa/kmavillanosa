import { Link } from 'react-router-dom'
import ThemeToggle from '@/components/theme/ThemeToggle'

function Header() {
	return (
		<nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm px-4 py-4">
			<div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
				<Link to="/" className="text-xl font-semibold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
					Kim Avillanosa
				</Link>
				<div className="flex items-center space-x-4">
					<Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2">
						Home
					</Link>
					<Link to="/portfolio" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2">
						Portfolio
					</Link>
					<ThemeToggle />
					<a 
						href="/kmavillanosa/cms/admin/index.html" 
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 px-2 py-1 text-sm"
					>
						Admin
					</a>
				</div>
			</div>
		</nav>
	)
}

export default Header

