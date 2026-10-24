'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Button,
  Column,
  Feedback,
  Icon,
  PasswordInput,
  RevealFx,
  Row,
  Text,
} from '@once-ui-system/core'

type Winner = { id: string | number; firstName: string; phone: string; phoneNormalized: string }

function randomDigits(): string {
  const a = Math.floor(Math.random() * 900) + 99
  const b = Math.floor(Math.random() * 9000) + 1000
  return `${a} ${b}`
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export default function StaffSorteoClient() {
  const prefersReducedMotion = usePrefersReducedMotion()
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
    <Column gap="24">
      <PasswordInput
        id="staff-token"
        label="Token de equipo"
        autoComplete="off"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />

      <Button
        fillWidth
        size="l"
        prefixIcon="dice"
        label={phase === 'spinning' ? 'Sorteando…' : 'Elegir ganadora al azar'}
        loading={phase === 'spinning'}
        disabled={phase === 'spinning'}
        onClick={() => void runDraw()}
      />

      {error && <Feedback variant="danger" description={error} />}

      {phase !== 'idle' && (
        <Column
          background="accent-alpha-weak"
          border="accent-alpha-medium"
          radius="xl"
          padding="32"
          gap="12"
          horizontal="center"
          align="center"
          aria-live="polite"
        >
          {phase === 'spinning' &&
            (prefersReducedMotion ? (
              <Text variant="body-strong-s" onBackground="accent-strong">
                Sorteando…
              </Text>
            ) : (
              <Text variant="code-strong-l" onBackground="accent-strong" aria-hidden>
                {flash}
              </Text>
            ))}

          {phase === 'done' && winner && (
            <RevealFx translateY="8">
              <Column gap="12" horizontal="center">
                <Row center width="56" height="56" radius="l" solid="brand-strong">
                  <Icon name="sparkle" size="l" onSolid="brand-strong" />
                </Row>
                <Text variant="heading-strong-l">Ganadora</Text>
                <Text variant="heading-default-m" onBackground="accent-strong">
                  {winner.firstName}
                </Text>
                <Text variant="code-default-m">{winner.phone}</Text>
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  {winner.phoneNormalized}
                </Text>
                {truncated && (
                  <Text variant="body-strong-xs" onBackground="accent-medium">
                    Nota: hay más de 5000 inscripciones; este sorteo usó un subconjunto. Ajusta el
                    límite en el código si lo necesitas.
                  </Text>
                )}
              </Column>
            </RevealFx>
          )}
        </Column>
      )}
    </Column>
  )
}
