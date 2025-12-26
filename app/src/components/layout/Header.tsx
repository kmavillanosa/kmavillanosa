import { Link } from 'react-router-dom'

function Header() {
	return (
		<header className="header">
			<nav className="nav">
				<Link to="/" className="logo">
					Kim Avillanosa
				</Link>
				<div className="nav-links">
					<Link to="/">Home</Link>
					<Link to="/portfolio">Portfolio</Link>
					<a 
						href="/kmavillanosa/cms/admin/index.html" 
						target="_blank"
						rel="noopener noreferrer"
					>
						CMS Admin
					</a>
				</div>
			</nav>
		</header>
	)
}

export default Header

