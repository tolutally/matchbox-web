# 🚀 Quick Deployment Checklist

Use this checklist before every deployment to avoid common issues.

## Pre-Deployment

- [ ] **Test local build**
  ```bash
  cmd /c npm run build
  npm run preview
  ```
  - Open http://localhost:4173
  - Test all pages and forms
  - Check browser console for errors

- [ ] **Verify environment variables** (in Vercel dashboard)
  - [ ] `VITE_VAPI_PUBLIC_KEY` - Your Vapi public key
  - [ ] `VITE_VAPI_ASSISTANT_HEALTHCARE` - Healthcare assistant ID
  - [ ] `VITE_VAPI_ASSISTANT_FINANCIAL` - Financial assistant ID
  - [ ] `VITE_VAPI_ASSISTANT_TRADES` - Trades assistant ID
  - [ ] `VITE_VAPI_BYPASS_EMAILS` - (Optional) Bypass emails

- [ ] **Check Git status**
  ```bash
  git status
  git add .
  git commit -m "Description of changes"
  git push
  ```

## During Deployment

- [ ] **Monitor build logs** in Vercel dashboard
  - Look for build errors
  - Check for warnings
  - Verify build completes successfully

- [ ] **Check deployment summary**
  - Build time
  - Bundle size
  - No failed checks

## Post-Deployment

- [ ] **Verify site loads** - Visit your Vercel URL
- [ ] **Check all pages**
  - [ ] Home page - all sections visible
  - [ ] About page
  - [ ] Pricing page
  - [ ] Contact page
  - [ ] Call Me page (voice demo)

- [ ] **Test functionality**
  - [ ] Navigation works
  - [ ] Contact modal opens
  - [ ] Forms submit (check Formspree dashboard)
  - [ ] Voice demo gate form
  - [ ] Voice call starts
  - [ ] Timer countdown works

- [ ] **Check browser console (F12)**
  - [ ] No JavaScript errors
  - [ ] No 404 errors for assets
  - [ ] No missing env var warnings

- [ ] **Mobile test** (or use browser DevTools)
  - [ ] Site is responsive
  - [ ] Mobile menu works
  - [ ] Forms work on mobile

## If Site is Blank

1. **Open browser DevTools (F12) → Console**
   - Look for red error messages
   - Common errors:
     - "VITE_VAPI_PUBLIC_KEY is not set" → Add env vars in Vercel
     - "Failed to fetch" → Check network tab
     - React errors → Check build logs

2. **Check Vercel deployment logs**
   - Go to Deployments tab
   - Click on latest deployment
   - Review build logs for errors

3. **Verify environment variables in Vercel**
   - Project Settings → Environment Variables
   - Make sure all 4 required vars are set
   - Redeploy after adding vars

4. **Clear cache and hard refresh**
   - Windows: Ctrl + Shift + R
   - Mac: Cmd + Shift + R

5. **Check Vercel build settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Node Version: 20.x

## Troubleshooting Commands

```bash
# Check which files will be deployed
git ls-files

# Test production build locally
cmd /c npm run build && npm run preview

# Check for TypeScript errors
npx tsc --noEmit

# Verify Vercel config
cat vercel.json
```

## Emergency Rollback

If deployment breaks production:
1. Go to Vercel dashboard → Deployments
2. Find last working deployment
3. Click "..." → Promote to Production
4. Fix issues locally, then redeploy

## Additional Resources

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide
- [Vercel Docs](https://vercel.com/docs)
- [Vite Docs](https://vite.dev/guide/env-and-mode.html)
