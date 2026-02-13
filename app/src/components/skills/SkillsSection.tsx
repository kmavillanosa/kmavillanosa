import { useSkills } from '@/hooks/useSkills'
import { Spinner } from 'flowbite-react'
import StackIcon from 'tech-stack-icons'
import { useThemeStore } from '@/stores/themeStore'
import { getTechStackIconName, getSkillLogoUrl } from './skill-logos'

function SkillCard({
	skill,
}: {
	skill: { name: string; category: string; icon?: string }
}) {
	const theme = useThemeStore((s) => s.theme)
	const techStackIconName = getTechStackIconName(skill.name, skill.icon)
	const logoUrl = getSkillLogoUrl(skill.name, skill.icon)
	const variant = theme === 'dark' ? 'dark' : 'light'

	return (
		<div
			className="flex items-center gap-2 sm:gap-3 rounded-lg border border-theme-muted bg-theme-surface px-3 py-2 sm:px-3 sm:py-2"
		>
			<div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-theme-elevated-muted flex items-center justify-center ring-1 ring-theme-border-muted">
				{techStackIconName ? (
					<StackIcon
						name={techStackIconName}
						variant={variant}
						className="w-5 h-5 sm:w-6 sm:h-6 [&_svg]:w-full [&_svg]:h-full [&_svg]:object-contain"
					/>
				) : logoUrl ? (
					<img
						src={logoUrl}
						alt=""
						className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
						loading="lazy"
					/>
				) : (
					<span className="text-sm font-bold text-stone-400 dark:text-gray-500 select-none">
						{skill.name.charAt(0)}
					</span>
				)}
			</div>
			<span className="font-medium text-theme-text-primary text-sm truncate">
				{skill.name}
			</span>
		</div>
	)
}

function SkillsSection() {
	const { data: skillsData, loading } = useSkills()

	if (loading) {
		return (
			<section
				id="skills-section"
				className="py-12 px-4 bg-theme-page"
			>
				<div className="max-w-7xl mx-auto flex justify-center items-center min-h-[200px]">
					<Spinner size="xl" />
				</div>
			</section>
		)
	}

	if (!skillsData || !skillsData.skills || skillsData.skills.length === 0) {
		return null
	}

	const { skills } = skillsData
	const categories = Array.from(new Set(skills.map((s) => s.category)))

	return (
		<section
			id="skills-section"
			className="py-10 sm:py-12 px-4 sm:px-6 bg-theme-page"
		>
			<div className="max-w-5xl mx-auto">
				<div className="text-center mb-6">
					<h2 className="text-xl sm:text-2xl font-bold text-theme-text-primary mb-1">
						Skills & Technologies
					</h2>
					<p className="text-sm text-theme-text-secondary max-w-xl mx-auto">
						Technologies and frameworks I work with.
					</p>
				</div>

				<div className="space-y-4">
					{categories.map((category) => {
						const categorySkills = skills.filter((s) => s.category === category)
						return (
							<div key={category}>
								<h3 className="text-sm font-semibold text-theme-text-secondary mb-1.5 flex items-center gap-2">
									<span className="w-0.5 h-3.5 bg-theme-border rounded-full" />
									{category}
								</h3>
								<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
									{categorySkills.map((skill) => (
										<SkillCard key={skill.name} skill={skill} />
									))}
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default SkillsSection
