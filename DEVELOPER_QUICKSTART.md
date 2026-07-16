# 📖 ECHO App - Developer Quick Start Guide

## **Getting Started in 5 Minutes**

### **Step 1: Clone & Install** (2 min)
```bash
git clone https://github.com/ishimwee514-hue/echo-app.git
cd echo-app
npm install
```

### **Step 2: Set Up Environment** (1 min)
Create `.env.local` in project root:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

Get these from your Sanity project dashboard.

### **Step 3: Run Development Server** (1 min)
```bash
npm run dev
```
Open http://localhost:3000 - **You're live!** 🚀

### **Step 4: Access Sanity Studio** (1 min)
Navigate to http://localhost:3000/studio to manage content

---

## **Project Structure Quick Reference**

```
echo-app/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── category/          # Category pages (build here)
│   ├── stories/           # Story detail pages (build here)
│   └── studio/            # Sanity CMS admin
│
├── lib/                    # Utilities & queries
│   ├── sanity.client.ts   # Sanity connection
│   ├── sanity.queries.ts  # GROQ fetch functions
│   └── sanity.image.ts    # Image optimization
│
├── sanity/schemas/         # Content types
│   ├── legend.ts          # Historical figures
│   ├── quote.ts           # Inspirational quotes
│   ├── story.ts           # Editorial content
│   ├── socialPost.ts      # User posts
│   ├── message.ts         # Direct messages
│   ├── libraryItem.ts     # Books/philosophical works
│   └── category.ts        # Content categories
│
└── public/                # Static files
```

---

## **Common Tasks**

### **Build a New Page**

#### Example: Creating `/quotes` page

1. **Create the page file:**
```bash
touch app/quotes/page.tsx
```

2. **Write the component:**
```typescript
// app/quotes/page.tsx
import { client } from '@/lib/sanity.client'

async function getQuotes() {
  return client.fetch(`
    *[_type == "quote"] | order(publishedAt desc) {
      _id,
      text,
      author->{name},
      tags,
      influenceLevel,
      publishedAt
    }
  `)
}

export default async function QuotesPage() {
  const quotes = await getQuotes()
  
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8">
      <h1 className="text-5xl font-bold mb-12">Inspirational Quotes</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quotes.map((quote) => (
          <div key={quote._id} className="p-6 bg-neutral-900 rounded-lg border border-neutral-800">
            <p className="text-lg italic mb-4">"{quote.text}"</p>
            <p className="text-amber-400 font-semibold">{quote.author?.name}</p>
            <div className="mt-4 flex gap-2">
              {quote.tags?.map(tag => (
                <span key={tag} className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
```

### **Fetch Data with GROQ**

Add queries to `lib/sanity.queries.ts`:

```typescript
// Fetch all legends
export async function getLegends() {
  return client.fetch(`
    *[_type == "legend"] | order(influenceScore desc) {
      _id,
      name,
      slug,
      portrait,
      professions,
      influenceScore
    }
  `)
}

// Fetch single legend with details
export async function getLegendBySlug(slug: string) {
  return client.fetch(`
    *[_type == "legend" && slug.current == $slug][0] {
      ...,
      majorAchievements[]{
        achievement,
        year,
        description
      }
    }
  `, { slug })
}

// Search quotes
export async function searchQuotes(query: string) {
  return client.fetch(`
    *[_type == "quote" && text match $query] {
      _id,
      text,
      author->{name},
      tags
    }
  `, { query: `*${query}*` })
}
```

### **Add Image with Optimization**

```typescript
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'

// In your component:
<Image
  src={urlFor(imageAsset).url()}
  alt="Description"
  width={400}
  height={300}
  className="rounded-lg"
/>
```

### **Use Rich Text (Portable Text)**

```typescript
import { PortableText } from '@portabletext/react'

const components = {
  types: {
    image: ({ value }: any) => (
      <img src={urlFor(value).url()} alt="content" className="w-full rounded-lg my-4" />
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
}

export default function StoryDetail({ story }: any) {
  return (
    <div className="prose prose-invert max-w-2xl">
      <PortableText value={story.body} components={components} />
    </div>
  )
}
```

---

## **Styling with Tailwind**

The app uses **Tailwind CSS v4** with dark theme. Key classes:

```typescript
// Colors
bg-neutral-950    // Dark backgrounds
text-neutral-100  // Light text
text-amber-400    // Accent color
border-neutral-800

// Spacing
p-4, px-6, py-3   // Padding
mb-8, mt-4        // Margin
gap-6             // Grid gaps

// Typography
text-5xl font-bold
text-lg italic
tracking-tighter

// Layouts
grid grid-cols-3
flex items-center
min-h-screen

// Effects
rounded-lg
border border-neutral-800
hover:border-amber-500
transition-all
shadow-lg
```

Example card:
```typescript
<div className="p-8 bg-neutral-900 rounded-2xl border border-neutral-800 hover:border-amber-500/50 transition-all">
  <h3 className="text-2xl font-bold mb-3 text-amber-400">Title</h3>
  <p className="text-neutral-400">Content here</p>
</div>
```

---

## **Key Files to Understand**

### `lib/sanity.client.ts`
Establishes Sanity connection. Don't modify unless changing Sanity config.

### `lib/sanity.queries.ts`
**THIS IS YOUR MAIN FILE** for GROQ queries. Add all data fetching functions here.

### `sanity/schemas/index.ts`
Register new schemas here when adding content types.

### `app/layout.tsx`
Global layout with metadata and fonts. Change site title/description here.

---

## **Debugging Tips**

### **Check Sanity Connection**
```typescript
// Add to any page temporarily:
import { client } from '@/lib/sanity.client'

export default async function DebugPage() {
  const test = await client.fetch(`*[_type == "category"][0]`)
  return <pre>{JSON.stringify(test, null, 2)}</pre>
}
```

### **GROQ Query Issues**
Test queries directly in Sanity Studio's Vision tab:
1. Go to http://localhost:3000/studio
2. Click "Vision" in sidebar
3. Paste your GROQ query
4. See results in real-time

### **Tailwind Not Applying?**
Make sure you're using the right class:
```typescript
// ✅ Correct
<div className="bg-amber-500 text-white p-4">

// ❌ Wrong
<div className="bg-amber-600 text-white p-4">  // 600 not in Tailwind v4
```

### **Image Not Showing?**
Check:
1. Image exists in Sanity asset manager
2. Asset ID is correctly referenced
3. Using `urlFor()` helper
4. Image has `alt` text

---

## **Git Workflow**

### **Create a feature branch:**
```bash
git checkout -b feature/legends-page
```

### **Commit changes:**
```bash
git add .
git commit -m "Add legends listing page with filtering"
```

### **Push to GitHub:**
```bash
git push origin feature/legends-page
```

### **Create Pull Request** on GitHub

---

## **Available Scripts**

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

---

## **TypeScript Tips**

Always type your props:
```typescript
interface LegendProps {
  name: string
  portrait: {
    asset: {
      _ref: string
    }
  }
  influenceScore: number
}

function LegendCard({ name, portrait, influenceScore }: LegendProps) {
  return <div>{name}</div>
}
```

---

## **Component Structure Example**

```typescript
'use client'  // If using hooks (useState, useEffect)

import { ReactNode } from 'react'

interface CardProps {
  title: string
  children: ReactNode
  variant?: 'default' | 'featured'
}

export default function Card({ 
  title, 
  children, 
  variant = 'default' 
}: CardProps) {
  const baseStyles = 'p-8 bg-neutral-900 rounded-2xl border border-neutral-800'
  const variantStyles = {
    default: 'hover:border-amber-500/50',
    featured: 'border-amber-500 bg-amber-500/10'
  }

  return (
    <div className={`${baseStyles} ${variantStyles[variant]}`}>
      <h3 className="text-2xl font-bold mb-4 text-amber-400">{title}</h3>
      {children}
    </div>
  )
}
```

---

## **Useful Resources**

- 📚 **Sanity Docs:** https://www.sanity.io/docs
- 📘 **Next.js Guide:** https://nextjs.org/docs
- 🎨 **Tailwind Docs:** https://tailwindcss.com/docs
- 🔍 **GROQ Reference:** https://www.sanity.io/docs/groq

---

## **Need Help?**

### **Common Errors & Solutions**

| Error | Solution |
|-------|----------|
| `Module not found @/lib` | Check `tsconfig.json` paths config |
| `Sanity project ID undefined` | Add `NEXT_PUBLIC_SANITY_PROJECT_ID` to `.env.local` |
| `Image not optimizing` | Use `next/image` with `urlFor()` helper |
| `Styles not applying` | Ensure Tailwind classes exist in v4, restart dev server |
| `GROQ syntax error` | Test query in Sanity Vision, check field names |

---

## **Next Steps**

After completing this guide:

1. ✅ Build the `/legends` page (list all historical figures)
2. ✅ Build `/legends/[slug]` (single legend detail)
3. ✅ Build `/quotes` page with filters
4. ✅ Add search functionality to pages
5. ✅ Create social post feed (`/social`)

---

**Happy coding! Let's build something legendary! 🎯**

*Questions? Check ECHO_PROJECT_OVERVIEW.md or DEVELOPMENT_ROADMAP.md*
