import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import { RAFFLE_PROMO_SLUG } from '@/data/raffle'
import { normalizeEcuadorMobile } from '@/lib/phoneEcuador'

const ensureNormalizedAndDedupe: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  originalDoc,
}) => {
  const promoSlug = (data.promoSlug as string) || RAFFLE_PROMO_SLUG
  const rawPhone = typeof data.phone === 'string' ? data.phone : ''
  const normalized =
    typeof data.phoneNormalized === 'string' && data.phoneNormalized.trim()
      ? data.phoneNormalized.trim()
      : normalizeEcuadorMobile(rawPhone)
  if (!normalized) {
    throw new Error('INVALID_PHONE')
  }
  data.phoneNormalized = normalized
  data.promoSlug = promoSlug

  const skipId = operation === 'update' && originalDoc?.id ? String(originalDoc.id) : undefined
  const existing = await req.payload.find({
    collection: 'raffle-entries',
    where: {
      and: [
        { promoSlug: { equals: promoSlug } },
        { phoneNormalized: { equals: normalized } },
      ],
    },
    limit: 5,
    depth: 0,
    overrideAccess: true,
  })
  const clash = existing.docs.some((d) => (skipId ? String(d.id) !== skipId : true))
  if (clash) {
    throw new Error('DUPLICATE_PHONE')
  }
  return data
}

export const RaffleEntry: CollectionConfig = {
  slug: 'raffle-entries',
  labels: { singular: 'Participación sorteo', plural: 'Participaciones sorteo' },
  admin: {
    useAsTitle: 'firstName',
    defaultColumns: ['firstName', 'phone', 'phoneNormalized', 'promoSlug', 'createdAt'],
    description:
      'Inscripciones al sorteo de maquillaje (web). Altas públicas vía API; también puedes crear desde admin.',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeChange: [ensureNormalizedAndDedupe],
  },
  fields: [
    {
      name: 'promoSlug',
      type: 'text',
      required: true,
      defaultValue: RAFFLE_PROMO_SLUG,
      admin: { description: 'Campaña / promo asociada' },
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
      minLength: 1,
      maxLength: 80,
      admin: { description: 'Nombre o cómo te gusta que te llamemos' },
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      maxLength: 32,
      admin: { description: 'Teléfono tal como lo escribió la clienta' },
    },
    {
      name: 'phoneNormalized',
      type: 'text',
      required: true,
      index: true,
      admin: { description: '593… para deduplicar', readOnly: true },
    },
    {
      name: 'consent',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      admin: {
        description: 'Aceptó ser contactada si gana',
      },
    },
  ],
}
