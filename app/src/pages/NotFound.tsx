import { Link } from 'react-router-dom'
import './pages.css'

function NotFound() {
	return (
		<div className="not-found">
			<h1>404</h1>
			<p>Page not found</p>
			<Link to="/">← Back to Home</Link>
		</div>
	)
}

export default NotFound

