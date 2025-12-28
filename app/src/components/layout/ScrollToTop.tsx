import { useState, useEffect } from 'react'

function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const toggleVisibility = () => {
			// Show button when page is scrolled down 300px
			if (window.scrollY > 300) {
				setIsVisible(true)
			} else {
				setIsVisible(false)
			}
		}

		window.addEventListener('scroll', toggleVisibility, { passive: true })

		return () => {
			window.removeEventListener('scroll', toggleVisibility)
		}
	}, [])

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	return (
		<button
			onClick={scrollToTop}
			className={`fixed bottom-6 right-6 z-[100] p-3 sm:p-4 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 touch-manipulation ${
				isVisible
					? 'opacity-100 translate-y-0 pointer-events-auto'
					: 'opacity-0 translate-y-4 pointer-events-none'
			}`}
			aria-label="Scroll to top"
		>
			<svg
				className="w-5 h-5 sm:w-6 sm:h-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M5 10l7-7m0 0l7 7m-7-7v18"
				/>
			</svg>
		</button>
	)
}

export default ScrollToTop

