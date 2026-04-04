import { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Extensiones de Pestañas', value: 'extensiones-pestanas' },
        { label: 'Diseño de Cejas', value: 'diseno-cejas' },
        { label: 'Maquillaje Social', value: 'maquillaje-social' },
        { label: 'Maquillaje Fantasía', value: 'maquillaje-fantasia' },
        { label: 'Microblading', value: 'microblading' },
        { label: 'Planchado de Cejas', value: 'planchado-cejas' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Order for display (lower numbers appear first)',
      },
    },
  ],
  defaultSort: 'order',
}

