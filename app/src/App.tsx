import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/layout/Layout'
import LandingPage from './pages/LandingPage'
import PortfolioPage from './pages/PortfolioPage'
import OcrRedirect from './pages/OcrRedirect'
import ContactPage from './pages/ContactPage'
import PageView from './pages/PageView'
import ExperienceView from './pages/ExperienceView'
import NotFound from './pages/NotFound'

function App() {
	return (
		<ThemeProvider>
			<Layout>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/ocr" element={<OcrRedirect />} />
					<Route path="/portfolio" element={<PortfolioPage />} />
					<Route path="/portfolio/:slug" element={<PageView />} />
					<Route path="/experience/:slug" element={<ExperienceView />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Layout>
		</ThemeProvider>
	)
}

export default App

