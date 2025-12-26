gimport { Card } from 'flowbite-react'

function ContactPage() {
	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<header className="text-center mb-12">
				<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Me</h1>
				<p className="text-xl text-gray-600">Let's connect and discuss opportunities</p>
			</header>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card className="bg-white border-gray-200">
					<h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
					<a 
						href="mailto:careers.kmavillanosa@gmail.com"
						className="text-blue-600 hover:text-blue-700"
					>
						careers.kmavillanosa@gmail.com
					</a>
				</Card>

				<Card className="bg-white border-gray-200">
					<h3 className="text-xl font-semibold text-gray-900 mb-2">LinkedIn</h3>
					<a 
						href="https://linkedin.com/in/kmavillanosa" 
						target="_blank" 
						rel="noopener noreferrer"
						className="text-blue-600 hover:text-blue-700"
					>
						linkedin.com/in/kmavillanosa
					</a>
				</Card>

				<Card className="bg-white border-gray-200">
					<h3 className="text-xl font-semibold text-gray-900 mb-2">GitHub</h3>
					<a 
						href="https://github.com/kmavillanosa" 
						target="_blank" 
						rel="noopener noreferrer"
						className="text-blue-600 hover:text-blue-700"
					>
						github.com/kmavillanosa
					</a>
				</Card>

				<Card className="bg-white border-gray-200">
					<h3 className="text-xl font-semibold text-gray-900 mb-2">Location</h3>
					<p className="text-gray-700">Puerto Princesa City, Palawan, Philippines</p>
				</Card>
			</div>
		</div>
	)
}

export default ContactPage

