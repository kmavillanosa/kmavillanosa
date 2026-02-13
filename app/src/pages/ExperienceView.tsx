import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { loadExperience } from '@/utils/cms-loader'
import type { Experience } from '@/types/cms'
import { Spinner, Alert, Button } from 'flowbite-react'

function ExperienceView() {
	const { slug } = useParams<{ slug: string }>()
	const [experience, setExperience] = useState<Experience | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		if (!slug) {
			setError(new Error('No slug provided'))
			setLoading(false)
			return
		}

		loadExperience(slug)
			.then((experienceData) => {
				if (!experienceData) {
					setError(new Error(`Experience "${slug}" not found`))
				} else {
					setExperience(experienceData)
				}
			})
			.catch((err) => {
				console.error('Error loading experience:', err)
				setError(err)
			})
			.finally(() => setLoading(false))
	}, [slug])

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-[400px]">
				<Spinner size="xl" />
			</div>
		)
	}

	if (error || !experience) {
		return (
			<div className="max-w-4xl mx-auto px-4 py-8">
				<Alert color="failure" className="mb-4">
					<h3 className="text-xl font-semibold mb-2">Experience Not Found</h3>
					<p className="mb-4">The experience you're looking for doesn't exist.</p>
					<Button as={Link} to="/" color="success">
						← Back to Home
					</Button>
				</Alert>
			</div>
		)
	}

	return (
		<article className="max-w-2xl mx-auto px-4 sm:px-6 py-6 pt-4">
			<Link
				to="/"
				className="inline-flex items-center gap-1 text-sm text-theme-text-secondary hover:text-theme-text-primary mb-6 transition-colors"
			>
				<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
				</svg>
				Back
			</Link>

			<div className="bg-theme-surface rounded-lg border border-theme p-4 sm:p-5">
				{/* Header */}
				<div className="flex gap-3 sm:gap-4 mb-4 pb-4 border-b border-theme">
					{experience.companyLogo && experience.companyLogo.trim() && (
						<div className="flex-shrink-0 w-12 h-12 rounded-lg bg-theme-elevated-muted flex items-center justify-center overflow-hidden border border-theme-muted">
							<img
								src={experience.companyLogo}
								alt={experience.company}
								className="w-full h-full object-contain p-2"
								onError={(e) => {
									;(e.target as HTMLImageElement).style.display = 'none'
								}}
							/>
						</div>
					)}
					<div className="flex-1 min-w-0">
						<div className="flex flex-wrap items-start justify-between gap-2">
							<h1 className="text-xl sm:text-2xl font-bold text-theme-text-primary">
								{experience.company}
							</h1>
							<span className="text-xs font-medium text-theme-text-muted uppercase tracking-wide">
								{experience.type}
							</span>
						</div>
						<p className="text-sm font-semibold text-theme-text-secondary mt-0.5">
							{experience.position}
						</p>
						<div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1 text-xs text-theme-text-muted">
							<span>{experience.period}</span>
							{experience.companyLocation && (
								<>
									<span className="text-theme-border">·</span>
									<span>{experience.companyLocation}</span>
								</>
							)}
						</div>
					</div>
				</div>

				{experience.companyAbout && (
					<div className="mb-4">
						<h2 className="text-xs font-semibold text-theme-text-muted uppercase tracking-wider mb-1.5">
							About
						</h2>
						<p className="text-sm text-theme-text-secondary leading-relaxed">
							{experience.companyAbout}
						</p>
					</div>
				)}

				{Array.isArray(experience.responsibilities) && experience.responsibilities.length > 0 && (
					<div>
						<h2 className="text-xs font-semibold text-theme-text-muted uppercase tracking-wider mb-2">
							Responsibilities
						</h2>
						<ul className="space-y-2">
							{experience.responsibilities.map((item, i) => (
								<li key={i} className="flex items-start gap-2">
									<span className="text-theme-text-muted mt-0.5 flex-shrink-0">•</span>
									<span className="text-sm text-theme-text-secondary leading-relaxed">
										{item}
									</span>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</article>
	)
}

export default ExperienceView

