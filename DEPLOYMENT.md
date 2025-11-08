# Vercel Deployment Checklist

## Pre-Deployment Checks

### ✅ Code Verification
- [x] Build passes successfully (`npm run build`)
- [x] All components render correctly
- [x] Stripe integration code is complete
- [x] Error handling is in place
- [x] Environment variables are documented

### ✅ Stripe Setup
- [ ] Stripe account created and verified
- [ ] Test API keys obtained from Stripe Dashboard
- [ ] Test mode keys ready for initial deployment
- [ ] Webhook endpoints configured (optional, for production)

### ✅ Environment Variables
You need to set these in Vercel Dashboard:

1. **VITE_STRIPE_PUBLIC_KEY**
   - Value: `pk_test_51SR23P3lLNLLVj2mnvEem3S5kOdxiIrjsLx9FnyohwFqc5q59U3y98Irb0tiyFB1C8MiLDZeoFWaAiZ2gojXfwTY00R6Eki3GQ`
   - Environment: Production, Preview, Development
   - Used in: Frontend (React components)

2. **STRIPE_SECRET_KEY**
   - Value: Your Stripe secret key (starts with `sk_test_`)
   - Environment: Production, Preview, Development
   - Used in: Serverless function (API route)
   - ⚠️ Never expose this key in the frontend!

## Deployment Steps

### Step 1: Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: UCI donation website with Stripe integration"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/uci-donation-website.git

# Push to main branch
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "Add New Project"**
3. **Import your GitHub repository**
   - Select the repository you just pushed
   - Vercel will auto-detect Vite configuration
4. **Configure Project Settings:**
   - Framework Preset: Vite
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
5. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add `VITE_STRIPE_PUBLIC_KEY` (for all environments)
   - Add `STRIPE_SECRET_KEY` (for all environments)
6. **Click "Deploy"**

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# Set environment variables
vercel env add VITE_STRIPE_PUBLIC_KEY
vercel env add STRIPE_SECRET_KEY

# Deploy to production
vercel --prod
```

### Step 3: Verify Deployment

1. **Check Build Logs**
   - Go to your project in Vercel Dashboard
   - Check the "Deployments" tab
   - Verify build completed successfully

2. **Test the Website**
   - Visit your deployed URL
   - Test all sections load correctly
   - Test donation flow with Stripe test card:
     - Card: `4242 4242 4242 4242`
     - Expiry: Any future date (e.g., `12/34`)
     - CVC: Any 3 digits (e.g., `123`)
     - ZIP: Any ZIP code

3. **Check Serverless Function**
   - Go to Vercel Dashboard → Your Project → Functions
   - Verify `api/create-checkout-session` is listed
   - Check function logs for any errors

## Post-Deployment

### ✅ Verification Checklist

- [ ] Website loads correctly
- [ ] All sections display properly
- [ ] Donation buttons work
- [ ] Custom amount input works
- [ ] Stripe Checkout opens correctly
- [ ] Test payment completes successfully
- [ ] Success redirect works
- [ ] Error handling works (test with invalid card)
- [ ] Mobile responsiveness verified
- [ ] Environment variables are set correctly

### Common Issues & Solutions

#### Issue: "Stripe public key not configured"
**Solution:** Verify `VITE_STRIPE_PUBLIC_KEY` is set in Vercel environment variables and redeploy.

#### Issue: "Failed to create checkout session"
**Solution:**
- Check `STRIPE_SECRET_KEY` is set in Vercel environment variables
- Verify the key matches the public key (both test or both live)
- Check Vercel function logs for detailed error messages

#### Issue: "404 on /api/create-checkout-session"
**Solution:**
- Verify `api/create-checkout-session.js` is in the repository
- Check `vercel.json` configuration
- Ensure function is deployed (check Vercel Functions tab)

#### Issue: Build fails
**Solution:**
- Check Node.js version (should be 18+)
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

## Production Checklist (When Ready)

### Switch to Live Mode

1. **Get Live Stripe Keys**
   - Go to Stripe Dashboard
   - Switch to "Live mode"
   - Get new Publishable and Secret keys

2. **Update Environment Variables in Vercel**
   - Update `VITE_STRIPE_PUBLIC_KEY` with live key
   - Update `STRIPE_SECRET_KEY` with live key
   - Redeploy the application

3. **Test with Real Payment**
   - Use a real card for testing (small amount)
   - Verify payment appears in Stripe Dashboard
   - Verify webhook events (if configured)

### Security Best Practices

- ✅ Never commit `.env` file to Git
- ✅ Use environment variables for all secrets
- ✅ Keep Stripe secret key server-side only
- ✅ Enable Stripe webhook signature verification (for production)
- ✅ Monitor Stripe Dashboard for suspicious activity
- ✅ Regularly rotate API keys

## Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Stripe Docs:** https://stripe.com/docs
- **Project README:** See `README.md` for detailed setup instructions

## Quick Reference

### Test Cards (Stripe Test Mode)

- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **3D Secure:** `4000 0027 6000 3184`

### Environment Variables Summary

| Variable | Purpose | Where Used |
|----------|---------|------------|
| `VITE_STRIPE_PUBLIC_KEY` | Stripe publishable key | Frontend (React) |
| `STRIPE_SECRET_KEY` | Stripe secret key | Serverless function |

---

**Ready to deploy?** Follow the steps above and you'll have your donation website live in minutes! 🚀

