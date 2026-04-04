import { CollectionConfig } from 'payload'

export const Testimonial: CollectionConfig = {
  slug: 'testimonials',
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
      admin: {
        description: 'Client name',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Testimonial text',
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      admin: {
        description: 'Rating from 1 to 5',
      },
    },
    {
      name: 'service',
      type: 'text',
      admin: {
        description: 'Service received (optional)',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Client photo (optional)',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show in featured testimonials',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Order for display',
      },
    },
  ],
  defaultSort: 'order',
}

