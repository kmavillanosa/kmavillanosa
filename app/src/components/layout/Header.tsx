import { Link } from 'react-router-dom'

function Header() {
	return (
		<nav className="bg-gray-900 border-b border-gray-700 px-4 py-4">
			<div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
				<Link to="/" className="text-xl font-semibold text-white hover:text-gray-300">
					Kim Avillanosa
				</Link>
				<div className="flex items-center space-x-4">
					<Link to="/" className="text-white hover:text-gray-300 px-3 py-2">
						Home
					</Link>
					<Link to="/portfolio" className="text-white hover:text-gray-300 px-3 py-2">
						Portfolio
					</Link>
					<a 
						href="/kmavillanosa/cms/admin/index.html" 
						target="_blank"
						rel="noopener noreferrer"
						className="text-white hover:text-gray-300 px-3 py-2"
					>
						CMS Admin
					</a>
				</div>
			</div>
		</nav>
	)
}

export default Header

