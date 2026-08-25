import type { CollectionConfig } from 'payload'

export const ContactSubmission: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: 'Mensaje de contacto',
    plural: 'Mensajes de contacto',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'subject', 'status', 'createdAt'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 80 },
    { name: 'email', type: 'email', required: true },
    {
      name: 'subject',
      type: 'select',
      required: true,
      options: [
        { label: 'Reserva de cita', value: 'appointment' },
        { label: 'Consulta maquillaje', value: 'makeup' },
        { label: 'Consulta cejas', value: 'eyebrows' },
        { label: 'Consulta pestañas', value: 'lashes' },
        { label: 'Otro', value: 'other' },
      ],
    },
    { name: 'message', type: 'textarea', required: true, maxLength: 2000 },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Nuevo', value: 'new' },
        { label: 'En seguimiento', value: 'in-progress' },
        { label: 'Respondido', value: 'replied' },
        { label: 'Archivado', value: 'archived' },
      ],
    },
  ],
}
