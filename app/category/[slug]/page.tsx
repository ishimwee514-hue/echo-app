'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

interface Story {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  mainImage?: any
  publishedAt: string
}

interface Category {
  _id: string
  name: string
  title: string
  slug: { current: string }
  description: string
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [category, setCategory] = useState<Category | null>(null)
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [slug, setSlug] = useState<string | null>(null)

  useEffect(() => {
    params.then(({ slug }) => {
      setSlug(slug)
      fetchCategoryAndStories(slug)
    })
  }, [params])

  async function fetchCategoryAndStories(categorySlug: string) {
    try {
      // Fetch category data
      const categoryData = await client.fetch(
        `*[_type == "category" && slug.current == $slug][0]`,
        { slug: categorySlug }
      )
      setCategory(categoryData)

      // Fetch stories in this category
      const storiesData = await client.fetch(
        `*[_type == "story" && $catId in categories[]._ref] | order(publishedAt desc) {
          _id, title, slug, excerpt, mainImage, publishedAt
        }`,
        { catId: categoryData?._id }
      )
      setStories(storiesData || [])
    } catch (error) {
      console.error('Failed to fetch category or stories:', error)
    } finally {
      setLoading(false)
    }
  }

  // Format slug to title (e.g., "traditional-heritage" -> "Traditional Heritage")
  const formattedTitle = slug
    ? slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Category'

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-950 text-neutral-100 px-4 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-neutral-400">Loading category...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header Section */}
        <Link href="/">
          <button className="px-6 py-2 bg-amber-500 text-neutral-950 font-semibold rounded-full hover:bg-amber-400 transition-all mb-8">
            ← Back to Home
          </button>
        </Link>

        <header className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-amber-300">
            {category?.title || formattedTitle}
          </h1>
          <p className="text-neutral-400 text-lg max-w-3xl leading-relaxed">
            {category?.description ||
              `Explore the stories, legends, and heritage of ${formattedTitle.toLowerCase()}.`}
          </p>
        </header>

        {/* Stories Grid */}
        {stories && stories.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <Link
                key={story._id}
                href={`/stories/${story.slug.current}`}
                className="group"
              >
                <article className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-amber-500/50 transition-all h-full flex flex-col hover:shadow-lg hover:shadow-amber-500/10">
                  {story.mainImage && (
                    <div className="relative h-48 w-full overflow-hidden bg-neutral-800">
                      <img
                        src={urlFor(story.mainImage).width(400).url()}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2 text-amber-400 group-hover:text-amber-300 transition-colors line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-neutral-400 text-sm mb-4 flex-grow line-clamp-3">
                      {story.excerpt}
                    </p>
                    <span className="text-amber-500 text-xs font-semibold uppercase tracking-wider">
                      Read Story →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-neutral-900 rounded-2xl p-12 border border-neutral-800 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-amber-400">No Stories Yet</h3>
              <p className="text-neutral-400 mb-6">
                We're currently building stories for {category?.title || formattedTitle}. Check back soon!
              </p>
              <p className="text-neutral-500 text-sm">
                Stories will appear here as they're published in the Sanity CMS.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
