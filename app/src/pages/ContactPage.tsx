import './contact-page.css'
import './pages.css'

function ContactPage() {
	return (
		<div className="contact-page">
			<header className="contact-header">
				<h1>Contact Me</h1>
				<p className="contact-subtitle">Let's connect and discuss opportunities</p>
			</header>

			<div className="contact-content">
				<div className="contact-info">
					<div className="contact-item">
						<h3>Email</h3>
						<a href="mailto:careers.kmavillanosa@gmail.com">
							careers.kmavillanosa@gmail.com
						</a>
					</div>

					<div className="contact-item">
						<h3>LinkedIn</h3>
						<a 
							href="https://linkedin.com/in/kmavillanosa" 
							target="_blank" 
							rel="noopener noreferrer"
						>
							linkedin.com/in/kmavillanosa
						</a>
					</div>

					<div className="contact-item">
						<h3>GitHub</h3>
						<a 
							href="https://github.com/kmavillanosa" 
							target="_blank" 
							rel="noopener noreferrer"
						>
							github.com/kmavillanosa
						</a>
					</div>

					<div className="contact-item">
						<h3>Location</h3>
						<p>Puerto Princesa City, Palawan, Philippines</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ContactPage

