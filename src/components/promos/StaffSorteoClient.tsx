'use client'

import { useCallback, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Dices, Loader2, Sparkles } from 'lucide-react'

type Winner = { id: string | number; firstName: string; phone: string; phoneNormalized: string }

function randomDigits(): string {
  const a = Math.floor(Math.random() * 900) + 99
  const b = Math.floor(Math.random() * 9000) + 1000
  return `${a} ${b}`
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export default function StaffSorteoClient() {
  const prefersReducedMotion = useReducedMotion()
  const [token, setToken] = useState('')
  const [phase, setPhase] = useState<'idle' | 'spinning' | 'done'>('idle')
  const [flash, setFlash] = useState('099 ••• ••••')
  const [winner, setWinner] = useState<Winner | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [truncated, setTruncated] = useState(false)
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTick = () => {
    if (tickRef.current) {
      clearInterval(tickRef.current)
      tickRef.current = null
    }
  }

  const runDraw = useCallback(async () => {
    setError(null)
    setWinner(null)
    setTruncated(false)
    if (!token.trim()) {
      setError('Pega el token de equipo (variable RAFFLE_STAFF_TOKEN).')
      return
    }

    setPhase('spinning')
    clearTick()
    const minSpinMs = prefersReducedMotion ? 0 : 2400
    const started = Date.now()

    if (!prefersReducedMotion) {
      tickRef.current = setInterval(() => {
        setFlash(`09${Math.random() > 0.5 ? '9' : '8'} ${randomDigits()}`)
      }, 90)
    }

    try {
      const res = await fetch('/api/raffle/draw', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.trim()}` },
      })
      const data = (await res.json()) as {
        ok?: boolean
        message?: string
        winner?: Winner
        truncated?: boolean
        poolSize?: number
      }

      const elapsed = Date.now() - started
      if (minSpinMs > elapsed) await sleep(minSpinMs - elapsed)

      clearTick()
      if (!res.ok || !data.ok || !data.winner) {
        setPhase('idle')
        setError(data.message || 'No se pudo sortear.')
        return
      }

      setWinner(data.winner)
      setTruncated(Boolean(data.truncated))
      setPhase('done')
      setFlash(data.winner.phone)
    } catch {
      clearTick()
      setPhase('idle')
      setError('Error de red.')
    }
  }, [prefersReducedMotion, token])

  return (
    <div className="mt-8 space-y-6">
      <div>
        <label htmlFor="staff-token" className="text-sm font-semibold text-neutral-800">
          Token de equipo
        </label>
        <input
          id="staff-token"
          type="password"
          autoComplete="off"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#E57373] focus:ring-2 focus:ring-rose-200"
          placeholder="RAFFLE_STAFF_TOKEN"
        />
      </div>

      <button
        type="button"
        onClick={() => void runDraw()}
        disabled={phase === 'spinning'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-amber-200/40 transition hover:brightness-105 disabled:opacity-60"
      >
        {phase === 'spinning' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Sorteando…
          </>
        ) : (
          <>
            <Dices className="h-5 w-5" aria-hidden />
            Elegir ganadora al azar
          </>
        )}
      </button>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900" role="alert">
          {error}
        </p>
      )}

      <AnimatePresence mode="wait">
        {(phase === 'spinning' || phase === 'done') && (
          <motion.div
            key="stage"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative overflow-hidden rounded-3xl border border-amber-200/80 bg-gradient-to-b from-amber-50 to-white p-8 text-center shadow-inner"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.25),transparent_55%)]" />
            {phase === 'spinning' && !prefersReducedMotion && (
              <motion.p
                className="relative font-mono text-2xl font-bold tracking-wider text-amber-900/90 sm:text-3xl"
                animate={{ opacity: [1, 0.65, 1] }}
                transition={{ duration: 0.4, repeat: Infinity }}
              >
                {flash}
              </motion.p>
            )}
            {phase === 'spinning' && prefersReducedMotion && (
              <p className="relative text-sm font-medium text-amber-900">Sorteando…</p>
            )}
            {phase === 'done' && winner && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative space-y-3"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-rose-400 text-white shadow-lg">
                  <Sparkles className="h-7 w-7" aria-hidden />
                </div>
                <p className="font-display text-xl font-bold text-neutral-900">Ganadora</p>
                <p className="text-lg font-semibold text-amber-950">{winner.firstName}</p>
                <p className="font-mono text-base text-neutral-800">{winner.phone}</p>
                <p className="text-xs text-neutral-500">{winner.phoneNormalized}</p>
                {truncated && (
                  <p className="text-xs font-medium text-amber-800">
                    Nota: hay más de 5000 inscripciones; este sorteo usó un subconjunto. Ajusta el
                    límite en el código si lo necesitas.
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
