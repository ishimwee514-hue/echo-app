import { defineType } from 'sanity'

export default defineType({
  name: 'libraryItem',
  title: 'Library Item (Book/Work)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'author',
      title: 'Author/Creator',
      type: 'reference',
      to: { type: 'legend' },
    },
    {
      name: 'cover',
      title: 'Book Cover',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Book', value: 'book' },
          { title: 'Essay', value: 'essay' },
          { title: 'Speech', value: 'speech' },
          { title: 'Work', value: 'work' },
          { title: 'Treatise', value: 'treatise' },
        ],
      },
    },
    {
      name: 'year',
      title: 'Year Published/Written',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'summary',
      title: 'Summary/Overview',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'keyThemes',
      title: 'Key Themes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., ethics, politics, logic, metaphysics',
    },
    {
      name: 'relatedQuotes',
      title: 'Related Quotes from this Work',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'quote' } }],
    },
    {
      name: 'externalLinks',
      title: 'External Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Link Title' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        },
      ],
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: { type: 'category' },
    },
    {
      name: 'savedCount',
      title: 'Times Saved by Users',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'cover',
      author: 'author.name',
    },
    prepare(selection) {
      const { title, author } = selection
      return {
        title,
        subtitle: `By ${author || 'Unknown'}`,
      }
    },
  },
})
