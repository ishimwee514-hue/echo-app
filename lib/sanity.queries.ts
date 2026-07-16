import { client } from './sanity.client'

export async function getStories() {
  return client.fetch(`*[_type == "story"] | order(publishedAt desc) {
    _id, title, slug, excerpt, mainImage, publishedAt
  }`)
}

export async function getStoryBySlug(slug: string) {
  return client.fetch(
    `*[_type == "story" && slug.current == $slug][0] {
      ..., categories[]->
    }`,
    { slug }
  )
}

export async function getCategories() {
  return client.fetch(`*[_type == "category"] | order(title asc) {
    _id, title, name, slug, description
  }`)
}

export async function getCategoryBySlug(slug: string) {
  return client.fetch(
    `*[_type == "category" && slug.current == $slug][0]`,
    { slug }
  )
}

export async function getStoriesByCategory(categoryId: string) {
  return client.fetch(
    `*[_type == "story" && $categoryId in categories[]._ref] | order(publishedAt desc) {
      _id, title, slug, excerpt, mainImage, publishedAt
    }`,
    { categoryId }
  )
}
