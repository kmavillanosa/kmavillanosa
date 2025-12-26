import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react'

function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
			<h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
			<p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Page not found</p>
			<Button as={Link} to="/" color="purple" size="xl">
				← Back to Home
			</Button>
		</div>
	)
}

export default NotFound

