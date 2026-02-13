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
				group flex items-center gap-3 sm:gap-4 rounded-xl border border-gray-200/80 dark:border-gray-600/60
				bg-white dark:bg-gray-800/80 px-4 py-3 sm:px-5 sm:py-3.5
				transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50
				hover:border-green-200 dark:hover:border-green-700/60 hover:-translate-y-0.5
			"
		>
			<div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-100 dark:bg-gray-700/80 flex items-center justify-center overflow-hidden ring-1 ring-gray-200/50 dark:ring-gray-600/50">
				{techStackIconName ? (
					<StackIcon
						name={techStackIconName}
						variant={variant}
						className="w-6 h-6 sm:w-8 sm:h-8 [&_svg]:w-full [&_svg]:h-full [&_svg]:object-contain"
					/>
				) : logoUrl ? (
					<img
						src={logoUrl}
						alt=""
						className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
						loading="lazy"
					/>
				) : (
					<span className="text-lg sm:text-xl font-bold text-gray-400 dark:text-gray-500 select-none">
						{skill.name.charAt(0)}
					</span>
				)}
			</div>
			<span className="font-medium text-gray-800 dark:text-gray-200 text-sm sm:text-base truncate">
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
				className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
			>
				<div className="max-w-7xl mx-auto">
					<div className="flex justify-center items-center min-h-[400px]">
						<Spinner size="xl" />
					</div>
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
			className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
		>
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-12 sm:mb-16">
					<div className="inline-block mb-4">
						<span className="text-green-600 dark:text-green-400 font-semibold text-sm uppercase tracking-wider">
							Skills & Technologies
						</span>
					</div>
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
						Technical Expertise
					</h2>
					<p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
						A comprehensive toolkit of modern technologies and frameworks I use to
						build exceptional solutions.
					</p>
				</div>

				<div className="space-y-10 sm:space-y-12">
					{categories.map((category) => {
						const categorySkills = skills.filter((s) => s.category === category)
						return (
							<div key={category}>
								<h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
									<span className="w-1 h-5 sm:h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full" />
									{category}
								</h3>
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
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
