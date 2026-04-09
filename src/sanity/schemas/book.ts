import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'book',
  title: 'Buku',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    }),
    defineField({
      name: 'preview',
      title: 'Preview',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Kehidupan', value: 'kehidupan' },
          { title: 'Cerita', value: 'cerita' },
          { title: 'Renungan', value: 'renungan' },
          { title: 'Proses', value: 'proses' },
          { title: 'Filosofi', value: 'filosofi' },
          { title: 'Refleksi', value: 'refleksi' },
        ],
      },
    }),
    defineField({
      name: 'readTime',
      title: 'Waktu Baca',
      type: 'string',
    }),
    defineField({
      name: 'cover',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Tanggal Terbit',
      type: 'datetime',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'stats',
      title: 'Statistik',
      type: 'object',
      fields: [
        defineField({
          name: 'views',
          title: 'Views',
          type: 'number',
          initialValue: 0,
        }),
        defineField({
          name: 'downloads',
          title: 'Downloads',
          type: 'number',
          initialValue: 0,
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
