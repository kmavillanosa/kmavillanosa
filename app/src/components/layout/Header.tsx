import { Link } from 'react-router-dom'
import { Navbar } from 'flowbite-react'

function Header() {
	return (
		<Navbar fluid className="bg-gray-900 border-b border-gray-700">
			<Navbar.Brand as={Link} to="/">
				<span className="self-center whitespace-nowrap text-xl font-semibold text-white">
					Kim Avillanosa
				</span>
			</Navbar.Brand>
			<Navbar.Toggle />
			<Navbar.Collapse>
				<Navbar.Link as={Link} to="/" className="text-white hover:text-gray-300">
					Home
				</Navbar.Link>
				<Navbar.Link as={Link} to="/portfolio" className="text-white hover:text-gray-300">
					Portfolio
				</Navbar.Link>
				<Navbar.Link 
					href="/kmavillanosa/cms/admin/index.html" 
					target="_blank"
					rel="noopener noreferrer"
					className="text-white hover:text-gray-300"
				>
					CMS Admin
				</Navbar.Link>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Header

