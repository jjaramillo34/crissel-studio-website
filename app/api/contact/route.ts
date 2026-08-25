import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '../../../payload.config'
import { checkRateLimit } from '../../../src/lib/rateLimit'

const subjects = ['appointment', 'makeup', 'eyebrows', 'lashes', 'other'] as const
type Subject = (typeof subjects)[number]
const maxRequestBytes = 10_000

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIp =
      forwardedFor?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
    const rateLimit = checkRateLimit(`contact:${clientIp}`, 5, 10 * 60 * 1000)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { ok: false, message: 'Demasiados intentos. Intenta de nuevo más tarde.' },
        {
          status: 429,
          headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) },
        },
      )
    }

    const contentLength = Number(request.headers.get('content-length') || 0)
    if (contentLength > maxRequestBytes) {
      return NextResponse.json(
        { ok: false, message: 'La solicitud es demasiado grande.' },
        { status: 413 },
      )
    }

    const body = (await request.json()) as Record<string, unknown>
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const subjectValue = typeof body.subject === 'string' ? body.subject : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    if (name.length < 1 || name.length > 80) {
      return NextResponse.json({ ok: false, message: 'Escribe tu nombre.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, message: 'Escribe un email válido.' }, { status: 400 })
    }
    if (!(subjects as readonly string[]).includes(subjectValue)) {
      return NextResponse.json({ ok: false, message: 'Selecciona un asunto válido.' }, { status: 400 })
    }
    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { ok: false, message: 'El mensaje debe tener entre 10 y 2000 caracteres.' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config: configPromise })
    await payload.create({
      collection: 'contact-submissions',
      data: { name, email, subject: subjectValue as Subject, message, status: 'new' },
      overrideAccess: true,
    })

    return NextResponse.json({ ok: true, message: '¡Mensaje enviado! Te responderemos pronto.' })
  } catch (error) {
    console.error('[contact]', error)
    return NextResponse.json(
      { ok: false, message: 'No pudimos enviar tu mensaje. Intenta más tarde.' },
      { status: 500 },
    )
  }
}
