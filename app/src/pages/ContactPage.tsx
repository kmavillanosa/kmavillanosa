import { Card } from 'flowbite-react'

function ContactPage() {
	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<header className="text-center mb-12">
				<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Me</h1>
				<p className="text-xl text-gray-400">Let's connect and discuss opportunities</p>
			</header>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card className="bg-gray-800 border-gray-700">
					<h3 className="text-xl font-semibold text-white mb-2">Email</h3>
					<a 
						href="mailto:careers.kmavillanosa@gmail.com"
						className="text-blue-400 hover:text-blue-300"
					>
						careers.kmavillanosa@gmail.com
					</a>
				</Card>

				<Card className="bg-gray-800 border-gray-700">
					<h3 className="text-xl font-semibold text-white mb-2">LinkedIn</h3>
					<a 
						href="https://linkedin.com/in/kmavillanosa" 
						target="_blank" 
						rel="noopener noreferrer"
						className="text-blue-400 hover:text-blue-300"
					>
						linkedin.com/in/kmavillanosa
					</a>
				</Card>

				<Card className="bg-gray-800 border-gray-700">
					<h3 className="text-xl font-semibold text-white mb-2">GitHub</h3>
					<a 
						href="https://github.com/kmavillanosa" 
						target="_blank" 
						rel="noopener noreferrer"
						className="text-blue-400 hover:text-blue-300"
					>
						github.com/kmavillanosa
					</a>
				</Card>

				<Card className="bg-gray-800 border-gray-700">
					<h3 className="text-xl font-semibold text-white mb-2">Location</h3>
					<p className="text-gray-300">Puerto Princesa City, Palawan, Philippines</p>
				</Card>
			</div>
		</div>
	)
}

export default ContactPage

