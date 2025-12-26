import { Link } from 'react-router-dom'
import { useSiteSettings } from '@/hooks/useSiteSettings'

function Header() {
	const { data: settings } = useSiteSettings()

	return (
		<header className="header">
			<nav className="nav">
				<Link to="/" className="logo">
					{settings?.title || 'Kim Avillanosa'}
				</Link>
				<div className="nav-links">
					<Link to="/">Home</Link>
					<Link to="/posts">Posts</Link>
				</div>
			</nav>
		</header>
	)
}

export default Header

