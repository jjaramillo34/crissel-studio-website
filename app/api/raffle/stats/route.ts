import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '../../../../payload.config'
import { RAFFLE_PROMO_SLUG } from '@/data/raffle'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'raffle-entries',
      where: { promoSlug: { equals: RAFFLE_PROMO_SLUG } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    return NextResponse.json({
      ok: true,
      total: result.totalDocs,
      promoSlug: RAFFLE_PROMO_SLUG,
    })
  } catch (e) {
    console.error('[raffle/stats]', e)
    return NextResponse.json({ ok: false, total: null }, { status: 500 })
  }
}
