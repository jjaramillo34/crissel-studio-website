import { CollectionConfig } from 'payload'

export const Service: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'text',
      admin: {
        description: 'Brief description for cards/previews',
      },
    },
    {
      name: 'price',
      type: 'number',
      admin: {
        description: 'Price in USD (optional)',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Extensiones de Pestañas', value: 'extensiones-pestanas' },
        { label: 'Diseño de Cejas', value: 'diseno-cejas' },
        { label: 'Maquillaje', value: 'maquillaje' },
        { label: 'Microblading', value: 'microblading' },
        { label: 'Planchado de Cejas', value: 'planchado-cejas' },
      ],
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'duration',
      type: 'text',
      admin: {
        description: 'e.g., "2 horas"',
      },
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}

