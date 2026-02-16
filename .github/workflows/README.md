# GitHub Actions workflows

| Workflow | Trigger | What it does |
|----------|---------|----------------|
| **Deploy to GitHub Pages** (`pages.yml`) | Push to `main` (only when `app/`, `cms/`, or `.github/workflows/` change) or manual | Builds the app, generates CV when CMS changed, copies CMS to dist, deploys to GitHub Pages. Uses path detection and caching (node_modules, CV output) so only affected steps run. |
| **Metrics** (`metrics.yml`) | Daily 00:00 UTC, or push when `README.md` / `metrics.yml` change, or manual | Generates `github-metrics.svg` (lowlighter/metrics). **Requires repo secret `METRICS_TOKEN`** (PAT). Commits the SVG to `main`. |
| **generate animation** (`snake.yml`) | Every 12 hours, or push when `README.md` / `snake.yml` change, or manual | Generates contribution snake SVGs and pushes them to the `output` branch (used by README). |
| **GitHub-Profile-3D-Contrib** (`profile-3d-contrib.yml`) | Daily 18:00 UTC or manual | Generates 3D contribution graph and commits it to the repo. |

**Optimizations**
- **Pages:** RenderCV runs only when `cms/` changed; `node_modules` and CV output are cached.
- **Metrics & snake:** Run on push only when README or their workflow file changes, so app/CMS pushes don’t trigger them.
