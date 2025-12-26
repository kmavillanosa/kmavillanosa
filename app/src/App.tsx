import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import LandingPage from './pages/LandingPage'
import PortfolioPage from './pages/PortfolioPage'
import OcrRedirect from './pages/OcrRedirect'
import ContactPage from './pages/ContactPage'
import PageView from './pages/PageView'
import PostList from './pages/PostList'
import PostView from './pages/PostView'
import NotFound from './pages/NotFound'

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/ocr" element={<OcrRedirect />} />
				<Route path="/portfolio" element={<PortfolioPage />} />
				<Route path="/portfolio/:slug" element={<PageView />} />
				<Route path="/contact" element={<ContactPage />} />
				<Route path="/pages/:slug" element={<PageView />} />
				<Route path="/posts" element={<PostList />} />
				<Route path="/posts/:slug" element={<PostView />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Layout>
	)
}

export default App

