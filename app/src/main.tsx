import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Ensure light mode is set
if (typeof document !== 'undefined') {
	document.documentElement.classList.remove('dark')
	document.documentElement.classList.add('light')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter basename="/kmavillanosa">
			<App />
		</BrowserRouter>
	</React.StrictMode>,
)

