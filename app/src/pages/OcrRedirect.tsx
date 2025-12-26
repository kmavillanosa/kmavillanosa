import { useEffect } from 'react'
import './pages.css'

function OcrRedirect() {
	useEffect(() => {
		window.location.href = 'http://88.222.245.88/resume/'
	}, [])

	return (
		<div className="redirect-page loading">
			<p>Redirecting to resume...</p>
		</div>
	)
}

export default OcrRedirect

