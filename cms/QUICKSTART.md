# Quick Start Guide

Get your headless CMS up and running on GitHub Pages in 5 minutes!

## Step 1: Update Configuration

Edit `cms/admin/config.yml` and update these values:

```yaml
backend:
  repo: yourusername/kmavillanosa  # ← Change this
  base_url: https://yourusername.github.io  # ← Change this
```

Replace `yourusername` with your actual GitHub username.

## Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**

## Step 3: Set Up GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **OAuth Apps** → **New OAuth App**
3. Fill in:
   - **Application name**: `My Headless CMS` (or any name)
   - **Homepage URL**: `https://yourusername.github.io`
   - **Authorization callback URL**: `https://yourusername.github.io/cms/admin/index.html`
4. Click **Register application**
5. Copy the **Client ID**
6. Click **Generate a new client secret** and copy it

## Step 4: Add OAuth to Config (Optional)

For a more secure setup, you can add OAuth credentials to your config. However, for GitHub Pages, the implicit grant flow will work without storing credentials in the config file.

## Step 5: Access Your CMS

1. Wait 2-3 minutes for GitHub Pages to deploy
2. Visit: `https://yourusername.github.io/cms/admin/index.html`
3. Click **Login with GitHub**
4. Authorize the application
5. Start creating content!

## What's Next?

- Create your first page or post
- Upload images to the media library
- Customize the content structure in `config.yml`
- Read the full [README.md](./README.md) for advanced configuration

## Troubleshooting

**Can't log in?**
- Make sure the callback URL in your OAuth app matches exactly: `https://yourusername.github.io/cms/admin/index.html`
- Check that GitHub Pages is enabled and deployed

**Content not saving?**
- Verify your repository name in `config.yml` is correct
- Ensure you have write access to the repository
- Check the browser console for errors

**Need help?**
- Check the [Decap CMS Documentation](https://decapcms.org/docs/)
- Review the full [README.md](./README.md)

