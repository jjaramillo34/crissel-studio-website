import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '../../../../payload.config'
import { RAFFLE_PROMO_SLUG } from '@/data/raffle'
import { normalizeEcuadorMobile } from '@/lib/phoneEcuador'

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>
    const firstName = String(body.firstName ?? '')
      .trim()
      .slice(0, 80)
    const phone = String(body.phone ?? '').trim()
    const consent = Boolean(body.consent)
    const promoRaw = typeof body.promoSlug === 'string' ? body.promoSlug.trim() : ''
    const promoSlug = promoRaw || RAFFLE_PROMO_SLUG

    if (!consent) {
      return NextResponse.json(
        { ok: false, message: 'Marca la casilla para participar en el sorteo.' },
        { status: 400 },
      )
    }
    if (firstName.length < 1) {
      return NextResponse.json({ ok: false, message: 'Escribe tu nombre.' }, { status: 400 })
    }
    if (!phone) {
      return NextResponse.json({ ok: false, message: 'Escribe tu número de teléfono.' }, { status: 400 })
    }

    const phoneNormalized = normalizeEcuadorMobile(phone)
    if (!phoneNormalized) {
      return NextResponse.json(
        { ok: false, message: 'Número no válido. Usa tu celular ecuatoriano (ej. 099…).' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'raffle-entries',
      data: {
        firstName,
        phone,
        phoneNormalized,
        promoSlug,
        consent: true,
      },
      overrideAccess: true,
    })

    return NextResponse.json({ ok: true, message: '¡Listo! Ya estás en el sorteo.' })
  } catch (e) {
    const msg = e instanceof Error ? e.message : ''
    if (msg === 'DUPLICATE_PHONE') {
      return NextResponse.json(
        { ok: false, message: 'Este número ya está registrado en el sorteo.' },
        { status: 409 },
      )
    }
    if (msg === 'INVALID_PHONE') {
      return NextResponse.json(
        { ok: false, message: 'Número no válido. Revisa el teléfono e intenta de nuevo.' },
        { status: 400 },
      )
    }
    console.error('[raffle/enter]', e)
    return NextResponse.json(
      { ok: false, message: 'No pudimos guardar tu inscripción. Intenta más tarde.' },
      { status: 500 },
    )
  }
}
