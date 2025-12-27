import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Microsoft Clarity Analytics Component
 * 
 * Tracks page views for SPA navigation.
 * The Clarity script is loaded in app/index.html - make sure to add your project ID there.
 * 
 * To set up:
 * 1. Go to https://clarity.microsoft.com/
 * 2. Sign in with your Microsoft account
 * 3. Create a new project for your website
 * 4. Copy your project ID
 * 5. Replace the empty string in the Clarity script tag in app/index.html with your project ID
 * 
 * Features:
 * - Automatic page view tracking
 * - Heatmaps
 * - Session recordings
 * - User behavior analytics
 * - Free and unlimited
 */
function ClarityAnalytics() {
	const location = useLocation()

	useEffect(() => {
		// Track page views for SPA navigation
		// Clarity automatically tracks page views, but we ensure it's aware of route changes
		if (typeof window !== 'undefined' && (window as any).clarity) {
			// Update page context for SPA navigation
			;(window as any).clarity('set', 'page', location.pathname)
		}
	}, [location.pathname])

	// Return null - this component doesn't render anything
	return null
}

export default ClarityAnalytics

