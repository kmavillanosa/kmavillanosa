import { useState, useEffect } from 'react'
import { loadServices } from '@/utils/cms-loader'
import type { Services } from '@/types/cms'

interface UseServicesReturn {
	data: Services | null
	loading: boolean
	error: Error | null
}

export function useServices(): UseServicesReturn {
	const [data, setData] = useState<Services | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		loadServices()
			.then(setData)
			.catch(setError)
			.finally(() => setLoading(false))
	}, [])

	return { data, loading, error }
}

