import { useState, useEffect } from 'react'
import { loadPosts } from '@/utils/cms-loader'
import type { Post } from '@/types/cms'

interface UsePostsReturn {
	data: Post[]
	loading: boolean
	error: Error | null
}

export function usePosts(): UsePostsReturn {
	const [data, setData] = useState<Post[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		loadPosts()
			.then(setData)
			.catch(setError)
			.finally(() => setLoading(false))
	}, [])

	return { data, loading, error }
}

