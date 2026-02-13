import { useSiteSettings } from '@/hooks/useSiteSettings'
import { getVersionString } from '@/utils/version'

function Footer() {
	const { data: settings } = useSiteSettings()

	return (
		<footer className="bg-ivory-100 dark:bg-gray-800 border-t border-stone-200 dark:border-gray-700 px-4 sm:px-6 py-4 sm:py-6">
			<div className="max-w-7xl mx-auto text-center space-y-2">
				<p className="text-sm sm:text-base text-stone-600 dark:text-gray-400">
					&copy; {new Date().getFullYear()} {settings?.author || 'Kim Avillanosa'}
				</p>
				<p className="text-xs text-stone-500 dark:text-gray-500 font-mono">
					{getVersionString()}
				</p>
			</div>
		</footer>
	)
}

export default Footer

