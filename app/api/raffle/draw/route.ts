import { randomInt } from 'node:crypto'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '../../../../payload.config'
import { RAFFLE_PROMO_SLUG } from '@/data/raffle'

const MAX_FETCH = 5000

function getBearer(req: Request): string | null {
  const h = req.headers.get('authorization')
  if (!h?.startsWith('Bearer ')) return null
  return h.slice(7).trim() || null
}

export async function POST(req: Request) {
  const token = getBearer(req)
  const expected = process.env.RAFFLE_STAFF_TOKEN
  if (!expected || token !== expected) {
    return NextResponse.json({ ok: false, message: 'No autorizado' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'raffle-entries',
      where: { promoSlug: { equals: RAFFLE_PROMO_SLUG } },
      limit: MAX_FETCH,
      depth: 0,
      overrideAccess: true,
    })

    if (!result.docs.length) {
      return NextResponse.json({ ok: false, message: 'No hay participantes.' }, { status: 404 })
    }

    // randomInt upper bound is exclusive
    const idx = randomInt(0, result.docs.length)
    const w = result.docs[idx]
    return NextResponse.json({
      ok: true,
      winner: {
        id: w.id,
        firstName: w.firstName,
        phone: w.phone,
        phoneNormalized: w.phoneNormalized,
      },
      poolSize: result.docs.length,
      truncated: result.totalDocs > result.docs.length,
    })
  } catch (e) {
    console.error('[raffle/draw]', e)
    return NextResponse.json({ ok: false, message: 'Error al sortear.' }, { status: 500 })
  }
}
