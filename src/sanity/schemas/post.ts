import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Tulisan',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hook',
      title: 'Hook',
      type: 'text',
    }),
    defineField({
      name: 'opening',
      title: 'Opening',
      type: 'text',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
    }),
    defineField({
      name: 'readTime',
      title: 'Waktu Baca',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Tanggal',
      type: 'datetime',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'workplace',
      title: 'Workplace',
      type: 'string',
    }),
    defineField({
      name: 'duration',
      title: 'Durasi',
      type: 'string',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        defineField({
          name: 'paragraph',
          title: 'Paragraph',
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              initialValue: 'paragraph',
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
            }),
          ],
        }),
        defineField({
          name: 'quote',
          title: 'Quote',
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              initialValue: 'quote',
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'impact',
      title: 'Impact',
      type: 'text',
    }),
    defineField({
      name: 'related',
      title: 'Related Posts',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'likes',
      title: 'Likes',
      type: 'number',
      initialValue: 0,
    }),
  ],
})
