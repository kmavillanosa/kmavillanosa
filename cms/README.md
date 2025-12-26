# Headless CMS Setup

This is a [Decap CMS](https://decapcms.org/) (formerly Netlify CMS) setup that can be deployed on GitHub Pages.

## Features

- **Git-based**: All content is stored in your repository
- **GitHub Pages compatible**: Works with static site hosting
- **No backend required**: Uses GitHub as the backend via Git Gateway
- **Markdown support**: Write content in Markdown
- **Media management**: Upload and manage images and files

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the sidebar
3. Select the branch (usually `main`) and folder (`/ (root)`)
4. Save the settings

### 2. Configure Authentication

For GitHub Pages, you have two options:

#### Option A: GitHub Backend (Recommended for GitHub Pages)

1. Update `admin/config.yml` to use the GitHub backend:
   - Change `name: git-gateway` to `name: github`
   - Update the `repo` field with your GitHub username and repository name
   - Update the `base_url` with your GitHub Pages URL

2. Create a GitHub OAuth App:
   - Go to GitHub Settings → Developer settings → OAuth Apps
   - Click "New OAuth App"
   - Fill in:
     - **Application name**: Your CMS name
     - **Homepage URL**: `https://yourusername.github.io` (or your custom domain)
     - **Authorization callback URL**: `https://yourusername.github.io/cms/admin/index.html`
   - Copy the **Client ID**
   - Generate and copy a **Client secret**

3. Add OAuth credentials to your config (see Option B for a more secure approach)

#### Option B: Implicit Grant (Simpler, but less secure)

The current `config.yml` uses `git-gateway` which requires Netlify. For GitHub Pages, you can use the GitHub backend with implicit grant. See `config.github.yml` for an example configuration.

**Note**: For production, consider using environment variables or a proxy service to keep your OAuth credentials secure.

### 3. Update Configuration

Before deploying, make sure to:

1. Update `admin/config.yml` with your repository details:
   - Replace `yourusername/kmavillanosa` with your actual GitHub username and repo
   - Update the `base_url` with your GitHub Pages URL
   - If using GitHub backend, ensure OAuth is properly configured

2. Or use the alternative `config.github.yml` as a template and rename it to `config.yml`

### 4. Deploy

1. Commit and push your changes to the `main` branch
2. GitHub Pages will automatically deploy (or use the provided GitHub Actions workflow)
3. Wait a few minutes for the deployment to complete

### 5. Access the CMS

Once deployed, access your CMS at:
- `https://yourusername.github.io/cms/admin/index.html`

Or if you set up a custom domain:
- `https://yourdomain.com/cms/admin/index.html`

## Content Structure

- **Pages**: Stored in `cms/content/pages/`
- **Posts**: Stored in `cms/content/posts/`
- **Settings**: Stored in `cms/content/settings/`
- **Media**: Stored in `cms/media/`

## Customization

### Adding New Collections

Edit `admin/config.yml` to add new content types. For example:

```yaml
- name: 'products'
  label: 'Products'
  folder: 'cms/content/products'
  create: true
  slug: '{{slug}}'
  fields:
    - { label: 'Name', name: 'name', widget: 'string' }
    - { label: 'Price', name: 'price', widget: 'number' }
    - { label: 'Description', name: 'description', widget: 'markdown' }
```

### Changing Media Folder

Update the `media_folder` and `public_folder` in `admin/config.yml`:

```yaml
media_folder: 'cms/media'
public_folder: '/cms/media'
```

## Local Development

To test the CMS locally:

1. Install a local server (e.g., `python -m http.server` or `npx serve`)
2. Navigate to `http://localhost:8000/cms/admin/index.html`
3. Note: Authentication won't work locally unless you set up a local proxy

## Troubleshooting

### Authentication Issues

- Ensure your OAuth callback URL matches exactly
- Check that your GitHub Pages URL is correct
- Verify OAuth app settings in GitHub

### Content Not Saving

- Check repository permissions
- Verify branch name in `config.yml` matches your default branch
- Ensure Git Gateway is properly configured

## Resources

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Git Gateway Setup](https://decapcms.org/docs/authentication-backends/#git-gateway)
- [GitHub OAuth Apps](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)

