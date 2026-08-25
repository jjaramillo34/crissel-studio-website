import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-mongodb'
import { RAFFLE_PROMO_SLUG } from '@/data/raffle'
import { normalizeEcuadorMobile } from '@/lib/phoneEcuador'

const indexName = 'raffle_entries_dedupe_key_unique'

type RaffleEntryDocument = {
  _id: unknown
  dedupeKey?: string | null
  phone?: string
  phoneNormalized?: string | null
  promoSlug?: string
}

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const collection = payload.db.collections['raffle-entries']?.collection

  if (!collection) {
    throw new Error('Could not access the raffle-entries collection.')
  }

  const entries = (await collection
    .find({
      $or: [{ dedupeKey: { $exists: false } }, { dedupeKey: null }],
    })
    .toArray()) as RaffleEntryDocument[]

  for (const entry of entries) {
    const promoSlug = entry.promoSlug || RAFFLE_PROMO_SLUG
    const normalized =
      entry.phoneNormalized?.trim() || normalizeEcuadorMobile(entry.phone || '')

    if (!normalized) {
      throw new Error(`Could not normalize raffle entry ${String(entry._id)}.`)
    }

    await payload.update({
      collection: 'raffle-entries',
      id: String(entry._id),
      data: {
        dedupeKey: `${promoSlug}:${normalized}`,
        phoneNormalized: normalized,
        promoSlug,
      },
      overrideAccess: true,
    })
  }

  await collection.createIndex({ dedupeKey: 1 }, { name: indexName, unique: true })
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  const collection = payload.db.collections['raffle-entries']?.collection

  if (!collection) {
    throw new Error('Could not access the raffle-entries collection.')
  }

  await collection.dropIndex(indexName)
  await collection.updateMany({}, { $unset: { dedupeKey: '' } })
}

export default {
  name: '20260825000000-raffle-dedupe-key',
  up,
  down,
}
