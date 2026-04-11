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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'preview',
      title: 'Preview',
      type: 'text',
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
      description: 'Deskripsi lengkap buku',
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
          { title: 'Kopi', value: 'kopi' },
          { title: 'Pekerja', value: 'pekerja' },
          { title: 'Catatan Malam', value: 'catatan-malam' },
        ],
      },
    }),
    defineField({
      name: 'author',
      title: 'Penulis',
      type: 'string',
      description: 'Nama penulis buku',
    }),
    defineField({
      name: 'pages',
      title: 'Jumlah Halaman',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'readTime',
      title: 'Waktu Baca',
      type: 'string',
      description: 'Contoh: "5 menit", "10 menit"',
    }),
    defineField({
      name: 'cover',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'downloadUrl',
      title: 'URL Download',
      type: 'url',
      description: 'Link untuk download buku (PDF/EPUB)',
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
    defineField({
      name: 'chapters',
      title: 'Bab-Bab',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'chapter',
          fields: [
            defineField({
              name: 'title',
              title: 'Judul Bab',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Isi Bab',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                    { title: 'Quote', value: 'blockquote' },
                  ],
                  lists: [
                    { title: 'Bullet', value: 'bullet' },
                    { title: 'Numbered', value: 'number' },
                  ],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                      { title: 'Code', value: 'code' },
                      { title: 'Underline', value: 'underline' },
                      { title: 'Strike', value: 'strike-through' },
                    ],
                    annotations: [
                      {
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [
                          {
                            name: 'href',
                            type: 'url',
                            title: 'URL',
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
})
