import { Card } from 'flowbite-react'

interface Skill {
	name: string
	category: string
	icon?: string
}

const skills: Skill[] = [
	// Frontend
	{ name: 'React', category: 'Frontend' },
	{ name: 'TypeScript', category: 'Frontend' },
	{ name: 'JavaScript', category: 'Frontend' },
	{ name: 'Next.js', category: 'Frontend' },
	{ name: 'Vite', category: 'Frontend' },
	{ name: 'Tailwind CSS', category: 'Frontend' },
	{ name: 'HTML/CSS', category: 'Frontend' },
	{ name: 'Three.js', category: 'Frontend' },
	// Backend
	{ name: 'Node.js', category: 'Backend' },
	{ name: 'Python', category: 'Backend' },
	{ name: 'PHP', category: 'Backend' },
	{ name: 'REST APIs', category: 'Backend' },
	{ name: 'GraphQL', category: 'Backend' },
	// Database
	{ name: 'PostgreSQL', category: 'Database' },
	{ name: 'MySQL', category: 'Database' },
	{ name: 'MongoDB', category: 'Database' },
	// Tools & Others
	{ name: 'Git', category: 'Tools' },
	{ name: 'Docker', category: 'Tools' },
	{ name: 'CI/CD', category: 'Tools' },
	{ name: 'Web Scraping', category: 'Tools' },
	{ name: 'Automation', category: 'Tools' },
	{ name: '3D Graphics', category: 'Specialized' },
	{ name: 'System Architecture', category: 'Specialized' },
]

const categoryColors: Record<string, string> = {
	Frontend: 'from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/40 text-blue-700 dark:text-blue-300',
	Backend: 'from-green-100 to-green-50 dark:from-green-900/40 dark:to-green-800/40 text-green-700 dark:text-green-300',
	Database: 'from-purple-100 to-purple-50 dark:from-purple-900/40 dark:to-purple-800/40 text-purple-700 dark:text-purple-300',
	Tools: 'from-orange-100 to-orange-50 dark:from-orange-900/40 dark:to-orange-800/40 text-orange-700 dark:text-orange-300',
	Specialized: 'from-teal-100 to-teal-50 dark:from-teal-900/40 dark:to-teal-800/40 text-teal-700 dark:text-teal-300',
}

function SkillsSection() {
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

