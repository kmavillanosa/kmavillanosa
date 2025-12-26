import { Link } from 'react-router-dom'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { usePosts } from '@/hooks/usePosts'
import PostCard from '@/components/posts/PostCard'
import './pages.css'

function HomePage() {
	const { data: settings, loading: settingsLoading } = useSiteSettings()
	const { data: posts, loading: postsLoading } = usePosts()

	const recentPosts = posts.slice(0, 5)

	if (settingsLoading) {
		return <div className="loading">Loading...</div>
	}

	return (
		<div className="home-page">
			<section className="hero">
				<h1>{settings?.title || 'Kim Avillanosa'}</h1>
				<p className="description">{settings?.description || 'I make cool stuff for a living'}</p>
			</section>

			{postsLoading ? (
				<div className="loading">Loading posts...</div>
			) : recentPosts.length > 0 ? (
				<section className="recent-posts">
					<h2>Recent Posts</h2>
					<div className="posts-grid">
						{recentPosts.map((post) => (
							<PostCard key={post.slug} post={post} />
						))}
					</div>
					{posts.length > 5 && (
						<Link to="/posts" className="view-all-link">
							View All Posts →
						</Link>
					)}
				</section>
			) : null}
		</div>
	)
}

export default HomePage

