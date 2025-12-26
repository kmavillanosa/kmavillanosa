# GitHub Pages Setup Guide

Follow these steps to get your site live on GitHub Pages:

## Method 1: Using GitHub Actions (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Setup headless CMS"
   git push origin main
   ```

2. **Enable GitHub Pages via Actions**
   - Go to your repository: https://github.com/kmavillanosa/kmavillanosa
   - Click **Settings** → **Pages**
   - Under **Source**, select: **GitHub Actions**
   - The workflow will automatically deploy on the next push

3. **Wait for deployment**
   - Go to **Actions** tab to see the deployment progress
   - Once complete, your site will be live at: `https://kmavillanosa.github.io`

## Method 2: Using Branch Deployment (Alternative)

1. **Go to Repository Settings**
   - Navigate to: https://github.com/kmavillanosa/kmavillanosa/settings/pages

2. **Configure Pages**
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/ (root)`
   - Click **Save**

3. **Wait 1-2 minutes**
   - GitHub will build and deploy your site
   - Check the **Actions** tab for status

## Verify Deployment

Once deployed, you should be able to access:
- **Homepage**: https://kmavillanosa.github.io
- **CMS Admin**: https://kmavillanosa.github.io/cms/admin/index.html

## Troubleshooting

### Still seeing 404?

1. **Check Actions tab**: Make sure the deployment workflow completed successfully
2. **Wait a few minutes**: GitHub Pages can take 1-5 minutes to propagate
3. **Clear browser cache**: Try incognito/private mode
4. **Check branch name**: Ensure you're using `main` (not `master`)

### CMS not loading?

1. **Set up GitHub OAuth** (required for CMS authentication):
   - Go to: https://github.com/settings/developers
   - Click **New OAuth App**
   - **Homepage URL**: `https://kmavillanosa.github.io`
   - **Callback URL**: `https://kmavillanosa.github.io/cms/admin/index.html`
   - Save and note your Client ID

2. **Verify config.yml**: Make sure `cms/admin/config.yml` has correct repository name

## Next Steps

After GitHub Pages is live:
1. Set up GitHub OAuth for CMS authentication
2. Access your CMS at: `https://kmavillanosa.github.io/cms/admin/index.html`
3. Start creating content!

