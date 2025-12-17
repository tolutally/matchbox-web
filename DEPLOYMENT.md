# Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Variables
**CRITICAL**: Add these environment variables in your Vercel dashboard:
- Go to: Project Settings → Environment Variables
- Add all variables from `.env` file:

```
VITE_VAPI_PUBLIC_KEY=your_vapi_public_key_here
VITE_VAPI_ASSISTANT_HEALTHCARE=your_healthcare_assistant_id
VITE_VAPI_ASSISTANT_FINANCIAL=your_financial_assistant_id
VITE_VAPI_ASSISTANT_TRADES=your_trades_assistant_id
VITE_VAPI_BYPASS_EMAILS=test@example.com (optional)
```

⚠️ **Important**: Vite requires environment variables to be prefixed with `VITE_` to be exposed to the client.

### 2. Build Configuration
The project is already configured with `vercel.json`:
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`
- ✅ Framework: `vite`
- ✅ Node version: 20.19.0
- ✅ SPA routing configured

### 3. Local Build Test
Before deploying, always test the build locally:
```bash
# Clean build
cmd /c npm run build

# Preview production build
npm run preview
```

Then open http://localhost:4173 to verify the production build works.

### 4. Common Issues & Fixes

#### Blank Screen on Deployment
**Causes:**
1. Missing environment variables (most common)
2. Build errors not caught locally
3. Asset path issues

**Solution:**
1. Check Vercel deployment logs for errors
2. Verify all `VITE_*` environment variables are set in Vercel
3. Redeploy after adding environment variables

#### Console Errors
Open browser DevTools (F12) and check for:
- Network errors (404s for assets)
- JavaScript errors
- Missing environment variables warnings

### 5. Vercel Deployment Steps

#### Option A: Git Integration (Recommended)
1. Push code to GitHub/GitLab/Bitbucket
2. Import project in Vercel dashboard
3. Set environment variables in Project Settings
4. Deploy

#### Option B: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Add environment variables
vercel env add VITE_VAPI_PUBLIC_KEY production
vercel env add VITE_VAPI_ASSISTANT_HEALTHCARE production
vercel env add VITE_VAPI_ASSISTANT_FINANCIAL production
vercel env add VITE_VAPI_ASSISTANT_TRADES production

# Redeploy to apply env vars
vercel --prod
```

### 6. Post-Deployment Verification

1. **Check Homepage**: Verify all sections load
2. **Test Navigation**: Click through all menu items
3. **Test Forms**: 
   - Contact modal
   - Pricing CTA
   - Contact page form
4. **Test Voice Demo**: 
   - Navigate to "See in Action"
   - Fill gate form
   - Select industry
   - Start voice call
   - Verify timer countdown
5. **Check Console**: Ensure no errors in browser DevTools

### 7. Performance Optimization

Current bundle size: **750.65 kB** (202.40 kB gzipped)

To reduce bundle size:
```typescript
// In vite.config.ts, add:
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'vapi': ['@vapi-ai/web'],
          'forms': ['@formspree/react', 'libphonenumber-js']
        }
      }
    }
  }
})
```

### 8. Monitoring

After deployment:
- Monitor Vercel Analytics for traffic
- Check Formspree dashboard for form submissions
- Monitor Vapi dashboard for call usage
- Set up error tracking (Sentry, LogRocket, etc.)

## Environment-Specific Configs

### Production (.env.production)
```env
# Use production Vapi assistants
VITE_VAPI_PUBLIC_KEY=prod_key_here
VITE_VAPI_ASSISTANT_HEALTHCARE=prod_healthcare_id
VITE_VAPI_ASSISTANT_FINANCIAL=prod_financial_id
VITE_VAPI_ASSISTANT_TRADES=prod_trades_id
```

### Preview/Staging (.env.staging)
```env
# Use test Vapi assistants
VITE_VAPI_PUBLIC_KEY=staging_key_here
VITE_VAPI_ASSISTANT_HEALTHCARE=staging_healthcare_id
VITE_VAPI_ASSISTANT_FINANCIAL=staging_financial_id
VITE_VAPI_ASSISTANT_TRADES=staging_trades_id
VITE_VAPI_BYPASS_EMAILS=team@example.com
```

## Troubleshooting

### Issue: Blank screen after deployment
1. Open browser DevTools (F12) → Console tab
2. Look for errors
3. Common errors:
   - `Failed to initialize Vapi` → Missing VITE_VAPI_PUBLIC_KEY
   - `Cannot read property of undefined` → Check env vars
   - `404 for assets` → Check build output directory

### Issue: Forms not submitting
1. Verify Formspree form IDs are correct:
   - Contact Modal: `xgvggbvp`
   - Pricing CTA: `xyzrrazj`
   - Gate Form: `mkgddalv`
2. Check Formspree dashboard for errors

### Issue: Voice calls not working
1. Verify all Vapi env vars are set in Vercel
2. Check Vapi assistant IDs are correct
3. Verify public key has correct permissions
4. Check browser console for Vapi errors

## Support

For deployment issues:
- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vite.dev/guide/env-and-mode.html
- Vapi Docs: https://docs.vapi.ai
