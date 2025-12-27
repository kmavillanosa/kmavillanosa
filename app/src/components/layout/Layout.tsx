import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import NavigationLoader from './NavigationLoader'
import ClarityAnalytics from '../analytics/ClarityAnalytics'

interface LayoutProps {
	children: ReactNode
}

function Layout({ children }: LayoutProps) {
	return (
		<div className="flex flex-col min-h-screen">
			<ClarityAnalytics />
			<NavigationLoader />
			<Header />
			<main className="flex-1 pt-20">{children}</main>
			<Footer />
		</div>
	)
}

export default Layout

