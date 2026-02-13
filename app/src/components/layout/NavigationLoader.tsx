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
			}, 500)
		}, 150)

		return () => clearTimeout(hideTimer)
	}, [location.pathname])

	if (!loading) return null

	return (
		<div 
			className={`fixed inset-0 z-[100] flex items-center justify-center bg-white/90 dark:bg-[var(--theme-bg-page)]/90 backdrop-blur-xl transition-all duration-500 ${
				isVisible ? 'opacity-100' : 'opacity-0'
			}`}
			style={{
				backdropFilter: 'blur(16px)',
				WebkitBackdropFilter: 'blur(16px)',
			}}
		>
			<div className="flex flex-col items-center gap-5 relative z-10">
				{/* Simplified single spinner with better contrast */}
				<div className="relative w-16 h-16">
					{/* Outer ring - static background */}
					<div className="absolute inset-0 border-4 border-green-200 dark:border-green-800/60 rounded-full"></div>
					{/* Animated ring - visible in both light and dark mode */}
					<div className="absolute inset-0 border-4 border-green-600 dark:!border-green-400 border-t-transparent rounded-full animate-spin"></div>
				</div>

				{/* Simple loading text */}
				<p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
					Loading...
				</p>
			</div>
		</div>
	)
}

export default NavigationLoader

