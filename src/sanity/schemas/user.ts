export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bookmarks',
      title: 'Bookmarks',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'book' }, { type: 'post' }],
        },
      ],
    },
    {
      name: 'readingProgress',
      title: 'Reading Progress',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'book',
              title: 'Book',
              type: 'reference',
              to: [{ type: 'book' }],
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'progress',
              title: 'Progress',
              type: 'number',
              validation: (Rule: any) => Rule.required().min(0).max(100),
            },
            {
              name: 'lastReadAt',
              title: 'Last Read At',
              type: 'datetime',
            },
          ],
        },
      ],
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      media: 'image',
    },
  },
}
