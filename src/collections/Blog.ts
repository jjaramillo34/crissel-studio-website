import type { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the title',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short description for previews',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Extensiones', value: 'Extensiones' },
        { label: 'Cejas', value: 'Cejas' },
        { label: 'Pestañas', value: 'Pestañas' },
        { label: 'Maquillaje', value: 'Maquillaje' },
        { label: 'Skincare', value: 'Skincare' },
      ],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'readingTime',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., "4 min lectura"',
      },
    },
    {
      name: 'sections',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'heading',
          type: 'text',
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Paragraph', value: 'paragraph' },
            { label: 'List', value: 'list' },
            { label: 'Quote', value: 'quote' },
          ],
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
          admin: {
            description: 'For lists, separate items with new lines',
          },
        },
      ],
    },
  ],
}

