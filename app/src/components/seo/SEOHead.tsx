import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSiteSettings } from '@/hooks/useSiteSettings'

interface SEOHeadProps {
	title?: string
	description?: string
	image?: string
	keywords?: string
	type?: string
}

const BASE_URL = 'https://kmavillanosa.github.io/kmavillanosa'
const DEFAULT_IMAGE = `${BASE_URL}/cms/media/logo.png`

function SEOHead({
	title,
	description,
	image = DEFAULT_IMAGE,
	keywords,
	type = 'website',
}: SEOHeadProps) {
	const location = useLocation()
	const { data: siteSettings } = useSiteSettings()

	const fullTitle = title
		? `${title} | ${siteSettings?.title || 'Kim Avillanosa'}`
		: `${siteSettings?.title || 'Kim Avillanosa'} - Full Stack Software Engineer | Portfolio`

	const fullDescription =
		description ||
		siteSettings?.description ||
		'Full Stack Developer · React, TypeScript, Node.js, WebGL. 10+ years. Remote from Philippines. Available for hire.'

	const fullKeywords =
		keywords ||
		'Full Stack Developer, React Developer, TypeScript, Node.js, 3D Graphics, WebGL, System Architecture, Remote Developer, Philippines'

	const canonicalUrl = `${BASE_URL}${location.pathname}`

	useEffect(() => {
		// Update document title
		document.title = fullTitle

		// Update or create meta tags
		const updateMetaTag = (property: string, content: string, isProperty = false) => {
			const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`
			let element = document.querySelector(selector) as HTMLMetaElement

			if (!element) {
				element = document.createElement('meta')
				if (isProperty) {
					element.setAttribute('property', property)
				} else {
					element.setAttribute('name', property)
				}
				document.head.appendChild(element)
			}

			element.setAttribute('content', content)
		}

		// Update canonical link
		let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
		if (!canonicalLink) {
			canonicalLink = document.createElement('link')
			canonicalLink.setAttribute('rel', 'canonical')
			document.head.appendChild(canonicalLink)
		}
		canonicalLink.setAttribute('href', canonicalUrl)

		// Update meta tags
		updateMetaTag('description', fullDescription)
		updateMetaTag('keywords', fullKeywords)

		// Open Graph tags
		updateMetaTag('og:title', fullTitle, true)
		updateMetaTag('og:description', fullDescription, true)
		updateMetaTag('og:image', image, true)
		updateMetaTag('og:url', canonicalUrl, true)
		updateMetaTag('og:type', type, true)

		// Twitter Card tags
		updateMetaTag('twitter:card', 'summary_large_image', true)
		updateMetaTag('twitter:title', fullTitle, true)
		updateMetaTag('twitter:description', fullDescription, true)
		updateMetaTag('twitter:image', image, true)

		// Track page view for analytics
		if (typeof window !== 'undefined' && (window as any).clarity) {
			;(window as any).clarity('set', 'page', location.pathname)
		}
	}, [fullTitle, fullDescription, fullKeywords, image, type, canonicalUrl, location.pathname])

	return null
}

export default SEOHead

