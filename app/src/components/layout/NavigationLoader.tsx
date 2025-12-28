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
			className={`fixed inset-0 z-[100] flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl transition-all duration-500 ${
				isVisible ? 'opacity-100' : 'opacity-0'
			}`}
			style={{
				backdropFilter: 'blur(12px)',
				WebkitBackdropFilter: 'blur(12px)',
			}}
		>
			{/* Animated background gradient orbs */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-400/20 dark:bg-green-500/20 rounded-full blur-3xl animate-blob"></div>
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/20 dark:bg-emerald-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
				<div className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-400/20 dark:bg-teal-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
			</div>

			<div className="flex flex-col items-center gap-6 relative z-10">
				{/* Multi-layered animated spinner */}
				<div className="relative w-20 h-20">
					{/* Outer ring */}
					<div className="absolute inset-0 border-4 border-green-200/50 dark:border-green-800/50 rounded-full"></div>
					<div className="absolute inset-0 border-4 border-green-600 dark:border-green-400 border-t-transparent rounded-full animate-spin" style={{ animationDuration: '1s' }}></div>
					
					{/* Middle ring */}
					<div className="absolute inset-2 border-4 border-emerald-200/50 dark:border-emerald-800/50 rounded-full"></div>
					<div className="absolute inset-2 border-4 border-emerald-600 dark:border-emerald-400 border-r-transparent rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
					
					{/* Inner ring */}
					<div className="absolute inset-4 border-4 border-teal-200/50 dark:border-teal-800/50 rounded-full"></div>
					<div className="absolute inset-4 border-4 border-teal-600 dark:border-teal-400 border-b-transparent rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
					
					{/* Center dot */}
					<div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-green-600 dark:bg-green-400 rounded-full animate-pulse"></div>
				</div>

				{/* Animated loading text with dots */}
				<div className="flex items-center gap-2">
					<p className="text-base font-semibold text-gray-800 dark:text-gray-200">
						Loading
					</p>
					<div className="flex gap-1">
						<span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1s' }}></span>
						<span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '1s' }}></span>
						<span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '1s' }}></span>
					</div>
				</div>

				{/* Progress bar */}
				<div className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
					<div className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full animate-progress"></div>
				</div>
			</div>
		</div>
	)
}

export default NavigationLoader

