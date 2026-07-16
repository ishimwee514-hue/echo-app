# Echo App - Deployment Guide

## 🚀 Pre-Deployment Checklist

This document outlines the critical steps and potential issues to address **before deploying** the Echo App to production.

---

## 📋 Required Configuration

### 1. **Sanity CMS Setup**

The app depends on a Sanity project for content management. Follow these steps:

#### Create a Sanity Project
```bash
npm run sanity -- init
```

#### Required Environment Variables
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
```

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Found in your Sanity project settings
- `NEXT_PUBLIC_SANITY_DATASET`: Dataset name (typically "production")
- These variables are **public** (prefixed with `NEXT_PUBLIC_`) and will be visible in the browser

#### Deploy Sanity Schemas
```bash
npm run sanity -- deploy
```

This deploys the schema definitions to Sanity:
- **Story** schema: Blog posts/articles with rich text body, categories, images
- **Category** schema: Content categories for organizing stories

### 2. **Add Sample Content**

1. Go to Sanity Studio: `https://your-domain.com/studio`
2. Create a **Category** (e.g., "Traditional Heritage")
3. Create a **Story** and publish it
4. The story will appear on the homepage after a few seconds

---

## ⚠️ Potential Deployment Issues & Solutions

### Issue 1: Blank Homepage (No Content Displayed)

**Symptoms:**
- Homepage loads but "Featured Lore" section is empty
- No stories appear on category pages

**Root Causes:**
- Environment variables not set correctly
- Sanity project ID is for a different dataset
- No content published in Sanity yet

**Solution:**
```bash
# Verify environment variables
echo $NEXT_PUBLIC_SANITY_PROJECT_ID
echo $NEXT_PUBLIC_SANITY_DATASET

# Check Sanity connection
npm run dev
# Visit /studio to confirm admin panel loads
```

### Issue 2: 404 Errors on Story/Category Pages

**Symptoms:**
- Clicking "Start Exploring" or story links returns 404

**Root Causes:**
- The story slug doesn't exist in Sanity
- The category slug doesn't exist in Sanity

**Solution:**
1. Create content in Sanity Studio (`/studio`)
2. Ensure the slug matches the URL exactly
3. Publish the content (unpublished content won't appear)

### Issue 3: Sanity Studio Not Loading (`/studio`)

**Symptoms:**
- `/studio` returns blank page or error
- "force-static" export error

**Root Causes:**
- Some hosting platforms (AWS Lambda, etc.) don't support static rendering for Sanity Studio
- Auth tokens not configured

**Solution (for Vercel):**
```typescript
// This is already set in app/studio/[[...tool]]/page.tsx
export const dynamic = 'force-static'

// For other platforms, change to:
export const dynamic = 'force-dynamic'
```

### Issue 4: Build Fails - Missing Dependencies

**Symptoms:**
- Build error: `Cannot find module '@sanity/client'`

**Root Causes:**
- Dependencies not installed properly
- Corrupted node_modules

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue 5: Images Not Loading from Sanity

**Symptoms:**
- 404 errors for image URLs
- Broken image placeholders on story pages

**Root Causes:**
- Sanity image CDN not configured
- Incorrect image transformation URLs

**Solution:**
- The app uses `@sanity/image-url` to generate correct image URLs
- Ensure images are uploaded via Sanity Studio (not external URLs)
- Check that the image field in the story schema is configured correctly

---

## 🔧 Deployment Platforms

### Vercel (Recommended)
```bash
vercel deploy
```
- Automatically detects Next.js
- Auto-configures environment variables from `.env.local`
- Supports Sanity Studio static rendering
- **Homepage:** Listed in `package.json` as `https://echo-app-plum.vercel.app`

### Self-Hosted (Node.js)
```bash
npm run build
npm run start
```
- Requires Node.js 18+ runtime
- Set environment variables before starting
- Ensure Sanity Studio uses `force-dynamic` instead of `force-static`

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
```

---

## 📊 What Happens After Deploy

### ✅ Successful Deployment
1. **Homepage renders** with hero section and 3 pillars
2. **Content loads dynamically** from Sanity CMS
3. **"Start Exploring" button** links to category pages
4. **Story pages** display full content from Sanity
5. **Sanity Studio** accessible at `/studio` for content management

### ❌ Partial/Broken Deployment
1. **Homepage renders** but no content appears
2. **Clicking buttons** returns 404 errors
3. **Sanity Studio** might not be accessible
4. **Category pages** show "Coming Soon" placeholder

---

## 🔐 Security Notes

- `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are **intentionally public** (they're prefixed with `NEXT_PUBLIC_`)
- Do NOT expose any Sanity write tokens or API keys in the browser
- Use `next-sanity` client with read-only token for frontend queries (already configured)
- Sanity Studio requires authentication (username/password or OAuth)

---

## 📝 Post-Deployment Checklist

- [ ] Environment variables set in deployment platform
- [ ] Sanity project created and schemas deployed
- [ ] At least one story published in Sanity
- [ ] Homepage displays content correctly
- [ ] Story pages load without errors
- [ ] Category pages work
- [ ] `/studio` admin panel is accessible
- [ ] Images load correctly
- [ ] Performance is acceptable (check Vercel Analytics)

---

## 🚨 Emergency Fallbacks

### If Sanity is Down
- Homepage still renders (static hero section)
- Story/category pages show error message directing users to homepage
- Graceful degradation is built in

### If Content is Missing
- Page shows user-friendly "Not Found" message instead of blank page
- Links back to homepage are provided
- No JavaScript errors in console

---

## 📞 Common Deployment Commands

```bash
# Local development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Deploy to Vercel
vercel deploy

# Deploy Sanity schemas
npm run sanity -- deploy
```

---

## 🎯 Next Steps

1. **Set up Sanity project** (if not done)
2. **Configure environment variables** in your deployment platform
3. **Deploy the Next.js app**
4. **Add content via Sanity Studio**
5. **Test all pages and links**
6. **Monitor for errors in production**

Happy deploying! 🎉