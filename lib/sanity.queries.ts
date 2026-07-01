import { client } from './sanity.client'

export async function getStories() {
  return client.fetch(`*[_type == "story"] | order(publishedAt desc) {
    _id, title, slug, excerpt, mainImage, publishedAt
  }`)
}

export async function getStoryBySlug(slug: string) {
  return client.fetch(`*[_type == "story" && slug.current == $slug][0] {
    ..., categories[]->
  }`, { slug })
}