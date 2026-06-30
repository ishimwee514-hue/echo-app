import {
  client,
  getStoryBySlug
} from '@/lib/sanity'
import {
  PortableText
} from '@portabletext/react'
import Image from 'next/image'
import {
  notFound
} from 'next/navigation'

// Generate static paths for all stories
export async function generateStaticParams() {
  const stories = await client.fetch(`*[_type == "story"]{ "slug": slug.current }`)
  return stories.map((story) => ({
    slug: story.slug,
  }))
}

// Fetch data for the specific story
async function getStory(slug) {
  try {
    const story = await client.fetch(getStoryBySlug, {
      slug
    })
    return story
  } catch (error) {
    console.error('Error fetching story:', error)
    return null
  }
}

// Page component
export default async function StoryPage({
    params
  }) {
    const {
      slug
    } = await params
    const story = await getStory(slug)

    if (!story) {
      notFound()
    }

    return ( <
        main className = "min-h-screen bg-neutral-950 text-neutral-200" > {
          /* Article Header */
        } <
        header className = "relative py-20 bg-gradient-to-b from-neutral-900 to-neutral-950" >
        <
        div className = "max-w-4xl mx-auto px-4" >
        <
        div className = "flex flex-wrap gap-2 mb-6" > {
          story.categories ? .map((category) => ( <
            span key = {
              category.slug.current
            }
            className = "px-3 py-1 text-sm border border-amber-400/30 text-amber-400 rounded-full" > {
              category.title
            } <
            /span>
          ))
        } <
        /div>

        <
        h1 className = "text-4xl md:text-6xl font-serif font-bold mb-6 text-white" > {
          story.title
        } <
        /h1>

        {
          story.excerpt && ( <
            p className = "text-xl text-neutral-400 mb-8" > {
              story.excerpt
            } < /p>
          )
        }

        <
        div className = "flex items-center gap-6 text-sm text-neutral-400" > {
          story.author && < span > By {
            story.author
          } < /span>} <
          span > • < /span> <
          span > {
            new Date(story.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          } <
          /span> < /
          div > <
          /div> < /
          header >

          {
            /* Featured Image */
          } {
            story.image && ( <
              div className = "max-w-6xl mx-auto px-4 -mt-12" >
              <
              div className = "relative h-96 md:h-[600px] rounded-xl overflow-hidden" >
              <
              Image src = {
                story.image
              }
              alt = {
                story.title
              }
              fill className = "object-cover"
              priority /
              >
              <
              /div> < /
              div >
            )
          }

          {
            /* Article Body */
          } <
          article className = "max-w-4xl mx-auto px-4 py-16" >
          <
          div className = "prose prose-invert prose-amber max-w-none" > {
            story.body && < PortableText value = {
              story.body
            }
            />} < /
            div > <
            /article> < /
            main >
          )
        }

        // Generate metadata for SEO
        export async function generateMetadata({
          params
        }) {
          const {
            slug
          } = await params
          const story = await client.fetch(getStoryBySlug, {
            slug
          })

          if (!story) {
            return {
              title: 'Story Not Found',
            }
          }

          return {
            title: `${story.title} | ECHO`,
            description: story.excerpt,
            openGraph: {
              images: story.image ? [story.image] : [],
            },
          }
        }