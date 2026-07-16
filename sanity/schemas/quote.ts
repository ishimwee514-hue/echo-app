import { defineType } from 'sanity'

export default defineType({
  name: 'quote',
  title: 'Inspirational Quote',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Quote Text',
      type: 'text',
      validation: (Rule) => Rule.required().min(10),
      rows: 4,
    },
    {
      name: 'author',
      title: 'Author (Legend Reference)',
      type: 'reference',
      to: { type: 'legend' },
    },
    {
      name: 'authorName',
      title: 'Author Name (If no reference)',
      type: 'string',
      description: 'Use this if the author is not in the system',
    },
    {
      name: 'context',
      title: 'Context / Explanation',
      type: 'text',
      rows: 3,
      description: 'When/why was this quote said? What does it mean?',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., motivation, wisdom, courage, success',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: { type: 'category' },
    },
    {
      name: 'influenceLevel',
      title: 'Influence Level',
      type: 'string',
      options: {
        list: [
          { title: 'Highly Influential', value: 'high' },
          { title: 'Moderately Influential', value: 'moderate' },
          { title: 'Foundational', value: 'foundational' },
        ],
      },
    },
    {
      name: 'isFeature',
      title: 'Feature as Daily Quote',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
  ],
  preview: {
    select: {
      text: 'text',
      author: 'author.name',
    },
    prepare(selection) {
      const { text, author } = selection
      return {
        title: text?.substring(0, 50) + (text?.length > 50 ? '...' : ''),
        subtitle: author || 'Unknown Author',
      }
    },
  },
})
