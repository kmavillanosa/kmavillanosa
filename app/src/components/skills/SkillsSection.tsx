import { useSkills } from '@/hooks/useSkills'
import { Spinner } from 'flowbite-react'

function SkillsSection() {
	const { data: skillsData, loading } = useSkills()

	if (loading) {
		return (
			<section id="skills-section" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
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

	const { skills, categoryColors } = skillsData
	const categories = Array.from(new Set(skills.map(s => s.category)))

	return (
		<section id="skills-section" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<div className="inline-block mb-4">
						<span className="text-green-600 dark:text-green-400 font-semibold text-sm uppercase tracking-wider">Skills & Technologies</span>
					</div>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
						Technical Expertise
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
						A comprehensive toolkit of modern technologies and frameworks I use to build exceptional solutions.
					</p>
				</div>

				<div className="space-y-8">
					{categories.map((category) => {
						const categorySkills = skills.filter(s => s.category === category)
						return (
							<div key={category} className="mb-8">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
									<span className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></span>
									{category}
								</h3>
								<div className="flex flex-wrap gap-3">
									{categorySkills.map((skill) => (
										<span
											key={skill.name}
											className={`px-4 py-2 rounded-lg bg-gradient-to-br ${categoryColors[category]} border border-current/20 font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-md`}
										>
											{skill.name}
										</span>
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

