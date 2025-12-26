import { Link } from 'react-router-dom'
import type { Post } from '@/types/cms'
import './post-card.css'

interface PostCardProps {
	post: Post
}

function PostCard({ post }: PostCardProps) {
	const postDate = new Date(post.date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	return (
		<article className="post-card">
			<Link to={`/posts/${post.slug}`} className="post-card-link">
				{post.image && (
					<img 
						src={post.image} 
						alt={post.title} 
						className="post-card-image"
					/>
				)}
				<div className="post-card-content">
					<h3 className="post-card-title">{post.title}</h3>
					<div className="post-card-meta">
						<span className="post-card-date">{postDate}</span>
						{post.author && (
							<span className="post-card-author">by {post.author}</span>
						)}
					</div>
					{post.description && (
						<p className="post-card-description">{post.description}</p>
					)}
					{post.tags && post.tags.length > 0 && (
						<div className="post-card-tags">
							{post.tags.map((tag) => (
								<span key={tag} className="tag">
									{tag}
								</span>
							))}
						</div>
					)}
				</div>
			</Link>
		</article>
	)
}

export default PostCard

