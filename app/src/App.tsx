import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import PageView from './pages/PageView'
import PostList from './pages/PostList'
import PostView from './pages/PostView'
import NotFound from './pages/NotFound'

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/pages/:slug" element={<PageView />} />
				<Route path="/posts" element={<PostList />} />
				<Route path="/posts/:slug" element={<PostView />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Layout>
	)
}

export default App

