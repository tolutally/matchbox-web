# 🔧 Fix Vercel Blank Screen - Quick Guide

Your app builds successfully but shows a blank screen on Vercel. Here's the fix:

## Root Cause
**Missing environment variables in Vercel.** Vite requires all client-side environment variables to start with `VITE_` and they must be configured in Vercel's dashboard.

## The Fix (5 minutes)

### Step 1: Add Environment Variables to Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your `matchbox-web` project
3. Click **Settings** tab
4. Click **Environment Variables** in the left sidebar
5. Add each of these variables:

```
Name: VITE_VAPI_PUBLIC_KEY
Value: fd36ff2f-26c4-4a23-829e-4216bd8f553b
Environment: Production, Preview, Development

Name: VITE_VAPI_ASSISTANT_HEALTHCARE
Value: 71b9ae12-4eaa-42c3-8fbf-432c2a191a8c
Environment: Production, Preview, Development

Name: VITE_VAPI_ASSISTANT_FINANCIAL
Value: e66247c0-ae70-413f-b5db-c6a2ebbbd15f
Environment: Production, Preview, Development

Name: VITE_VAPI_ASSISTANT_TRADES
Value: b79ee0a2-0f4f-4a0a-bcd6-607b59311e33
Environment: Production, Preview, Development

Name: VITE_VAPI_BYPASS_EMAILS
Value: towojutobi@outlook.com,tolu@clarivue.io,tobi@getmatchbox.org
Environment: Production, Preview, Development (optional)
```

### Step 2: Redeploy

After adding all variables:
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click the **"..."** menu (three dots)
4. Click **Redeploy**
5. Wait for build to complete (~2 minutes)

### Step 3: Verify

1. Visit your Vercel URL
2. Open browser DevTools (F12) → Console tab
3. Site should load properly
4. Test navigation and forms

## Alternative: Use Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Add environment variables
vercel env add VITE_VAPI_PUBLIC_KEY production
# Paste: fd36ff2f-26c4-4a23-829e-4216bd8f553b

vercel env add VITE_VAPI_ASSISTANT_HEALTHCARE production
# Paste: 71b9ae12-4eaa-42c3-8fbf-432c2a191a8c

vercel env add VITE_VAPI_ASSISTANT_FINANCIAL production
# Paste: e66247c0-ae70-413f-b5db-c6a2ebbbd15f

vercel env add VITE_VAPI_ASSISTANT_TRADES production
# Paste: b79ee0a2-0f4f-4a0a-bcd6-607b59311e33

vercel env add VITE_VAPI_BYPASS_EMAILS production
# Paste: towojutobi@outlook.com,tolu@clarivue.io,tobi@getmatchbox.org

# Redeploy
vercel --prod
```

## Still Seeing Blank Screen?

### Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for errors:
   - **Red errors** = JavaScript errors
   - **"VITE_VAPI_PUBLIC_KEY is not set"** = Env vars not applied (wait 1-2 min after redeploy)
   - **404 errors** = Asset loading issues

### Check Vercel Build Logs
1. Go to Deployments tab
2. Click latest deployment
3. Check "Building" section for errors
4. Build should show:
   ```
   ✓ 189 modules transformed
   ✓ built in [time]
   ```

### Clear Browser Cache
1. **Windows**: Ctrl + Shift + R
2. **Mac**: Cmd + Shift + R
3. Or use incognito/private mode

## What We Changed

1. ✅ Added **ErrorBoundary** component for better error handling
2. ✅ Updated **VapiWidget** with better SDK import handling
3. ✅ Created **deployment documentation** (DEPLOYMENT.md)
4. ✅ Created **deployment checklist** (DEPLOYMENT-CHECKLIST.md)
5. ✅ Cleaned **.env.example** (removed your actual credentials)
6. ✅ Verified build works locally (751.62 kB bundle)

## Files Changed

- `src/main.tsx` - Added ErrorBoundary wrapper
- `src/components/ErrorBoundary.tsx` - New error boundary component
- `src/components/VapiWidget/VapiWidget.tsx` - Improved Vapi SDK import
- `.env.example` - Removed actual credentials (security)
- `DEPLOYMENT.md` - Complete deployment guide
- `DEPLOYMENT-CHECKLIST.md` - Quick checklist
- `scripts/check-env.js` - Environment variable checker

## Next Steps After Fix

1. **Test all pages** - Click through every section
2. **Test forms** - Submit contact form, check Formspree dashboard
3. **Test voice demo** - Go to "See in Action", complete demo flow
4. **Monitor** - Check Vercel Analytics and error logs

## Need Help?

If still not working:
1. Share screenshot of browser console errors
2. Share Vercel build logs
3. Confirm all 4 env vars are set in Vercel dashboard

---

**Pro Tip**: Always test locally with `npm run build && npm run preview` before deploying to catch issues early!
