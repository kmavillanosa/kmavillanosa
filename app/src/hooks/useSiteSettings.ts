import { useState, useEffect } from 'react'
import { loadSiteSettings } from '@/utils/cms-loader'
import type { SiteSettings } from '@/types/cms'

interface UseSiteSettingsReturn {
	data: SiteSettings | null
	loading: boolean
	error: Error | null
}

export function useSiteSettings(): UseSiteSettingsReturn {
	const [data, setData] = useState<SiteSettings | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		loadSiteSettings()
			.then(setData)
			.catch(setError)
			.finally(() => setLoading(false))
	}, [])

	return { data, loading, error }
}

