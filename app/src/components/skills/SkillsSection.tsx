import { useSkills } from '@/hooks/useSkills'
import { Spinner } from 'flowbite-react'
import StackIcon from 'tech-stack-icons'
import { useThemeStore } from '@/stores/themeStore'
import { getTechStackIconName, getSkillLogoUrl } from './skill-logos'

const HEX_COLS = 8
const ROW_CLASS = 'flex flex-wrap justify-center gap-[4px] mb-[-2px]'

function SkillHex({
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
			className="skill-hex w-14 h-16 sm:w-16 sm:h-[74px] flex flex-col items-center justify-center bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-600/60 transition-all duration-200 hover:border-green-400 dark:hover:border-green-500 hover:shadow-md hover:scale-105 hover:z-10"
			title={skill.name}
		>
			<div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full [&_svg]:object-contain">
				{techStackIconName ? (
					<StackIcon
						name={techStackIconName}
						variant={variant}
						className="w-full h-full [&_svg]:w-full [&_svg]:h-full [&_svg]:object-contain"
					/>
				) : logoUrl ? (
					<img
						src={logoUrl}
						alt=""
						className="w-full h-full object-contain"
						loading="lazy"
					/>
				) : (
					<span className="text-xs sm:text-sm font-bold text-gray-400 dark:text-gray-500 select-none">
						{skill.name.charAt(0)}
					</span>
				)}
			</div>
			<span className="text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 truncate w-full text-center px-0.5 mt-0.5 leading-tight">
				{skill.name.length > 10 ? skill.name.slice(0, 9) + '…' : skill.name}
			</span>
		</div>
	)
}

function chunk<T>(arr: T[], size: number): T[][] {
	const out: T[][] = []
	for (let i = 0; i < arr.length; i += size) {
		out.push(arr.slice(i, i + size))
	}
	return out
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
				<div className="text-center mb-10 sm:mb-12">
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

				<div className="space-y-8 sm:space-y-10">
					{categories.map((category) => {
						const categorySkills = skills.filter((s) => s.category === category)
						const rows = chunk(categorySkills, HEX_COLS)
						return (
							<div key={category}>
								<h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
									<span className="w-1 h-5 sm:h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full" />
									{category}
								</h3>
								<div className="flex flex-col items-center gap-0">
									{rows.map((row, rowIndex) => (
										<div
											key={rowIndex}
											className={`${ROW_CLASS} ${rowIndex % 2 === 1 ? 'hex-row-even' : ''}`}
										>
											{row.map((skill) => (
												<SkillHex key={skill.name} skill={skill} />
											))}
										</div>
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
