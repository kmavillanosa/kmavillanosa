import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function NavigationLoader() {
	const location = useLocation()
	const [loading, setLoading] = useState(false)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		// Set loading to true when location changes
		setLoading(true)
		setIsVisible(true)

		// Hide loader after a short delay (for smooth transitions)
		// This gives time for the new page to start rendering
		const hideTimer = setTimeout(() => {
			setIsVisible(false)
			// Wait for fade out animation before removing from DOM
			setTimeout(() => {
				setLoading(false)
			}, 300)
		}, 150)

		return () => clearTimeout(hideTimer)
	}, [location.pathname])

	if (!loading) return null

	return (
		<div 
			className={`fixed inset-0 z-[100] flex items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transition-opacity duration-300 ${
				isVisible ? 'opacity-100' : 'opacity-0'
			}`}
		>
			<div className="flex flex-col items-center gap-4">
				{/* Custom spinner with green theme */}
				<div className="relative w-16 h-16">
					<div className="absolute inset-0 border-4 border-green-200 dark:border-green-800 rounded-full"></div>
					<div className="absolute inset-0 border-4 border-green-600 dark:border-green-400 border-t-transparent rounded-full animate-spin"></div>
				</div>
				<p className="text-sm font-semibold text-gray-700 dark:text-gray-300 animate-pulse">
					Loading...
				</p>
			</div>
		</div>
	)
}

export default NavigationLoader

