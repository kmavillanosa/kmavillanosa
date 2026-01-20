import { useEffect, useRef, RefObject } from 'react'

interface UseHorizontalScrollOptions {
	/**
	 * The scroll container element that will scroll horizontally
	 */
	containerRef: RefObject<HTMLElement>
	/**
	 * The section element that triggers horizontal scrolling when in view
	 */
	sectionRef: RefObject<HTMLElement>
	/**
	 * Whether horizontal scrolling is enabled
	 */
	enabled?: boolean
}

/**
 * Custom hook that locks vertical scrolling and converts it to horizontal scroll when a section is in view.
 * Vertical scrolling stops when entering the section and resumes only after horizontal scrolling completes.
 */
export function useHorizontalScroll({
	containerRef,
	sectionRef,
	enabled = true,
}: UseHorizontalScrollOptions) {
	const lockedScrollYRef = useRef<number | null>(null)
	const isLockedRef = useRef(false)
	const rafIdRef = useRef<number | null>(null)
	const touchStartYRef = useRef<number | null>(null)
	const touchStartXRef = useRef<number | null>(null)

	useEffect(() => {
		if (!enabled) return

		const container = containerRef.current
		const section = sectionRef.current

		if (!container || !section) return

		const scrollableWidth = container.scrollWidth - container.clientWidth

		// If there's nothing to scroll horizontally, don't lock
		if (scrollableWidth <= 0) return

		const checkSectionPosition = () => {
			const sectionRect = section.getBoundingClientRect()
			const windowHeight = window.innerHeight
			const sectionTop = sectionRect.top
			const sectionBottom = sectionRect.bottom

			// Check if section is entering viewport (top is above bottom of viewport and bottom is below top of viewport)
			const isInViewport = sectionTop < windowHeight && sectionBottom > 0
			
			// Check if we've scrolled past the section
			const isPastSection = sectionBottom <= 0

			// Check if horizontal scroll is complete
			const isHorizontalComplete = container.scrollLeft >= scrollableWidth - 1

			if (isInViewport && !isPastSection) {
				// Section is in viewport - lock vertical scroll if not already locked
				if (!isLockedRef.current) {
					lockedScrollYRef.current = window.scrollY
					isLockedRef.current = true
				}

				// If horizontal scroll is complete, unlock
				if (isHorizontalComplete && isLockedRef.current) {
					isLockedRef.current = false
					lockedScrollYRef.current = null
				}
			} else if (isPastSection || !isInViewport) {
				// Section is not in viewport - unlock if locked
				if (isLockedRef.current) {
					isLockedRef.current = false
					lockedScrollYRef.current = null
				}
			}
		}

		const handleWheel = (e: WheelEvent) => {
			const sectionRect = section.getBoundingClientRect()
			const windowHeight = window.innerHeight
			const isInViewport = sectionRect.top < windowHeight && sectionRect.bottom > 0

			if (!isInViewport) {
				// Not in viewport, unlock if locked
				if (isLockedRef.current) {
					isLockedRef.current = false
					lockedScrollYRef.current = null
				}
				return
			}

			// Check if horizontal scroll is complete
			const isHorizontalComplete = container.scrollLeft >= scrollableWidth - 1

			// If horizontal scroll is complete, allow normal vertical scrolling
			if (isHorizontalComplete) {
				if (isLockedRef.current) {
					isLockedRef.current = false
					lockedScrollYRef.current = null
				}
				return
			}

			// Prevent default vertical scrolling
			e.preventDefault()
			e.stopPropagation()

			// Lock vertical scroll position on first interaction
			if (!isLockedRef.current) {
				lockedScrollYRef.current = window.scrollY
				isLockedRef.current = true
			}

			// Convert vertical scroll to horizontal
			const scrollDelta = e.deltaY
			const currentScrollLeft = container.scrollLeft
			const newScrollLeft = Math.max(
				0,
				Math.min(scrollableWidth, currentScrollLeft + scrollDelta)
			)

			container.scrollTo({
				left: newScrollLeft,
				behavior: 'auto',
			})

			// If we've reached the end, unlock
			if (newScrollLeft >= scrollableWidth - 1) {
				setTimeout(() => {
					isLockedRef.current = false
					lockedScrollYRef.current = null
				}, 50)
			}
		}

		const handleScroll = () => {
			checkSectionPosition()

			// If locked, restore the locked scroll position
			if (isLockedRef.current && lockedScrollYRef.current !== null) {
				const currentScrollY = window.scrollY
				if (Math.abs(currentScrollY - lockedScrollYRef.current) > 1) {
					window.scrollTo({
						top: lockedScrollYRef.current,
						behavior: 'auto',
					})
				}
			}
		}

		// Throttled scroll handler
		let ticking = false
		const throttledHandleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					handleScroll()
					ticking = false
				})
				ticking = true
			}
		}

		// Handle touch events for mobile - attach to container for better control
		const handleContainerTouchStart = (e: TouchEvent) => {
			const sectionRect = section.getBoundingClientRect()
			const windowHeight = window.innerHeight
			const isInViewport = sectionRect.top < windowHeight && sectionRect.bottom > 0

			if (!isInViewport) return

			const isHorizontalComplete = container.scrollLeft >= scrollableWidth - 1
			if (isHorizontalComplete) {
				isLockedRef.current = false
				lockedScrollYRef.current = null
				return
			}

			touchStartYRef.current = e.touches[0].clientY
			touchStartXRef.current = e.touches[0].clientX

			if (!isLockedRef.current) {
				lockedScrollYRef.current = window.scrollY
				isLockedRef.current = true
			}
		}

		const handleContainerTouchMove = (e: TouchEvent) => {
			const sectionRect = section.getBoundingClientRect()
			const windowHeight = window.innerHeight
			const isInViewport = sectionRect.top < windowHeight && sectionRect.bottom > 0

			if (!isInViewport || touchStartYRef.current === null || touchStartXRef.current === null) {
				return
			}

			const isHorizontalComplete = container.scrollLeft >= scrollableWidth - 1
			if (isHorizontalComplete) {
				isLockedRef.current = false
				lockedScrollYRef.current = null
				return
			}

			const touchY = e.touches[0].clientY
			const touchX = e.touches[0].clientX
			const currentScrollLeft = container.scrollLeft
			const deltaY = Math.abs(touchStartYRef.current - touchY)
			const deltaX = Math.abs(touchStartXRef.current - touchX)

			// If user is trying to scroll vertically more than horizontally, convert to horizontal
			// This allows natural horizontal swiping while preventing vertical scrolling
			if (deltaY > deltaX && deltaY > 15) {
				e.preventDefault()
				e.stopPropagation()

				// Convert vertical swipe to horizontal scroll
				const scrollDelta = touchStartYRef.current - touchY
				const newScrollLeft = Math.max(
					0,
					Math.min(scrollableWidth, currentScrollLeft + scrollDelta)
				)

				container.scrollTo({
					left: newScrollLeft,
					behavior: 'auto',
				})

				// Update touch start X to current scroll position for smoother tracking
				touchStartXRef.current = touchX

				if (newScrollLeft >= scrollableWidth - 1) {
					setTimeout(() => {
						isLockedRef.current = false
						lockedScrollYRef.current = null
					}, 50)
				}
			}
		}

		const handleContainerTouchEnd = () => {
			touchStartYRef.current = null
			touchStartXRef.current = null
		}

		// Handle window-level touch events for vertical scroll prevention
		const handleWindowTouchMove = (e: TouchEvent) => {
			const sectionRect = section.getBoundingClientRect()
			const windowHeight = window.innerHeight
			const isInViewport = sectionRect.top < windowHeight && sectionRect.bottom > 0

			if (!isInViewport) {
				if (isLockedRef.current) {
					isLockedRef.current = false
					lockedScrollYRef.current = null
				}
				return
			}

			const isHorizontalComplete = container.scrollLeft >= scrollableWidth - 1
			if (isHorizontalComplete) {
				return
			}

			// Check if touch is on the container
			const target = e.target as HTMLElement
			if (container.contains(target)) {
				return // Let container handle it
			}

			// Prevent vertical scrolling elsewhere in the section
			if (isLockedRef.current && lockedScrollYRef.current !== null) {
				const touchY = e.touches[0]?.clientY
				if (touchY !== undefined && touchStartYRef.current !== null) {
					const deltaY = Math.abs(touchStartYRef.current - touchY)
					if (deltaY > 10) {
						e.preventDefault()
					}
				}
			}
		}

		window.addEventListener('wheel', handleWheel, { passive: false, capture: true })
		window.addEventListener('scroll', throttledHandleScroll, { passive: true })
		window.addEventListener('touchmove', handleWindowTouchMove, { passive: false })
		
		// Attach touch events to container for better mobile control
		container.addEventListener('touchstart', handleContainerTouchStart, { passive: true })
		container.addEventListener('touchmove', handleContainerTouchMove, { passive: false })
		container.addEventListener('touchend', handleContainerTouchEnd, { passive: true })
		
		// Initial check
		checkSectionPosition()

		return () => {
			window.removeEventListener('scroll', throttledHandleScroll)
			window.removeEventListener('wheel', handleWheel)
			window.removeEventListener('touchmove', handleWindowTouchMove)
			container.removeEventListener('touchstart', handleContainerTouchStart)
			container.removeEventListener('touchmove', handleContainerTouchMove)
			container.removeEventListener('touchend', handleContainerTouchEnd)
			if (rafIdRef.current) {
				cancelAnimationFrame(rafIdRef.current)
			}
			// Unlock on cleanup
			isLockedRef.current = false
			lockedScrollYRef.current = null
		}
	}, [containerRef, sectionRef, enabled])
}
