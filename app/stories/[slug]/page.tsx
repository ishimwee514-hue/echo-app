'use client'

import { useEffect, useState } from 'react'
import { getStoryBySlug } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

interface StoryPageProps {
  params: Promise<{ slug: string }>
}

interface Story {
  _id: string
  title: string
  slug: { current: string }
  author: string
  mainImage: any
  publishedAt: string
  excerpt: string
  body: any[]
  categories: any[]
}

export default function StoryPage({ params }: StoryPageProps) {
  const [story, setStory] = useState<Story | null>(null)
  const [loading, setLoading] = useState(true)
  const [slug, setSlug] = useState<string | null>(null)

  useEffect(() => {
    params.then(({ slug }) => {
      setSlug(slug)
      fetchStory(slug)
    })
  }, [params])

  async function fetchStory(storySlug: string) {
    try {
      const data = await getStoryBySlug(storySlug)
      setStory(data)
    } catch (error) {
      console.error('Failed to fetch story:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-950 text-neutral-100 px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-neutral-400">Loading story...</p>
        </div>
      </main>
    )
  }

  if (!story) {
    return (
      <main className="min-h-screen bg-neutral-950 text-neutral-100 px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <button className="px-6 py-2 bg-amber-500 text-neutral-950 font-semibold rounded-full hover:bg-amber-400 transition-all mb-8">
              ← Back to Home
            </button>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-amber-400">Story Not Found</h1>
            <p className="text-neutral-400">The story you're looking for doesn't exist. Make sure it's published in Sanity CMS.</p>
          </div>
        </div>
      </main>
    )
  }

  const publishDate = new Date(story.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Header */}
      <header className="relative">
        {story.mainImage && (
          <div className="relative h-96 w-full overflow-hidden">
            <img
              src={urlFor(story.mainImage).url()}
              alt={story.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-950"></div>
          </div>
        )}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link href="/">
            <button className="px-6 py-2 bg-amber-500 text-neutral-950 font-semibold rounded-full hover:bg-amber-400 transition-all mb-8">
              ← Back to Home
            </button>
          </Link>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-amber-300">{story.title}</h1>
          
          <div className="flex flex-wrap gap-4 items-center text-neutral-400 mb-6">
            <span className="text-sm">By {story.author}</span>
            <span>•</span>
            <span className="text-sm">{publishDate}</span>
            {story.categories && story.categories.length > 0 && (
              <>
                <span>•</span>
                <div className="flex gap-2">
                  {story.categories.map((cat: any) => (
                    <span key={cat._id} className="text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full">
                      {cat.title || cat.name}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
          
          <p className="text-xl text-neutral-300 max-w-3xl leading-relaxed">{story.excerpt}</p>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-invert max-w-none">
          {story.body && story.body.length > 0 ? (
            <PortableText value={story.body} />
          ) : (
            <p className="text-neutral-400">No content available for this story.</p>
          )}
        </div>
      </article>

      {/* Footer CTA */}
      <section className="bg-neutral-900 border-t border-neutral-800 py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Stories</h2>
          <Link href="/">
            <button className="px-8 py-3 bg-amber-500 text-neutral-950 font-semibold rounded-full hover:bg-amber-400 transition-all">
              Return to Home
            </button>
          </Link>
        </div>
      </section>
    </main>
  )
}
