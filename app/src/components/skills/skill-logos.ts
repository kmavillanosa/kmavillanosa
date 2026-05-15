import type { IconName } from 'tech-stack-icons'

/**
 * Map skill names to tech-stack-icons icon names (free, 450+ icons).
 * @see https://www.tech-stack-icons.com/
 * Add entries here when new skills are added; icon names must match the package.
 */
export const SKILL_TO_TECH_STACK_ICON: Record<string, IconName> = {
	'TypeScript': 'typescript',
	'JavaScript': 'js',
	'C#': 'c#',
	'React': 'react',
	'Next.js': 'nextjs',
	'Create-React-App': 'react',
	'Vite React': 'vitejs',
	'CSS': 'css3',
	'Sass': 'sass',
	'Bootstrap': 'bootstrap5',
	'Material UI': 'materialui',
	'Tailwind CSS': 'tailwindcss',
	'React Redux': 'redux',
	'D3': 'nodejs',
	'Three.JS': 'threejs',
	'.NET Framework': 'net',
	'.NET Core': 'netcore',
	'Ionic React': 'ionic',
	'React Native': 'react',
	'OutSystems': 'netlify',
	'ASP.NET Core': 'netcore',
	'ASP.NET Framework': 'net',
	'Express.js': 'expressjs',
	'NestJS': 'nestjs',
	'GraphQL': 'graphql',
	'Auth0': 'auth0',
	'Azure AD': 'microsoft',
	'MySQL': 'mysql',
	'MSSQL': 'microsoft',
	'Azure': 'azure',
	'Netlify': 'netlify',
	'Vercel': 'vercel',
	'Docker': 'docker',
	'Docker Compose': 'docker',
	'Jenkins': 'jenkins',
	'Azure Pipeline': 'azure',
	'Azure DevOps': 'azure',
	'GitHub Workflows': 'github',
	'Git': 'git',
	'GitLab': 'gitlab',
	'GitHub': 'github',
	'XUnit': 'nodejs',
	'Jest': 'jest',
	'Swagger': 'swagger',
	'Slack': 'slack',
	'MS Teams': 'microsoft',
	'Trello': 'trello',
	'Jira': 'jira',
	"Vite" : 'vitejs',
}

const CMS_MEDIA_BASE = '/kmavillanosa/cms/media'

/**
 * Returns the tech-stack-icons icon name for a skill, or null if not available.
 * CMS icon override (filename) is not used for tech-stack-icons; use for local fallback only.
 */
export function getTechStackIconName(
	skillName: string,
	_iconFromCms?: string
): IconName | null {
	return SKILL_TO_TECH_STACK_ICON[skillName] ?? null
}

/**
 * Fallback: local logo URL from cms/media when tech-stack-icons has no match.
 * Used when skill has explicit "icon" in CMS or for legacy local filenames.
 */
export const SKILL_LOGO_MAP: Record<string, string> = {
	'WPF': 'wpf.png',
	'Zustand': 'zustand.png',
}

export function getSkillLogoUrl(skillName: string, iconFromCms?: string): string | null {
	if (iconFromCms) {
		return iconFromCms.startsWith('http') || iconFromCms.startsWith('/')
			? iconFromCms
			: `${CMS_MEDIA_BASE}/${iconFromCms}`
	}
	const filename = SKILL_LOGO_MAP[skillName]
	return filename ? `${CMS_MEDIA_BASE}/${filename}` : null
}
