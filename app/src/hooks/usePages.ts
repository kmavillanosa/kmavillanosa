import { useState, useEffect } from 'react'
import { loadPages } from '@/utils/cms-loader'
import type { Page } from '@/types/cms'

interface UsePagesReturn {
	data: Page[]
	loading: boolean
	error: Error | null
}

export function usePages(): UsePagesReturn {
	const [data, setData] = useState<Page[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		loadPages()
			.then(setData)
			.catch(setError)
			.finally(() => setLoading(false))
	}, [])

	return { data, loading, error }
}

