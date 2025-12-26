import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react'

function LandingPage() {
	const handleDownloadResume = () => {
		window.open('http://88.222.245.88/resume/', '_blank')
	}

	return (
		<div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4 py-8">
			<section className="text-center max-w-4xl w-full">
				<div className="flex flex-col items-center gap-6">
					<h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
						Kim Avillanosa
					</h1>
					<p className="text-xl md:text-2xl text-gray-400">Software Engineer</p>
					<div className="flex flex-wrap gap-4 justify-center mt-4">
						<Button 
							onClick={handleDownloadResume}
							gradientDuoTone="purpleToBlue"
							size="xl"
						>
							Download Resume
						</Button>
						<Button 
							href="https://linkedin.com/in/kmavillanosa" 
							target="_blank" 
							rel="noopener noreferrer"
							outline
							gradientDuoTone="purpleToBlue"
							size="xl"
							as="a"
						>
							LinkedIn
						</Button>
						<Button 
							href="https://github.com/kmavillanosa" 
							target="_blank" 
							rel="noopener noreferrer"
							outline
							gradientDuoTone="purpleToBlue"
							size="xl"
							as="a"
						>
							GitHub
						</Button>
						<Button 
							as={Link}
							to="/contact"
							outline
							gradientDuoTone="purpleToBlue"
							size="xl"
						>
							Contact Me
						</Button>
					</div>
				</div>
			</section>
		</div>
	)
}

export default LandingPage

