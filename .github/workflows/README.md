# GitHub Actions workflows

| Workflow | Trigger | What it does |
|----------|---------|----------------|
| **Deploy to GitHub Pages** (`pages.yml`) | Push to `main` (only when `app/`, `cms/`, or `.github/workflows/` change), daily 00:00 UTC, or manual | **Unified:** Generates profile metrics (no commit to repo), builds the app, deploys to GitHub Pages. Metrics SVG is written to `app/public/github-metrics.svg` and served from the site; profile README uses the deployed URL. **No bot commits to main** so the portfolio is never overwritten. **Requires repo secret `METRICS_TOKEN`** (PAT). |

**Optimizations**
- **Pages:** RenderCV runs only when `cms/` changed; `node_modules` and CV output are cached.
- **Path filter:** Push runs only when `app/`, `cms/`, or `.github/workflows/` change.
- **Safe for portfolio:** Workflow uses `contents: read` and `output_action: none` for metrics so nothing is ever committed to `main` by the bot.
