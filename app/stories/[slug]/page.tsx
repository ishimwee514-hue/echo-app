import { getStoryBySlug } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const story = await getStoryBySlug(slug)

  if (!story) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Hero Header */}
      <header className="relative h-[50vh] w-full">
        {story.mainImage && (
          <Image 
            src={urlFor(story.mainImage).width(1200).height(600).url()} 
            alt={story.title} 
            fill 
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto text-white drop-shadow-lg">
            {story.title}
          </h1>
          
          {/* Safely render categories if they exist */}
          {story.categories && story.categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {story.categories.map((category: any) => (
                <span key={category._id} className="px-3 py-1 bg-amber-500/20 text-amber-400 text-sm rounded-full border border-amber-500/30 backdrop-blur-sm">
                  {category.title}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* The Content */}
      <article className="max-w-3xl mx-auto px-4 py-12 prose prose-invert prose-lg prose-amber">
        {story.excerpt && (
          <p className="text-xl text-neutral-300 leading-relaxed font-light italic border-l-4 border-amber-500 pl-6 mb-10">
            {story.excerpt}
          </p>
        )}
        
        {/* This renders the rich text body from Sanity */}
        <div className="text-neutral-300 leading-relaxed">
          <PortableText value={story.body} />
        </div>
      </article>
    </main>
  )
}