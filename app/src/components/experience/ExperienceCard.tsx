import { Link } from 'react-router-dom'
import { Card } from 'flowbite-react'
import type { Experience } from '@/types/cms'

interface ExperienceCardProps {
	experience: Experience
}

function ExperienceCard({ experience }: ExperienceCardProps) {
	const experienceUrl = `/experience/${experience.slug}`
	const responsibilities = Array.isArray(experience.responsibilities)
		? experience.responsibilities
		: []
	const showCount = 2

	return (
		<Link to={experienceUrl} className="block h-full">
			<Card className="h-full flex flex-col bg-white dark:bg-gray-800 border-stone-200 dark:border-gray-700 hover:shadow-md transition-shadow overflow-hidden cursor-pointer">
				<div className="p-3 flex flex-col h-full gap-3">
					{/* Top: logo + company + type */}
					<div className="flex items-start gap-3">
						{experience.companyLogo && experience.companyLogo.trim() && (
							<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-stone-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden border border-stone-200 dark:border-gray-600">
								<img
									src={experience.companyLogo}
									alt={experience.company}
									className="w-full h-full object-contain p-1.5"
									onError={(e) => {
										;(e.target as HTMLImageElement).style.display = 'none'
									}}
								/>
							</div>
						)}
						<div className="flex-1 min-w-0">
							<div className="flex items-start justify-between gap-2">
								<h3 className="text-sm font-bold text-stone-900 dark:text-white leading-tight truncate">
									{experience.company}
								</h3>
								<span className="text-[10px] font-medium text-stone-500 dark:text-gray-400 uppercase tracking-wide flex-shrink-0">
									{experience.type}
								</span>
							</div>
							<p className="text-xs font-medium text-stone-700 dark:text-gray-300 mt-0.5">
								{experience.position}
							</p>
							<div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500 dark:text-gray-400">
								<span>{experience.period}</span>
								{experience.companyLocation && (
									<>
										<span className="text-stone-300 dark:text-gray-600">·</span>
										<span className="truncate">{experience.companyLocation}</span>
									</>
								)}
							</div>
						</div>
					</div>

					{experience.companyAbout && (
						<p className="text-[11px] text-stone-500 dark:text-gray-400 line-clamp-2 leading-snug">
							{experience.companyAbout}
						</p>
					)}

					{responsibilities.length > 0 && (
						<ul className="mt-auto pt-2 border-t border-stone-200 dark:border-gray-700 space-y-1">
							{responsibilities.slice(0, showCount).map((item, i) => (
								<li key={i} className="flex items-start gap-2">
									<span className="text-stone-400 dark:text-gray-500 mt-0.5">•</span>
									<span className="text-[11px] text-stone-600 dark:text-gray-400 leading-snug line-clamp-2">
										{item}
									</span>
								</li>
							))}
							{responsibilities.length > showCount && (
								<li className="text-[11px] text-stone-500 dark:text-gray-500 pl-3">
									+{responsibilities.length - showCount} more
								</li>
							)}
						</ul>
					)}
				</div>
			</Card>
		</Link>
	)
}

export default ExperienceCard

