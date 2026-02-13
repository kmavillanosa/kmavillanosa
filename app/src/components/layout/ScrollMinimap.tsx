import { useEffect, useState } from 'react'

interface Section {
	id: string
	label: string
}

interface ScrollMinimapProps {
	sections: Section[]
}

function ScrollMinimap({ sections }: ScrollMinimapProps) {
	const [activeSection, setActiveSection] = useState<string>('hero-section')
	const [isVisible, setIsVisible] = useState(true)

	useEffect(() => {
		const handleScroll = () => {
			// Check which section is currently in view
			const scrollPosition = window.scrollY + window.innerHeight / 3

			for (let i = sections.length - 1; i >= 0; i--) {
				const section = document.getElementById(sections[i].id)
				if (section) {
					const sectionTop = section.offsetTop
					const sectionHeight = section.offsetHeight

					if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
						setActiveSection(sections[i].id)
						break
					}
				}
			}

			// Hide minimap when scrolling past hero section
			const heroSection = document.getElementById('hero-section')
			if (heroSection) {
				const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
				setIsVisible(window.scrollY > heroBottom - 100)
			}
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		handleScroll() // Initial check

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [sections])

	const scrollToSection = (sectionId: string) => {
		const section = document.getElementById(sectionId)
		if (section) {
			const headerOffset = 80 // Account for fixed header
			const elementPosition = section.offsetTop
			const offsetPosition = elementPosition - headerOffset

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			})
		}
	}

	if (!isVisible) {
		return null
	}

	return (
		<div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
			<nav className="flex flex-col items-center gap-1.5 py-2 px-1.5 bg-ivory-100 dark:bg-gray-800 border border-stone-200 dark:border-gray-600 rounded-md">
				{sections.map((section) => {
					const isActive = activeSection === section.id
					return (
						<button
							key={section.id}
							onClick={() => scrollToSection(section.id)}
							className={`group relative flex items-center justify-center w-3 h-3 rounded-full transition-all duration-300 ${
								isActive
									? 'bg-green-600 dark:bg-green-500'
									: 'bg-stone-300 dark:bg-gray-600 hover:bg-stone-400 dark:hover:bg-gray-500'
							}`}
							aria-label={`Go to ${section.label} section`}
							title={section.label}
						>
							<span className="absolute right-full mr-2 px-2 py-1 text-xs font-medium text-stone-700 dark:text-gray-300 bg-ivory-50 dark:bg-gray-800 rounded border border-stone-200 dark:border-gray-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
								{section.label}
							</span>
						</button>
					)
				})}
			</nav>
		</div>
	)
}

export default ScrollMinimap

