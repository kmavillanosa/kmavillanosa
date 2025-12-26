import { useState, useEffect } from 'react'
import { loadExperiences } from '@/utils/cms-loader'
import type { Experience } from '@/types/cms'

interface UseExperiencesReturn {
	data: Experience[]
	loading: boolean
	error: Error | null
}

export function useExperiences(): UseExperiencesReturn {
	const [data, setData] = useState<Experience[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		loadExperiences()
			.then(setData)
			.catch(setError)
			.finally(() => setLoading(false))
	}, [])

	return { data, loading, error }
}

