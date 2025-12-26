import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Initialize theme from store on page load
if (typeof document !== 'undefined') {
	// Get initial theme from localStorage or default to light
	const storedTheme = localStorage.getItem('theme-storage')
	let theme = 'light'
	if (storedTheme) {
		try {
			const parsed = JSON.parse(storedTheme)
			theme = parsed.state?.theme || 'light'
		} catch {
			theme = 'light'
		}
	}
	
	if (theme === 'dark') {
		document.documentElement.classList.add('dark')
		document.documentElement.classList.remove('light')
	} else {
		document.documentElement.classList.remove('dark')
		document.documentElement.classList.add('light')
	}
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter basename="/kmavillanosa">
			<App />
		</BrowserRouter>
	</React.StrictMode>,
)

