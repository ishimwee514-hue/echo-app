import {
    createClient
} from '@sanity/client'

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    useCdn: true,
})

// GROQ Queries
export const getAllStories = `*[_type == "story"] {
  _id,
  title,
  slug,
  excerpt,
  "image": image.asset->url,
  publishedAt,
  categories[]->{
    title,
    slug
  },
  author
} | order(publishedAt desc)`

export const getStoryBySlug = `*[_type == "story" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  "image": image.asset->url,
  body,
  publishedAt,
  categories[]->{
    title,
    slug
  },
  author
}`

export const getAllCategories = `*[_type == "category"] {
  _id,
  title,
  slug,
  description
}`