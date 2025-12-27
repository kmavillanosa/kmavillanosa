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
		<article className="max-w-4xl mx-auto px-4 py-8 pt-4">
			<Button 
				as={Link} 
				to="/" 
				outline
				color="success"
				className="mb-6"
			>
				← Back to Home
			</Button>
			
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
				{/* Header Section */}
				<div className="flex items-start gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
					{experience.companyLogo && experience.companyLogo.trim() && (
						<div className="flex-shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
							<img
								src={experience.companyLogo}
								alt={experience.company}
								className="w-full h-full object-contain p-3"
								onError={(e) => {
									;(e.target as HTMLImageElement).style.display = 'none'
								}}
							/>
						</div>
					)}
					<div className="flex-1 min-w-0">
						<div className="flex items-start justify-between gap-4 mb-3">
							<h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
								{experience.company}
							</h1>
							<span className="px-3 py-1.5 text-sm font-semibold bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/40 dark:to-green-800/40 text-green-700 dark:text-green-300 rounded-lg whitespace-nowrap flex-shrink-0 shadow-sm">
								{experience.type}
							</span>
						</div>
						<p className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
							{experience.position}
						</p>
						<div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
							<div className="flex items-center gap-1.5">
								<svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
								<span>{experience.period}</span>
							</div>
							<div className="flex items-center gap-1.5">
								<svg className="w-4 h-4 flex-shrink-0 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
								<span>{experience.companyLocation}</span>
							</div>
						</div>
					</div>
				</div>

				{/* Company About */}
				<div className="mb-8">
					<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">About the Company</h2>
					<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
						{experience.companyAbout}
					</p>
				</div>

				{/* Responsibilities */}
				<div>
					<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Responsibilities</h2>
					<ul className="space-y-3">
						{Array.isArray(experience.responsibilities) && experience.responsibilities.length > 0 ? (
							experience.responsibilities.map((responsibility, index) => (
								<li key={index} className="flex items-start gap-3">
									<div className="flex-shrink-0 mt-1.5">
										<div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400"></div>
									</div>
									<span className="text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
										{responsibility}
									</span>
								</li>
							))
						) : (
							<li className="text-gray-500 dark:text-gray-400 italic">No responsibilities listed.</li>
						)}
					</ul>
				</div>
			</div>
		</article>
	)
}

export default ExperienceView

