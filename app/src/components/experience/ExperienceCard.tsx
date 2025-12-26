import { Card } from 'flowbite-react'
import type { Experience } from '@/types/cms'

interface ExperienceCardProps {
	experience: Experience
}

function ExperienceCard({ experience }: ExperienceCardProps) {
	return (
		<Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 h-full">
			<div className="flex flex-col h-full">
				{/* Company Logo and Header */}
				<div className="flex items-start gap-4 mb-4">
					{experience.companyLogo && experience.companyLogo.trim() && (
						<div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
							<img
								src={experience.companyLogo}
								alt={experience.company}
								className="w-full h-full object-contain p-2"
								onError={(e) => {
									// Hide image if it fails to load
									;(e.target as HTMLImageElement).style.display = 'none'
								}}
							/>
						</div>
					)}
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-1">
							<h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
								{experience.company}
							</h3>
							<span className="px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full whitespace-nowrap">
								{experience.type}
							</span>
						</div>
						<p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
							{experience.position}
						</p>
						<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
							{experience.period}
						</p>
					</div>
				</div>

				{/* Company About */}
				<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
					{experience.companyAbout}
				</p>

				{/* Location */}
				<div className="flex items-center gap-2 mb-4 text-xs text-gray-500 dark:text-gray-400">
					<svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
					<span className="truncate">{experience.companyLocation}</span>
				</div>

				{/* Responsibilities */}
				<div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
					<h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
						Key Responsibilities:
					</h4>
					<ul className="space-y-1.5">
						{experience.responsibilities.slice(0, 3).map((responsibility, index) => (
							<li key={index} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
								<svg className="w-3 h-3 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
								</svg>
								<span>{responsibility}</span>
							</li>
						))}
						{experience.responsibilities.length > 3 && (
							<li className="text-xs text-gray-500 dark:text-gray-500 italic">
								+{experience.responsibilities.length - 3} more
							</li>
						)}
					</ul>
				</div>
			</div>
		</Card>
	)
}

export default ExperienceCard

