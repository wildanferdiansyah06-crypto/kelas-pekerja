const userSchema = {
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
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'ID',
              type: 'string',
            },
            {
              name: 'type',
              title: 'Type',
              type: 'string',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            },
            {
              name: 'cover',
              title: 'Cover',
              type: 'image',
            },
            {
              name: 'slug',
              title: 'Slug',
              type: 'slug',
            },
          ],
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
              name: 'bookSlug',
              title: 'Book Slug',
              type: 'string',
            },
            {
              name: 'book',
              title: 'Book',
              type: 'object',
              fields: [
                {
                  name: 'id',
                  title: 'ID',
                  type: 'string',
                },
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                },
                {
                  name: 'slug',
                  title: 'Slug',
                  type: 'slug',
                },
              ],
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
    prepare(selection: any) {
      const { title, subtitle, media } = selection;
      return {
        title: title || 'No name',
        subtitle: subtitle || 'No email',
        media: media && typeof media === 'object' ? media : '👤',
      };
    },
  },
}

export default userSchema;
