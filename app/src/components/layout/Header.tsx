import { Link } from 'react-router-dom'

function Header() {
	return (
		<nav className="bg-white border-b border-gray-200 shadow-sm px-4 py-4">
			<div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
				<Link to="/" className="text-xl font-semibold text-gray-900 hover:text-gray-600">
					Kim Avillanosa
				</Link>
				<div className="flex items-center space-x-4">
					<Link to="/" className="text-gray-700 hover:text-gray-900 px-3 py-2">
						Home
					</Link>
					<Link to="/portfolio" className="text-gray-700 hover:text-gray-900 px-3 py-2">
						Portfolio
					</Link>
					<a 
						href="/kmavillanosa/cms/admin/index.html" 
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-500 hover:text-gray-700 px-2 py-1 text-sm"
					>
						Admin
					</a>
				</div>
			</div>
		</nav>
	)
}

export default Header

