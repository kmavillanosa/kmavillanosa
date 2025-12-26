# OAuth Setup Guide - Fix the 404 Auth Error

## The Problem

When you click "Login with GitHub", Decap CMS tries to access:
```
https://kmavillanosa.github.io/auth?provider=github&...
```

But this endpoint doesn't exist because **GitHub Pages is static** and can't run server-side OAuth code.

## ✅ Solution: Use DecapBridge (Easiest - 5 Minutes)

DecapBridge is a free service that provides the OAuth proxy you need.

### Step 1: Sign Up for DecapBridge

1. Go to: **https://decapbridge.com/**
2. Click **"Get Started"** or **"Sign Up"**
3. Sign in with your GitHub account
4. Authorize DecapBridge to access your repositories

### Step 2: Connect Your Repository

1. In DecapBridge dashboard, click **"Add Site"** or **"Connect Repository"**
2. Select your repository: `kmavillanosa/kmavillanosa`
3. DecapBridge will generate a proxy URL for you (something like: `https://xxxxx.decapbridge.com`)

### Step 3: Update Your Config

1. **Copy the proxy URL** from DecapBridge
2. **Update `cms/admin/config.yml`**:

Replace this:
```yaml
backend:
  name: github
  repo: kmavillanosa/kmavillanosa
  branch: main
  base_url: https://kmavillanosa.github.io/kmavillanosa
```

With this (replace `YOUR_PROXY_URL` with your DecapBridge URL):
```yaml
backend:
  name: github
  repo: kmavillanosa/kmavillanosa
  branch: main
  base_url: https://YOUR_PROXY_URL.decapbridge.com
  auth_endpoint: auth
```

### Step 4: Push and Test

```bash
git add cms/admin/config.yml
git commit -m "Configure DecapBridge OAuth proxy"
git push origin main
```

Wait 2-3 minutes, then try logging in again!

---

## Alternative: Deploy Your Own OAuth Proxy

If you prefer to host your own OAuth proxy:

### Option A: Cloudflare Workers (Free)

1. **Fork this template**: https://github.com/sterlingwes/decap-proxy
2. **Deploy to Cloudflare Workers** (free tier available)
3. **Set environment variables**:
   - `OAUTH_CLIENT_ID` - From your GitHub OAuth App
   - `OAUTH_CLIENT_SECRET` - From your GitHub OAuth App
4. **Update config.yml** with your Cloudflare Worker URL

### Option B: Vercel/Netlify Function

Similar process - deploy a serverless function to handle OAuth.

---

## Create GitHub OAuth App (Required for Any Solution)

Before using DecapBridge or any proxy, create a GitHub OAuth App:

1. Go to: https://github.com/settings/developers/oauth_apps
2. Click **"New OAuth App"**
3. Fill in:
   - **Application name**: `Headless CMS` (or any name)
   - **Homepage URL**: `https://kmavillanosa.github.io/kmavillanosa`
   - **Authorization callback URL**: 
     - For DecapBridge: Use the callback URL they provide
     - For custom proxy: `https://your-proxy-domain.com/callback`
4. Click **"Register application"**
5. **Copy the Client ID**
6. **Generate a Client Secret** and copy it

**Note**: For DecapBridge, you'll enter these in their dashboard. For custom proxies, you'll set them as environment variables.

---

## Quick Start with DecapBridge

1. ✅ Go to https://decapbridge.com/
2. ✅ Sign up with GitHub
3. ✅ Connect repository `kmavillanosa/kmavillanosa`
4. ✅ Copy the proxy URL
5. ✅ Update `config.yml` with the proxy URL
6. ✅ Push changes
7. ✅ Test login!

**That's it!** DecapBridge handles everything else.

---

## Troubleshooting

### Still getting 404?

- Make sure you updated `base_url` in `config.yml`
- Verify the proxy URL is correct (no typos)
- Wait 2-3 minutes after pushing changes
- Clear browser cache

### OAuth app errors?

- Verify callback URL matches exactly
- Check Client ID and Secret are correct
- Make sure OAuth app is not suspended

### DecapBridge not working?

- Check DecapBridge dashboard for errors
- Verify repository is connected
- Make sure OAuth app is configured in DecapBridge

---

## Why This Is Needed

GitHub OAuth requires:
1. ✅ Client ID and Secret (you have this)
2. ❌ Server-side code to handle the OAuth flow (GitHub Pages can't do this)
3. ✅ OAuth proxy (DecapBridge provides this)

That's why you need DecapBridge or a custom proxy!

