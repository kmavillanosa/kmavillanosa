import { Link } from 'react-router-dom'
import './landing-page.css'
import './pages.css'

function LandingPage() {
	const handleDownloadResume = () => {
		window.open('http://88.222.245.88/resume/', '_blank')
	}

	return (
		<div className="landing-page">
			<section className="hero-section">
				<div className="hero-content">
					<h1 className="hero-name">Kim Avillanosa</h1>
					<p className="hero-title">Software Engineer</p>
					<div className="hero-buttons">
						<button 
							onClick={handleDownloadResume}
							className="btn btn-primary"
						>
							Download Resume
						</button>
						<a 
							href="https://linkedin.com/in/kmavillanosa" 
							target="_blank" 
							rel="noopener noreferrer"
							className="btn btn-secondary"
						>
							LinkedIn
						</a>
						<a 
							href="https://github.com/kmavillanosa" 
							target="_blank" 
							rel="noopener noreferrer"
							className="btn btn-secondary"
						>
							GitHub
						</a>
						<Link 
							to="/contact"
							className="btn btn-secondary"
						>
							Contact Me
						</Link>
					</div>
				</div>
			</section>
		</div>
	)
}

export default LandingPage

