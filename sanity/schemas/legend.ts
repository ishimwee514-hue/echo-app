import { defineType } from 'sanity'

export default defineType({
  name: 'legend',
  title: 'Legend (Historical Figure)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'era',
      title: 'Era / Time Period',
      type: 'string',
      description: 'e.g., Ancient Greece, Medieval, Renaissance',
    },
    {
      name: 'portrait',
      title: 'Portrait Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'professions',
      title: 'Professions/Titles',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., Philosopher, Mathematician, Scientist, Military Leader',
    },
    {
      name: 'biography',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Full biography and achievements',
    },
    {
      name: 'majorAchievements',
      title: 'Major Achievements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'achievement', type: 'string', title: 'Achievement' },
            { name: 'year', type: 'string', title: 'Year/Period' },
            { name: 'description', type: 'text', title: 'Description' },
          ],
        },
      ],
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    },
    {
      name: 'philosophicalWorks',
      title: 'Philosophical Works/Ideas',
      type: 'text',
      rows: 6,
    },
    {
      name: 'influenceScore',
      title: 'Influence Score (1-10)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(10),
    },
    {
      name: 'isFeature',
      title: 'Feature on Homepage',
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
      title: 'name',
      media: 'portrait',
      subtitle: 'professions.0',
    },
  },
})
