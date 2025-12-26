import { useSiteSettings } from '@/hooks/useSiteSettings'

function Footer() {
	const { data: settings } = useSiteSettings()

	return (
		<footer className="footer">
			<p>
				&copy; {new Date().getFullYear()} {settings?.author || 'Kim Avillanosa'}
			</p>
		</footer>
	)
}

export default Footer

