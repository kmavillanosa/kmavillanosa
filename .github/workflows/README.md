# GitHub Actions workflows

| Workflow | Trigger | What it does |
|----------|---------|----------------|
| **Deploy to GitHub Pages** (`pages.yml`) | Push to `main` (only when `app/`, `cms/`, or `.github/workflows/` change), daily 00:00 UTC, or manual | **Unified:** (1) Refreshes profile metrics (`github-metrics.svg`) and commits to `main`; (2) on push or manual, also builds the app, generates CV when CMS changed, copies CMS to dist, and deploys to GitHub Pages. Path filter ensures a metrics-only commit does not re-trigger the workflow. **Requires repo secret `METRICS_TOKEN`** (PAT). |

**Optimizations**
- **Pages:** RenderCV runs only when `cms/` changed; `node_modules` and CV output are cached.
- **Path filter:** Push runs only when `app/`, `cms/`, or `.github/workflows/` change, so commits that only touch `README.md` or `github-metrics.svg` (e.g. from the daily metrics run) do not trigger a full build/deploy.
