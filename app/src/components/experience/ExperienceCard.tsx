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
			<Card className="h-full flex flex-col bg-theme-surface border-theme hover:shadow-md transition-shadow overflow-hidden cursor-pointer">
				<div className="p-3 flex flex-col h-full gap-3">
					{/* Top: logo + company + type */}
					<div className="flex items-start gap-3">
						{experience.companyLogo && experience.companyLogo.trim() && (
							<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-theme-elevated-muted flex items-center justify-center overflow-hidden border border-theme-muted">
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
<h3 className="text-sm font-bold text-theme-text-primary leading-tight truncate">
								{experience.company}
								</h3>
								<span className="text-[10px] font-medium text-theme-text-muted uppercase tracking-wide flex-shrink-0">
									{experience.type}
								</span>
							</div>
							<p className="text-xs font-medium text-theme-text-secondary mt-0.5">
								{experience.position}
							</p>
							<div className="flex items-center gap-2 mt-1 text-[11px] text-theme-text-muted">
								<span>{experience.period}</span>
								{experience.companyLocation && (
									<>
										<span className="text-theme-border">·</span>
										<span className="truncate">{experience.companyLocation}</span>
									</>
								)}
							</div>
						</div>
					</div>

					{experience.companyAbout && (
						<p className="text-[11px] text-theme-text-muted line-clamp-2 leading-snug">
							{experience.companyAbout}
						</p>
					)}

					{responsibilities.length > 0 && (
						<ul className="mt-auto pt-2 border-t border-theme space-y-1">
							{responsibilities.slice(0, showCount).map((item, i) => (
								<li key={i} className="flex items-start gap-2">
									<span className="text-theme-text-muted mt-0.5">•</span>
									<span className="text-[11px] text-theme-text-secondary leading-snug line-clamp-2">
										{item}
									</span>
								</li>
							))}
							{responsibilities.length > showCount && (
								<li className="text-[11px] text-theme-text-muted pl-3">
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

