import { Link } from 'react-router-dom'
import { Card } from 'flowbite-react'
import type { Experience } from '@/types/cms'

interface ExperienceCardProps {
	experience: Experience
}

function ExperienceCard({ experience }: ExperienceCardProps) {
	const experienceUrl = `/experience/${experience.slug}`
	
	return (
		<Link
			to={experienceUrl}
			className="block h-full group"
		>
			<Card className="h-full flex flex-col bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer">
			<div className="p-6 flex flex-col h-full">
				{/* Header Section */}
				<div className="flex items-start gap-4 mb-5">
					{experience.companyLogo && experience.companyLogo.trim() && (
						<div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
							<img
								src={experience.companyLogo}
								alt={experience.company}
								className="w-full h-full object-contain p-2.5"
								onError={(e) => {
									;(e.target as HTMLImageElement).style.display = 'none'
								}}
							/>
						</div>
					)}
					<div className="flex-1 min-w-0">
						<div className="flex items-start justify-between gap-2 mb-2">
							<h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
								{experience.company}
							</h3>
							<span className="px-2.5 py-1 text-xs font-semibold bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-900/40 dark:to-purple-800/40 text-purple-700 dark:text-purple-300 rounded-md whitespace-nowrap flex-shrink-0 shadow-sm">
								{experience.type}
							</span>
						</div>
						<p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5">
							{experience.position}
						</p>
						<div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
							<svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							<span>{experience.period}</span>
						</div>
					</div>
				</div>

				{/* Company About */}
				<p className="text-sm text-gray-600 dark:text-gray-400 mb-5 line-clamp-2 leading-relaxed">
					{experience.companyAbout}
				</p>

				{/* Location */}
				<div className="flex items-center gap-2 mb-5 px-3 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
					<svg className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
					<span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
						{experience.companyLocation}
					</span>
				</div>

				{/* Responsibilities */}
				<div className="mt-auto pt-5 border-t border-gray-200 dark:border-gray-700">
					<h4 className="text-xs font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
						Key Responsibilities
					</h4>
					<ul className="space-y-2">
						{Array.isArray(experience.responsibilities) 
							? experience.responsibilities.slice(0, 3).map((responsibility, index) => (
							<li key={index} className="flex items-start gap-2.5">
								<div className="flex-shrink-0 mt-0.5">
									<div className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400"></div>
								</div>
								<span className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
									{responsibility}
								</span>
							</li>
							))
							: null}
						{Array.isArray(experience.responsibilities) && experience.responsibilities.length > 3 && (
							<li className="text-xs text-gray-500 dark:text-gray-500 italic pl-4 font-medium">
								+{experience.responsibilities.length - 3} more responsibility{experience.responsibilities.length - 3 !== 1 ? 'ies' : 'y'}
							</li>
						)}
					</ul>
				</div>
			</div>
		</Card>
		</Link>
	)
}

export default ExperienceCard

