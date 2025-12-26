import { useSiteSettings } from '@/hooks/useSiteSettings'

function Footer() {
	const { data: settings } = useSiteSettings()

	return (
		<footer className="bg-gray-900 border-t border-gray-700 px-4 py-6">
			<div className="max-w-7xl mx-auto text-center">
				<p className="text-gray-400">
					&copy; {new Date().getFullYear()} {settings?.author || 'Kim Avillanosa'}
				</p>
			</div>
		</footer>
	)
}

export default Footer

