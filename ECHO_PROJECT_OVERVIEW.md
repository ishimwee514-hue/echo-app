# 🎯 ECHO - Complete Project Overview

## **What is ECHO?**

**ECHO** is a **motivational content platform** combining social sharing, historical storytelling, library features, and direct messaging. It's designed to inspire people by sharing:
- Historical facts and achievements of great figures
- Legendary philosophers and their wisdom
- Influential quotes to motivate daily actions
- User-generated social content

---

## **Core Features**

### **1. 📚 Historical Legends & Achievements**
- Browse profiles of great historical figures (philosophers, leaders, scientists, artists)
- Learn about their major achievements and time periods
- Explore their philosophical ideas and lasting influence
- Features include influence scores, era tagging, and category organization

### **2. 💬 Inspirational Quotes Library**
- Curated collection of influential quotes from legends
- Tagged by themes (wisdom, courage, success, motivation, etc.)
- Influence level ratings (Highly Influential, Foundational)
- Daily featured quotes for motivation
- Context and explanation for each quote

### **3. 📖 Stories & Historical Articles**
- Editorial content about legendary events and heritage
- Rich formatted articles with images and rich text
- Categorized content (Heritage, Philosophy, Events)
- Related to specific legends and themes

### **4. 🌐 Social Sharing & User Contributions**
- Users can create social posts inspired by quotes and legends
- Share personal reflections and achievements
- Link posts to specific quotes and historical figures
- Community engagement through likes, shares, and comments
- Moderation system for quality control

### **5. 📚 Library System**
- Access to philosophical works and books
- Reference materials by legendary authors
- Related quotes from each work
- External links to full texts
- Searchable and categorizable

### **6. 💌 Direct Messaging**
- Private messages between users
- Read/unread status tracking
- File attachments support
- Message history and timestamps

### **7. 🏆 Category System**
- Legendary Events
- Traditional Heritage
- Ancient Philosophy
- Custom categories for organization

---

## **Technology Stack**

**Frontend:**
- Next.js 16 (React 19)
- TypeScript
- Tailwind CSS v4
- Styled Components
- Portable Text (Rich Text Rendering)

**Backend & CMS:**
- Sanity.io (Headless CMS)
- Next-Sanity Integration
- GROQ Queries for data fetching

**Deployment:**
- Vercel (Live: https://echo-app-plum.vercel.app)

---

## **Data Models (Sanity Schemas)**

### **1. Legend** (`legend.ts`)
```typescript
{
  name: string                    // Full name
  slug: slug                      // URL-friendly identifier
  era: string                     // Time period (Ancient Greece, Medieval, etc.)
  portrait: image                 // Portrait with hotspot
  professions: string[]           // e.g., Philosopher, Scientist
  biography: RichText             // Full biography
  majorAchievements: Array        // Achievements with years
  philosophicalWorks: text        // Their ideas
  influenceScore: 1-10            // Ranking
  isFeature: boolean              // Homepage feature flag
}
```

### **2. Quote** (`quote.ts`)
```typescript
{
  text: string                    // Quote text
  author: reference → legend      // Who said it
  context: text                   // When/why said
  tags: string[]                  // motivaton, wisdom, courage
  category: reference → category  // Content category
  influenceLevel: high|moderate|foundational
  isFeature: boolean              // Daily quote flag
}
```

### **3. Story** (`story.ts`)
```typescript
{
  title: string                   // Article title
  slug: slug                      // URL-friendly
  author: string                  // Default: ECHO Editorial
  mainImage: image                // Hero image
  categories: reference[]         // Multiple categories
  publishedAt: datetime           // Publication date
  excerpt: text                   // Homepage preview
  body: RichText                  // Full article content
}
```

### **4. SocialPost** (`socialPost.ts`)
```typescript
{
  userId: string                  // User identifier
  username: string                // Display name
  userAvatar: image               // User's avatar
  content: RichText + Images      // Post content
  relatedQuote: reference         // Linked quote
  relatedLegend: reference        // Linked figure
  category: reference             // Content type
  tags: string[]                  // Tagging system
  likes: number                   // Like count
  shares: number                  // Share count
  comments: Array                 // Comment threads
  isApproved: boolean             // Moderation flag
}
```

### **5. Message** (`message.ts`)
```typescript
{
  senderId: string                // Sender's ID
  senderUsername: string          // Display name
  receiverId: string              // Recipient's ID
  receiverUsername: string        // Recipient name
  content: text                   // Message body
  isRead: boolean                 // Read status
  readAt: datetime                // When read
  attachments: Array              // Files (url, type, filename)
  createdAt: datetime             // Sent timestamp
}
```

### **6. LibraryItem** (`libraryItem.ts`)
```typescript
{
  title: string                   // Book/Work title
  slug: slug                      // URL-friendly
  author: reference → legend      // Author reference
  cover: image                    // Book cover
  type: book|essay|speech|work    // Content type
  year: string                    // Publication year
  description: text               // Brief description
  summary: RichText               // Full overview
  keyThemes: string[]             // e.g., ethics, politics
  relatedQuotes: reference[]      // Linked quotes
  externalLinks: Array            // External resources
  category: reference             // Category tag
  savedCount: number              // User saves
}
```

### **7. Category** (`category.ts`)
```typescript
{
  title: string                   // Category name
  slug: slug                      // URL-friendly
  description: text               // Category description
}
```

---

## **Project Structure**

```
echo-app/
├── app/
│   ├── page.tsx                 # Hero homepage
│   ├── layout.tsx               # Root layout (dark theme)
│   ├── globals.css              # Tailwind styles
│   ├── favicon.png              # Branding
│   ├── category/                # Category pages (WIP)
│   ├── stories/                 # Story detail pages (WIP)
│   ├── studio/                  # Sanity CMS admin
│   └── messages/                # Messaging interface (WIP)
│
├── lib/
│   ├── sanity.client.ts         # Sanity client setup
│   ├── sanity.queries.ts        # GROQ queries
│   ├── sanity.env.ts            # Environment config
│   └── sanity.image.ts          # Image optimization
│
├── sanity/
│   └── schemas/
│       ├── index.ts             # Schema registry
│       ├── category.ts
│       ├── story.ts
│       ├── legend.ts
│       ├── quote.ts
│       ├── socialPost.ts
│       ├── message.ts
│       └── libraryItem.ts
│
├── public/                      # Static assets
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── next.config.ts              # Next.js config
└── sanity.config.ts            # Sanity studio config
```

---

## **Key Pages & Routes (Planned)**

| Route | Status | Purpose |
|-------|--------|---------|
| `/` | ✅ Done | Homepage with hero & featured content |
| `/category/[slug]` | 🚧 WIP | View stories by category |
| `/stories/[slug]` | 🚧 WIP | Story detail page |
| `/legends` | 🚧 WIP | Browse all historical figures |
| `/legends/[slug]` | 🚧 WIP | Legend profile & achievements |
| `/quotes` | 🚧 WIP | Quote library with filters |
| `/library` | 🚧 WIP | Philosophical works collection |
| `/social` | 🚧 WIP | Social feed & user posts |
| `/messages` | 🚧 WIP | Direct messaging interface |
| `/studio` | ✅ Done | Sanity CMS admin |

---

## **Current Implementation Status**

### ✅ Complete
- Homepage with 3 pillars design
- Sanity CMS integration & schemas
- All content models defined
- Dark theme with amber accents
- Deployment to Vercel

### 🚧 In Progress
- Category and story detail pages
- Legend profile pages
- Quote library interface
- Social posting system
- Messaging UI

### 📋 Planned
- User authentication system
- Real-time messaging (Socket.io)
- Advanced search & filtering
- User profiles
- Recommendation engine
- Admin dashboard

---

## **Getting Started**

### **Prerequisites**
- Node.js 18+
- npm or yarn
- Sanity.io account

### **Installation**
```bash
git clone https://github.com/ishimwee514-hue/echo-app.git
cd echo-app
npm install
```

### **Environment Setup**
Create `.env.local`:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### **Development**
```bash
npm run dev
# Open http://localhost:3000
```

### **Sanity Studio**
```bash
npm run dev
# Visit http://localhost:3000/studio
```

---

## **Design System**

**Colors:**
- Dark Background: `#0a0a0a` (neutral-950)
- Text: `#f5f5f5` (neutral-100)
- Accent: `#fbbf24` (amber-400 to amber-500)
- Borders: `#1f2937` (neutral-800)

**Typography:**
- Font: Inter (Google Fonts)
- Headlines: Bold, tracking-tighter
- Body: Light, antialiased

**Components:**
- Card-based layouts with hover effects
- Gradient backgrounds (linear-to-b, linear-to-r)
- Rounded corners (rounded-2xl, rounded-full)
- Smooth transitions & hover states

---

## **Core Values**

🎯 **Inspiration** - Daily motivation from legends and philosophy
📚 **Knowledge** - Deep historical context and learning
🤝 **Community** - Share achievements and support each other
💭 **Wisdom** - Timeless quotes and philosophical insights
🏆 **Excellence** - Celebrate great human achievements

---

## **Next Steps**

1. **Complete page templates** for categories, stories, legends
2. **Implement user authentication** (NextAuth or Firebase)
3. **Build social feed UI** with real-time updates
4. **Develop messaging system** with WebSockets
5. **Add search & filter functionality**
6. **Create user profiles** and personalization
7. **Deploy to production** with monitoring

---

## **Resources**

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js 16 Docs](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [TypeScript Guide](https://www.typescriptlang.org/docs/)

---

**Built with ❤️ to inspire greatness through history and philosophy.**
