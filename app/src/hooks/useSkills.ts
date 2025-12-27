import { useState, useEffect } from 'react'
import { loadSkills } from '@/utils/cms-loader'
import type { Skills } from '@/types/cms'

export function useSkills(): {
	data: Skills | null
	loading: boolean
	error: Error | null
} {
	const [data, setData] = useState<Skills | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		loadSkills()
			.then(setData)
			.catch(setError)
			.finally(() => setLoading(false))
	}, [])

	return { data, loading, error }
}

