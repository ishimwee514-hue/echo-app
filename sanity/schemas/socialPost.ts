import { defineType } from 'sanity'

export default defineType({
  name: 'socialPost',
  title: 'Social Post / User Contribution',
  type: 'document',
  fields: [
    {
      name: 'userId',
      title: 'User ID',
      type: 'string',
      description: 'Unique identifier for the user (from auth system)',
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'userAvatar',
      title: 'User Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content',
      title: 'Post Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'relatedQuote',
      title: 'Related Quote',
      type: 'reference',
      to: { type: 'quote' },
      description: 'Link this post to an inspirational quote',
    },
    {
      name: 'relatedLegend',
      title: 'Related Historical Figure',
      type: 'reference',
      to: { type: 'legend' },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: { type: 'category' },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'likes',
      title: 'Likes Count',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'shares',
      title: 'Shares Count',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'userId', type: 'string', title: 'Commenter ID' },
            { name: 'username', type: 'string', title: 'Commenter Name' },
            { name: 'text', type: 'text', title: 'Comment' },
            { name: 'timestamp', type: 'datetime', title: 'Commented At' },
          ],
        },
      ],
    },
    {
      name: 'isApproved',
      title: 'Approved by Moderator',
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
      title: 'username',
      subtitle: 'content.0.children.0.text',
    },
  },
})
