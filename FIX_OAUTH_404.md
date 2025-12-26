# Fix OAuth 404 Error - GitHub Login Issue

## The Problem

When you click "Login with GitHub" in Decap CMS, you get a 404 error. This happens because:

1. **GitHub OAuth requires server-side code** to handle the authentication flow
2. **GitHub Pages is static** - it can't run server-side code
3. The OAuth callback URL might be incorrect

## Solution Options

You have **3 options** to fix this:

---

## Option 1: Use DecapBridge (Easiest - Recommended) ⭐

DecapBridge is a free service that handles OAuth for Decap CMS on GitHub Pages.

### Steps:

1. **Go to DecapBridge**: https://decapbridge.com/
2. **Sign up** (it's free)
3. **Connect your GitHub repository**
4. **Copy the proxy URL** they provide
5. **Update your config.yml**:

```yaml
backend:
  name: github
  repo: kmavillanosa/kmavillanosa
  branch: main
  base_url: https://your-proxy-url.decapbridge.com  # Replace with your DecapBridge URL
  auth_endpoint: auth
```

6. **Push the changes** and test

**This is the easiest solution and requires no server setup!**

---

## Option 2: Fix GitHub OAuth App Callback URL

If you want to use GitHub OAuth directly, you need to:

### Step 1: Update Your GitHub OAuth App

1. Go to: https://github.com/settings/developers
2. Click on your OAuth App (or create a new one)
3. **Update these fields**:
   - **Homepage URL**: `https://kmavillanosa.github.io/kmavillanosa`
   - **Authorization callback URL**: `https://kmavillanosa.github.io/kmavillanosa/cms/admin/index.html`
4. **Save** the changes

### Step 2: Use an OAuth Proxy

Since GitHub Pages can't handle OAuth server-side, you need an OAuth proxy:

**Option A: Deploy Decap CMS OAuth Provider**
- Go to: https://github.com/decaporg/decap-cms-github-oauth-provider
- Deploy to Heroku, Vercel, or similar
- Set environment variables with your OAuth Client ID and Secret
- Update `config.yml` with the proxy URL

**Option B: Use a Simple OAuth Proxy Service**
- Services like `netlify-oauth-provider` or similar
- Deploy and configure

### Step 3: Update config.yml

```yaml
backend:
  name: github
  repo: kmavillanosa/kmavillanosa
  branch: main
  base_url: https://your-oauth-proxy-url.com  # Your OAuth proxy URL
  auth_endpoint: auth
```

---

## Option 3: Use Git Gateway (Requires Netlify)

This option requires using Netlify instead of GitHub Pages:

1. Deploy your site to Netlify
2. Enable Git Gateway in Netlify settings
3. Update config.yml to use `git-gateway`

**Note**: This means moving away from GitHub Pages.

---

## Quick Fix - Verify OAuth App Settings

Before trying the above, make sure your GitHub OAuth App is configured correctly:

1. **Go to**: https://github.com/settings/developers/oauth_apps
2. **Check your OAuth App** (or create one if you haven't):
   - **Application name**: `Headless CMS` (or any name)
   - **Homepage URL**: `https://kmavillanosa.github.io/kmavillanosa`
   - **Authorization callback URL**: `https://kmavillanosa.github.io/kmavillanosa/cms/admin/index.html`
3. **Copy the Client ID** (you'll need it)

**Important**: The callback URL must match **exactly** - including the trailing slash or lack thereof.

---

## Recommended: Use DecapBridge

For the easiest setup, I **strongly recommend Option 1 (DecapBridge)**:

1. ✅ Free
2. ✅ No server setup required
3. ✅ Works perfectly with GitHub Pages
4. ✅ Handles all OAuth complexity
5. ✅ Takes 5 minutes to set up

Just go to https://decapbridge.com/ and follow their setup guide!

---

## After Fixing

Once you've set up the OAuth proxy (DecapBridge or custom):

1. **Update config.yml** with the proxy URL
2. **Push changes**:
   ```bash
   git add cms/admin/config.yml
   git commit -m "Fix OAuth configuration"
   git push origin main
   ```
3. **Wait 2-3 minutes** for deployment
4. **Test login** at: https://kmavillanosa.github.io/kmavillanosa/cms/admin/index.html

---

## Still Having Issues?

1. **Check browser console** (F12) for error messages
2. **Verify OAuth app callback URL** matches exactly
3. **Clear browser cache** and try again
4. **Check if OAuth proxy is running** (if using custom proxy)

