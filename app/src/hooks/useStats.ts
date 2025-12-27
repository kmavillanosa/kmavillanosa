import { useState, useEffect } from 'react'
import { loadStats } from '@/utils/cms-loader'
import type { Stats } from '@/types/cms'

export function useStats(): {
	data: Stats | null
	loading: boolean
	error: Error | null
} {
	const [data, setData] = useState<Stats | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		loadStats()
			.then(setData)
			.catch(setError)
			.finally(() => setLoading(false))
	}, [])

	return { data, loading, error }
}

