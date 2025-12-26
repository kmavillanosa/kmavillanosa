import { usePosts } from '@/hooks/usePosts'
import PostCard from '@/components/posts/PostCard'
import './pages.css'

function PostList() {
	const { data: posts, loading, error } = usePosts()

	if (loading) {
		return <div className="loading">Loading posts...</div>
	}

	if (error) {
		return <div className="error">Error loading posts: {error.message}</div>
	}

	if (posts.length === 0) {
		return (
			<div className="empty-state">
				<h1>Posts</h1>
				<p>No posts yet. Check back soon!</p>
			</div>
		)
	}

	return (
		<div className="post-list">
			<h1>All Posts</h1>
			<div className="posts-grid">
				{posts.map((post) => (
					<PostCard key={post.slug} post={post} />
				))}
			</div>
		</div>
	)
}

export default PostList

