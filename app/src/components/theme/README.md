# Theme Configuration

The theme colors are now configurable via CMS. You can change the primary, secondary, and accent colors from the CMS admin panel.

## CMS Configuration

1. Go to `/cms/admin`
2. Navigate to **Settings** → **Site Settings**
3. Scroll to **Theme Colors** section
4. Select your desired colors:
   - **Primary Color**: Main brand color (default: green)
   - **Secondary Color**: Secondary brand color (default: emerald)
   - **Accent Color**: Accent/highlight color (default: teal)

## Available Colors

- green
- blue
- purple
- pink
- red
- orange
- yellow
- indigo
- cyan
- teal
- emerald
- lime

## Usage in Components

```tsx
import { useThemeColors } from '@/hooks/useThemeColors'

function MyComponent() {
  const theme = useThemeColors()
  
  return (
    <div className={theme.textPrimary}>
      This text uses the primary theme color
    </div>
  )
}
```

## Available Theme Properties

- `textPrimary`, `textSecondary`, `textAccent` - Text colors
- `bgPrimary50`, `bgPrimary100`, etc. - Background colors
- `borderPrimary`, `borderPrimary300` - Border colors
- `hoverPrimary`, `hoverBorderPrimary` - Hover states
- `gradientPrimary` - Gradient classes
- `blobPrimary`, `blobSecondary`, `blobAccent` - Decorative blob backgrounds

