import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { loadPost } from '@/utils/cms-loader'
import type { Post } from '@/types/cms'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './pages.css'

function PostView() {
	const { slug } = useParams<{ slug: string }>()
	const [post, setPost] = useState<Post | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		if (!slug) {
			setError(new Error('No slug provided'))
			setLoading(false)
			return
		}

		loadPost(slug)
			.then(setPost)
			.catch(setError)
			.finally(() => setLoading(false))
	}, [slug])

	if (loading) {
		return <div className="loading">Loading post...</div>
	}

	if (error || !post) {
		return (
			<div className="error">
				<h1>Post Not Found</h1>
				<p>The post you're looking for doesn't exist.</p>
				<Link to="/posts">← Back to Posts</Link>
			</div>
		)
	}

	const postDate = new Date(post.date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	return (
		<article className="post-view">
			<Link to="/posts" className="back-link">← Back to Posts</Link>
			
			<header className="post-header">
				<h1>{post.title}</h1>
				<div className="post-meta">
					<span className="post-date">{postDate}</span>
					{post.author && <span className="post-author">by {post.author}</span>}
					{post.tags && post.tags.length > 0 && (
						<div className="post-tags">
							{post.tags.map((tag) => (
								<span key={tag} className="tag">
									{tag}
								</span>
							))}
						</div>
					)}
				</div>
				{post.image && (
					<img 
						src={post.image} 
						alt={post.title} 
						className="post-image"
					/>
				)}
				{post.description && (
					<p className="post-description">{post.description}</p>
				)}
			</header>

			<div className="post-body">
				<ReactMarkdown remarkPlugins={[remarkGfm]}>
					{post.body}
				</ReactMarkdown>
			</div>
		</article>
	)
}

export default PostView

