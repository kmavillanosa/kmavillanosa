import { useTheme } from '@/contexts/ThemeContext'

/**
 * Hook that provides theme color class names
 * Returns actual Tailwind class strings based on CMS theme configuration
 */
export function useThemeColors() {
	const { primaryColor, secondaryColor, accentColor } = useTheme()

	// Helper to get class name for a color and shade
	const getClass = (color: string, shade: number, prefix: string = '') => {
		return prefix ? `${prefix}-${color}-${shade}` : `${color}-${shade}`
	}

	return {
		primaryColor,
		secondaryColor,
		accentColor,
		// Text colors
		textPrimary: `text-${primaryColor}-600 dark:text-${primaryColor}-400`,
		textSecondary: `text-${secondaryColor}-600 dark:text-${secondaryColor}-400`,
		textAccent: `text-${accentColor}-600 dark:text-${accentColor}-400`,
		// Background colors
		bgPrimary50: `bg-${primaryColor}-50 dark:bg-${primaryColor}-900/30`,
		bgPrimary100: `bg-${primaryColor}-100 dark:bg-${primaryColor}-900/40`,
		bgSecondary50: `bg-${secondaryColor}-50 dark:bg-${secondaryColor}-900/30`,
		bgAccent50: `bg-${accentColor}-50 dark:bg-${accentColor}-900/30`,
		// Border colors
		borderPrimary: `border-${primaryColor}-200 dark:border-${primaryColor}-800`,
		borderPrimary300: `border-${primaryColor}-300 dark:border-${primaryColor}-700`,
		// Hover colors
		hoverPrimary: `hover:text-${primaryColor}-600 dark:hover:text-${primaryColor}-400`,
		hoverBorderPrimary: `hover:border-${primaryColor}-300 dark:hover:border-${primaryColor}-700`,
		// Gradient
		gradientPrimary: `from-${primaryColor}-600 via-${secondaryColor}-500 to-${primaryColor}-600 dark:from-${primaryColor}-400 dark:via-${secondaryColor}-400 dark:to-${primaryColor}-400`,
		// Blob backgrounds
		blobPrimary: `bg-${primaryColor}-100 dark:bg-${primaryColor}-900`,
		blobSecondary: `bg-${secondaryColor}-100 dark:bg-${secondaryColor}-900`,
		blobAccent: `bg-${accentColor}-100 dark:bg-${accentColor}-900`,
	}
}

