import { defineType } from 'sanity'

export default defineType({
  name: 'message',
  title: 'Direct Message',
  type: 'document',
  fields: [
    {
      name: 'senderId',
      title: 'Sender ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'senderUsername',
      title: 'Sender Username',
      type: 'string',
    },
    {
      name: 'receiverId',
      title: 'Receiver ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'receiverUsername',
      title: 'Receiver Username',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Message Content',
      type: 'text',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'isRead',
      title: 'Read Status',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'readAt',
      title: 'Read At',
      type: 'datetime',
    },
    {
      name: 'attachments',
      title: 'Attachments',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'type', type: 'string', title: 'Type' },
            { name: 'url', type: 'url', title: 'URL' },
            { name: 'filename', type: 'string', title: 'Filename' },
          ],
        },
      ],
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
  ],
})
