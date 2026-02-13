import { useSiteSettings } from '@/hooks/useSiteSettings'
import { getVersionString } from '@/utils/version'

function Footer() {
	const { data: settings } = useSiteSettings()

	return (
		<footer className="bg-theme-elevated border-t border-theme px-4 sm:px-6 py-4 sm:py-6">
			<div className="max-w-7xl mx-auto text-center space-y-2">
				<p className="text-sm sm:text-base text-theme-text-secondary">
					&copy; {new Date().getFullYear()} {settings?.author || 'Kim Avillanosa'}
				</p>
				<p className="text-xs text-theme-text-muted font-mono">
					{getVersionString()}
				</p>
			</div>
		</footer>
	)
}

export default Footer

