'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Loader2, PartyPopper, UserRound, Smartphone } from 'lucide-react'
import { RAFFLE_PROMO_SLUG } from '@/data/raffle'

type Stats = { total: number | null; loading: boolean }

export function RaffleSection() {
  const prefersReducedMotion = useReducedMotion()
  const [stats, setStats] = useState<Stats>({ total: null, loading: true })
  const [firstName, setFirstName] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  const refreshStats = useCallback(async () => {
    setStats((s) => ({ ...s, loading: true }))
    try {
      const r = await fetch('/api/raffle/stats', { cache: 'no-store' })
      const j = (await r.json()) as { ok?: boolean; total?: number }
      setStats({ total: typeof j.total === 'number' ? j.total : null, loading: false })
    } catch {
      setStats({ total: null, loading: false })
    }
  }, [])

  useEffect(() => {
    void refreshStats()
  }, [refreshStats])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setSubmitting(true)
    try {
      const r = await fetch('/api/raffle/enter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          phone: phone.trim(),
          consent,
          promoSlug: RAFFLE_PROMO_SLUG,
        }),
      })
      const j = (await r.json()) as { ok?: boolean; message?: string }
      if (j.ok) {
        setMessage({ type: 'ok', text: j.message || '¡Gracias por participar!' })
        setFirstName('')
        setPhone('')
        setConsent(false)
        void refreshStats()
      } else {
        setMessage({ type: 'err', text: j.message || 'No se pudo completar.' })
      }
    } catch {
      setMessage({ type: 'err', text: 'Error de conexión. Intenta de nuevo.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.section
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mt-14 overflow-hidden rounded-[2rem] border border-rose-200/60 bg-gradient-to-br from-white via-rose-50/30 to-amber-50/20 p-6 shadow-xl shadow-rose-100/30 sm:p-10"
      aria-labelledby="raffle-heading"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-rose-700">
            <PartyPopper className="h-3.5 w-3.5" aria-hidden />
            Sorteo activo
          </div>
          <h2 id="raffle-heading" className="mt-3 font-display text-2xl font-bold text-neutral-900 sm:text-3xl">
            Gana un maquillaje
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
            Deja tu nombre y celular para entrar al sorteo. El lunes anunciamos a la ganadora y te
            llamamos o escribimos para agendar.
          </p>
        </div>
        <div className="shrink-0 rounded-2xl border border-rose-100 bg-white/90 px-4 py-3 text-center sm:text-right">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Participantes</p>
          <p className="font-display text-3xl font-bold tabular-nums text-[#c45c5c]">
            {stats.loading ? (
              <Loader2 className="mx-auto inline h-8 w-8 animate-spin text-rose-400" aria-label="Cargando" />
            ) : (
              stats.total ?? '—'
            )}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-rose-200/80 bg-rose-50/40 p-4 text-sm text-neutral-700">
        <p className="font-medium text-neutral-800">¿Por qué pedimos tu nombre?</p>
        <p className="mt-1 leading-relaxed">
          Con tu <strong>nombre</strong> (puede ser solo el de pila) te tratamos con confianza cuando
          te avisemos si ganas, y evitamos confusiones si hay varias personas con el mismo final de
          número. Tu <strong>celular</strong> es la forma más rápida de contactarte para coordinar la
          cita del premio.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="raffle-first" className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-neutral-800">
            <UserRound className="h-4 w-4 text-rose-500" aria-hidden />
            Nombre
          </label>
          <input
            id="raffle-first"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            maxLength={80}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Ej. María"
            className="w-full rounded-2xl border border-rose-200/80 bg-white px-4 py-3 text-neutral-900 shadow-inner outline-none ring-rose-300/30 transition placeholder:text-neutral-400 focus:border-[#E57373] focus:ring-2"
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="raffle-phone" className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-neutral-800">
            <Smartphone className="h-4 w-4 text-rose-500" aria-hidden />
            Celular (WhatsApp)
          </label>
          <input
            id="raffle-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="099 000 0000"
            className="w-full rounded-2xl border border-rose-200/80 bg-white px-4 py-3 text-neutral-900 shadow-inner outline-none ring-rose-300/30 transition placeholder:text-neutral-400 focus:border-[#E57373] focus:ring-2"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-neutral-200/80 bg-white/80 p-4 transition hover:border-rose-200">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-rose-300 text-[#E57373] focus:ring-[#E57373]"
            />
            <span className="text-sm leading-relaxed text-neutral-700">
              Acepto participar en el sorteo y que Crissel Studio use este número para contactarme si
              soy la ganadora del maquillaje, según lo anunciado en esta página.
            </span>
          </label>
        </div>

        {message && (
          <div
            className={`sm:col-span-2 rounded-2xl px-4 py-3 text-sm font-medium ${
              message.type === 'ok'
                ? 'border border-emerald-200 bg-emerald-50 text-emerald-900'
                : 'border border-red-200 bg-red-50 text-red-900'
            }`}
            role="status"
          >
            {message.text}
          </div>
        )}

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={submitting || !consent}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#E57373] to-[#d65f7a] px-6 py-4 text-base font-semibold text-white shadow-lg shadow-rose-300/30 transition hover:brightness-105 disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                Enviando…
              </>
            ) : (
              <>
                <PartyPopper className="h-5 w-5" aria-hidden />
                Participar en el sorteo
              </>
            )}
          </button>
        </div>
      </form>
    </motion.section>
  )
}
