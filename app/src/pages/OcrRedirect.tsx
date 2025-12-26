import { useEffect } from 'react'
import { Spinner } from 'flowbite-react'

function OcrRedirect() {
	useEffect(() => {
		window.location.href = 'http://88.222.245.88/resume/'
	}, [])

	return (
		<div className="flex flex-col items-center justify-center min-h-[400px]">
			<Spinner size="xl" />
			<p className="mt-4 text-gray-600">Redirecting to resume...</p>
		</div>
	)
}

export default OcrRedirect

