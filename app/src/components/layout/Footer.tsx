import { useSiteSettings } from '@/hooks/useSiteSettings'

function Footer() {
	const { data: settings } = useSiteSettings()

	return (
		<footer className="bg-gray-50 border-t border-gray-200 px-4 py-6">
			<div className="max-w-7xl mx-auto text-center">
				<p className="text-gray-600">
					&copy; {new Date().getFullYear()} {settings?.author || 'Kim Avillanosa'}
				</p>
			</div>
		</footer>
	)
}

export default Footer

