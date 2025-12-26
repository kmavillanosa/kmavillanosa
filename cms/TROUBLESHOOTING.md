# Troubleshooting Guide

## What You Should See

When you visit `https://kmavillanosa.github.io/cms/admin/index.html`, you should see:

1. **If GitHub Pages is working**: The Decap CMS interface should load
2. **If not authenticated**: You'll see a "Login with GitHub" button
3. **If OAuth isn't set up**: You might see an error about authentication

## Common Issues & Solutions

### Issue 1: 404 Error

**Symptoms**: Page not found error

**Solutions**:
1. Verify GitHub Pages is enabled:
   - Go to: https://github.com/kmavillanosa/kmavillanosa/settings/pages
   - Ensure source is set to `main` branch, `/ (root)` folder
   
2. Check deployment status:
   - Go to: https://github.com/kmavillanosa/kmavillanosa/actions
   - Look for "Deploy to GitHub Pages" workflow
   - Wait for it to complete (green checkmark)

3. Wait 2-5 minutes after enabling Pages (propagation delay)

4. Clear browser cache or try incognito mode

### Issue 2: CMS Loads But Can't Authenticate

**Symptoms**: CMS interface appears but login fails or shows error

**Solutions**:
1. **Set up GitHub OAuth App** (Required):
   - Go to: https://github.com/settings/developers
   - Click **OAuth Apps** → **New OAuth App**
   - Fill in:
     - **Application name**: `Headless CMS`
     - **Homepage URL**: `https://kmavillanosa.github.io`
     - **Authorization callback URL**: `https://kmavillanosa.github.io/cms/admin/index.html`
   - Click **Register application**
   - **Important**: Copy the **Client ID** (you'll need it)

2. **For GitHub Pages, you have two options**:

   **Option A: Use DecapBridge (Easiest)**
   - Visit: https://decapbridge.com/
   - This provides ready-to-go authentication for Decap CMS on GitHub Pages
   - Follow their setup instructions

   **Option B: Manual OAuth Setup**
   - The GitHub backend uses implicit grant flow
   - You'll need to configure OAuth properly
   - This is more complex but gives you full control

### Issue 3: Config File Not Found

**Symptoms**: Error about missing config.yml

**Solutions**:
1. Verify `config.yml` exists at: `cms/admin/config.yml`
2. Check file is committed to repository
3. Verify file is in the `main` branch

### Issue 4: Content Not Saving

**Symptoms**: Can create/edit but changes don't save

**Solutions**:
1. Check repository permissions - ensure you have write access
2. Verify branch name in `config.yml` matches your default branch (`main`)
3. Check browser console for errors (F12 → Console tab)
4. Ensure you're authenticated properly

## Quick Verification Checklist

- [ ] GitHub Pages is enabled in repository settings
- [ ] Files are pushed to `main` branch
- [ ] `index.html` exists at root
- [ ] `cms/admin/index.html` exists
- [ ] `cms/admin/config.yml` exists
- [ ] GitHub OAuth App is created (for authentication)
- [ ] OAuth callback URL matches exactly: `https://kmavillanosa.github.io/cms/admin/index.html`

## Still Having Issues?

1. **Check browser console** (F12) for JavaScript errors
2. **Check network tab** to see if files are loading
3. **Verify file paths** are correct in repository
4. **Try a different browser** to rule out browser-specific issues

## Recommended: Use DecapBridge

For the easiest setup on GitHub Pages, consider using [DecapBridge](https://decapbridge.com/):
- Handles authentication automatically
- No OAuth app setup required
- Works seamlessly with GitHub Pages
- Free tier available

