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
			className="
				group flex items-center gap-2 sm:gap-3 rounded-lg border border-stone-200 dark:border-gray-600/60
				bg-white dark:bg-gray-800/80 px-3 py-2 sm:px-4 sm:py-2.5
				transition-all duration-200 hover:shadow-md hover:border-green-200 dark:hover:border-green-700/60 hover:-translate-y-0.5
			"
		>
			<div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-stone-100 dark:bg-gray-700/80 flex items-center justify-center ring-1 ring-stone-200/50 dark:ring-gray-600/50">
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
			<span className="font-medium text-stone-800 dark:text-gray-200 text-sm truncate">
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
				className="py-12 px-4 bg-ivory-50 dark:from-gray-800 dark:to-gray-900"
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
			className="py-8 sm:py-10 px-4 sm:px-6 bg-gradient-to-b from-ivory-50 to-ivory-100 dark:from-gray-800 dark:to-gray-900"
		>
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-6 sm:mb-8">
					<span className="text-green-600 dark:text-green-400 font-semibold text-xs uppercase tracking-wider">
						Skills & Technologies
					</span>
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 dark:text-white mt-2 mb-2">
						Technical Expertise
					</h2>
					<p className="text-sm sm:text-base text-stone-600 dark:text-gray-400 max-w-xl mx-auto">
						Technologies and frameworks I use to build solutions.
					</p>
				</div>

				<div className="space-y-5 sm:space-y-6">
					{categories.map((category) => {
						const categorySkills = skills.filter((s) => s.category === category)
						return (
							<div key={category}>
								<h3 className="text-sm font-semibold text-stone-700 dark:text-gray-300 mb-2 flex items-center gap-2">
									<span className="w-0.5 h-4 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full" />
									{category}
								</h3>
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-2.5">
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
