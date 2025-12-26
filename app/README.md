# Vite React TypeScript App

This is a Vite + React + TypeScript application that consumes content from Decap CMS.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
app/
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── index.html          # HTML template
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
└── vite.config.ts      # Vite config
```

## CMS Integration

The app loads content from `cms/content/` directory:
- **Pages**: `cms/content/pages/*.md`
- **Posts**: `cms/content/posts/*.md`
- **Settings**: `cms/content/settings/site.json`

Content is loaded at build time using Vite's `import.meta.glob` feature, which means all markdown files are bundled into the application.

## Deployment

The app is configured to build to `../dist` directory and is deployed via GitHub Pages workflow.

