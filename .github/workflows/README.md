# GitHub Actions workflows

| Workflow | Trigger | What it does |
|----------|---------|----------------|
| **Deploy to GitHub Pages** (`pages.yml`) | Push to `main` (only when `app/`, `cms/`, or `.github/workflows/` change) or manual | Builds the app (and renders the CV when `cms/` changed), then deploys to GitHub Pages. **No bot commits to main** so the portfolio is never overwritten. |

**Optimizations**
- **Pages:** RenderCV runs only when `cms/` changed; `node_modules` and CV output are cached.
- **Path filter:** Push runs only when `app/`, `cms/`, or `.github/workflows/` change.
