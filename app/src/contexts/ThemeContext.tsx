import { createContext, useContext, ReactNode, useMemo } from 'react'
import { useSiteSettings } from '@/hooks/useSiteSettings'

interface ThemeContextType {
	primaryColor: string
	secondaryColor: string
	accentColor: string
	getColorClass: (shade: number, variant?: 'primary' | 'secondary' | 'accent') => string
	getGradientClass: (from: 'primary' | 'secondary' | 'accent', to: 'primary' | 'secondary' | 'accent') => string
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const defaultTheme = {
	primaryColor: 'green',
	secondaryColor: 'emerald',
	accentColor: 'teal',
}

// Color mapping for Tailwind classes
const colorClassMap: Record<string, Record<number, string>> = {
	green: {
		50: 'green-50',
		100: 'green-100',
		200: 'green-200',
		300: 'green-300',
		400: 'green-400',
		500: 'green-500',
		600: 'green-600',
		700: 'green-700',
		800: 'green-800',
		900: 'green-900',
	},
	emerald: {
		50: 'emerald-50',
		100: 'emerald-100',
		200: 'emerald-200',
		300: 'emerald-300',
		400: 'emerald-400',
		500: 'emerald-500',
		600: 'emerald-600',
		700: 'emerald-700',
		800: 'emerald-800',
		900: 'emerald-900',
	},
	teal: {
		50: 'teal-50',
		100: 'teal-100',
		200: 'teal-200',
		300: 'teal-300',
		400: 'teal-400',
		500: 'teal-500',
		600: 'teal-600',
		700: 'teal-700',
		800: 'teal-800',
		900: 'teal-900',
	},
	blue: {
		50: 'blue-50',
		100: 'blue-100',
		200: 'blue-200',
		300: 'blue-300',
		400: 'blue-400',
		500: 'blue-500',
		600: 'blue-600',
		700: 'blue-700',
		800: 'blue-800',
		900: 'blue-900',
	},
	purple: {
		50: 'purple-50',
		100: 'purple-100',
		200: 'purple-200',
		300: 'purple-300',
		400: 'purple-400',
		500: 'purple-500',
		600: 'purple-600',
		700: 'purple-700',
		800: 'purple-800',
		900: 'purple-900',
	},
	pink: {
		50: 'pink-50',
		100: 'pink-100',
		200: 'pink-200',
		300: 'pink-300',
		400: 'pink-400',
		500: 'pink-500',
		600: 'pink-600',
		700: 'pink-700',
		800: 'pink-800',
		900: 'pink-900',
	},
	red: {
		50: 'red-50',
		100: 'red-100',
		200: 'red-200',
		300: 'red-300',
		400: 'red-400',
		500: 'red-500',
		600: 'red-600',
		700: 'red-700',
		800: 'red-800',
		900: 'red-900',
	},
	orange: {
		50: 'orange-50',
		100: 'orange-100',
		200: 'orange-200',
		300: 'orange-300',
		400: 'orange-400',
		500: 'orange-500',
		600: 'orange-600',
		700: 'orange-700',
		800: 'orange-800',
		900: 'orange-900',
	},
	yellow: {
		50: 'yellow-50',
		100: 'yellow-100',
		200: 'yellow-200',
		300: 'yellow-300',
		400: 'yellow-400',
		500: 'yellow-500',
		600: 'yellow-600',
		700: 'yellow-700',
		800: 'yellow-800',
		900: 'yellow-900',
	},
	indigo: {
		50: 'indigo-50',
		100: 'indigo-100',
		200: 'indigo-200',
		300: 'indigo-300',
		400: 'indigo-400',
		500: 'indigo-500',
		600: 'indigo-600',
		700: 'indigo-700',
		800: 'indigo-800',
		900: 'indigo-900',
	},
	cyan: {
		50: 'cyan-50',
		100: 'cyan-100',
		200: 'cyan-200',
		300: 'cyan-300',
		400: 'cyan-400',
		500: 'cyan-500',
		600: 'cyan-600',
		700: 'cyan-700',
		800: 'cyan-800',
		900: 'cyan-900',
	},
	lime: {
		50: 'lime-50',
		100: 'lime-100',
		200: 'lime-200',
		300: 'lime-300',
		400: 'lime-400',
		500: 'lime-500',
		600: 'lime-600',
		700: 'lime-700',
		800: 'lime-800',
		900: 'lime-900',
	},
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const { data: settings } = useSiteSettings()
	
	const theme = useMemo(() => {
		const userTheme = settings?.theme || defaultTheme
		return {
			primaryColor: userTheme.primaryColor || defaultTheme.primaryColor,
			secondaryColor: userTheme.secondaryColor || defaultTheme.secondaryColor,
			accentColor: userTheme.accentColor || defaultTheme.accentColor,
		}
	}, [settings?.theme])

	const getColorClass = (shade: number, variant: 'primary' | 'secondary' | 'accent' = 'primary') => {
		const colorName = variant === 'primary' ? theme.primaryColor : variant === 'secondary' ? theme.secondaryColor : theme.accentColor
		return colorClassMap[colorName]?.[shade] || `green-${shade}`
	}

	const getGradientClass = (from: 'primary' | 'secondary' | 'accent', to: 'primary' | 'secondary' | 'accent') => {
		const fromColor = from === 'primary' ? theme.primaryColor : from === 'secondary' ? theme.secondaryColor : theme.accentColor
		const toColor = to === 'primary' ? theme.primaryColor : to === 'secondary' ? theme.secondaryColor : theme.accentColor
		const fromClass = colorClassMap[fromColor]?.[600] || 'green-600'
		const viaClass = colorClassMap[toColor]?.[500] || 'emerald-500'
		const toClass = colorClassMap[fromColor]?.[600] || 'green-600'
		const fromDarkClass = colorClassMap[fromColor]?.[400] || 'green-400'
		const viaDarkClass = colorClassMap[toColor]?.[400] || 'emerald-400'
		const toDarkClass = colorClassMap[fromColor]?.[400] || 'green-400'
		return `from-${fromClass} via-${viaClass} to-${toClass} dark:from-${fromDarkClass} dark:via-${viaDarkClass} dark:to-${toDarkClass}`
	}

	const value: ThemeContextType = {
		primaryColor: theme.primaryColor,
		secondaryColor: theme.secondaryColor,
		accentColor: theme.accentColor,
		getColorClass,
		getGradientClass,
	}

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
	const context = useContext(ThemeContext)
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}

