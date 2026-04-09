import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteConfig',
  title: 'Site Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'site',
      title: 'Site',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'tagline',
          title: 'Tagline',
          type: 'string',
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
        }),
        defineField({
          name: 'language',
          title: 'Language',
          type: 'string',
        }),
        defineField({
          name: 'locale',
          title: 'Locale',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
        }),
        defineField({
          name: 'bio',
          title: 'Bio',
          type: 'text',
        }),
        defineField({
          name: 'photo',
          title: 'Photo',
          type: 'image',
        }),
        defineField({
          name: 'roles',
          title: 'Roles',
          type: 'object',
          fields: [
            defineField({
              name: 'past',
              title: 'Past Roles',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'current',
              title: 'Current Role',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'social',
          title: 'Social',
          type: 'object',
          fields: [
            defineField({
              name: 'whatsapp',
              title: 'WhatsApp',
              type: 'string',
            }),
            defineField({
              name: 'instagram',
              title: 'Instagram',
              type: 'string',
            }),
            defineField({
              name: 'email',
              title: 'Email',
              type: 'string',
            }),
            defineField({
              name: 'twitter',
              title: 'Twitter',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'manifesto',
          title: 'Manifesto',
          type: 'text',
        }),
      ],
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      of: [
        defineField({
          name: 'nav',
          title: 'Navigation Item',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'href',
              title: 'Href',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'object',
      fields: [
        defineField({
          name: 'darkMode',
          title: 'Dark Mode',
          type: 'boolean',
        }),
        defineField({
          name: 'search',
          title: 'Search',
          type: 'boolean',
        }),
        defineField({
          name: 'bookmarks',
          title: 'Bookmarks',
          type: 'boolean',
        }),
        defineField({
          name: 'randomQuote',
          title: 'Random Quote',
          type: 'boolean',
        }),
        defineField({
          name: 'readingTime',
          title: 'Reading Time',
          type: 'boolean',
        }),
        defineField({
          name: 'comments',
          title: 'Comments',
          type: 'boolean',
        }),
        defineField({
          name: 'newsletter',
          title: 'Newsletter',
          type: 'boolean',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'defaultImage',
          title: 'Default Image',
          type: 'image',
        }),
        defineField({
          name: 'twitterHandle',
          title: 'Twitter Handle',
          type: 'string',
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),
  ],
})
