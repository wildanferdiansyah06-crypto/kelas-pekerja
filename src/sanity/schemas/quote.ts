import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'quote',
  title: 'Quote',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Kopi', value: 'kopi' },
          { title: 'Refleksi', value: 'refleksi' },
          { title: 'Menulis', value: 'menulis' },
          { title: 'Kehidupan', value: 'kehidupan' },
        ],
      },
    }),
    defineField({
      name: 'mood',
      title: 'Mood',
      type: 'string',
      options: {
        list: [
          { title: 'Melancholic', value: 'melancholic' },
          { title: 'Peaceful', value: 'peaceful' },
          { title: 'Hopeful', value: 'hopeful' },
          { title: 'Calm', value: 'calm' },
          { title: 'Contemplative', value: 'contemplative' },
          { title: 'Deep', value: 'deep' },
          { title: 'Quiet', value: 'quiet' },
        ],
      },
    }),
  ],
})
