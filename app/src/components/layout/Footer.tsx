import { useSiteSettings } from '@/hooks/useSiteSettings'
import { Footer as FlowbiteFooter } from 'flowbite-react'

function Footer() {
	const { data: settings } = useSiteSettings()

	return (
		<FlowbiteFooter container className="bg-gray-900 border-t border-gray-700">
			<FlowbiteFooter.Copyright
				href="#"
				by={`${settings?.author || 'Kim Avillanosa'} ${new Date().getFullYear()}`}
				year={new Date().getFullYear()}
				className="text-gray-400"
			/>
		</FlowbiteFooter>
	)
}

export default Footer

