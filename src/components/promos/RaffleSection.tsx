'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  Button,
  Checkbox,
  Column,
  Feedback,
  Grid,
  Heading,
  Input,
  RevealFx,
  Row,
  Spinner,
  Tag,
  Text,
} from '@once-ui-system/core'
import {
  RAFFLE_PROMO_SLUG,
  SORTEO_ANUNCIO_REDES_DIA,
  SORTEO_COPY_FORM_INTRO,
  SORTEO_SERVICIO_PREMIO_DIA,
} from '@/data/raffle'

type Stats = { total: number | null; loading: boolean }

export function RaffleSection() {
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
    <RevealFx translateY="16" fillWidth>
      <Column
        as="section"
        aria-labelledby="raffle-heading"
        fillWidth
        background="surface"
        border="neutral-alpha-weak"
        radius="xl"
        padding="40"
        s={{ padding: '20' }}
        gap="32"
      >
        <Row horizontal="between" gap="24" s={{ direction: 'column' }}>
          <Column gap="12" maxWidth="m">
            <Tag variant="brand" size="s" prefixIcon="party" label="Sorteo activo" />
            <Heading id="raffle-heading" as="h2" variant="display-strong-xs">
              Gana un maquillaje
            </Heading>
            <Text variant="body-default-s" onBackground="neutral-medium">
              {SORTEO_COPY_FORM_INTRO}
            </Text>
          </Column>
          <Column
            background="page"
            border="neutral-alpha-weak"
            radius="l"
            paddingX="20"
            paddingY="12"
            gap="4"
            horizontal="center"
            fitWidth
            style={{ flexShrink: 0 }}
          >
            <Text variant="label-default-s" onBackground="neutral-weak">
              Participantes
            </Text>
            {stats.loading ? (
              <Spinner size="l" ariaLabel="Cargando participantes" />
            ) : (
              <Text variant="display-strong-xs" onBackground="brand-strong">
                {stats.total ?? '—'}
              </Text>
            )}
          </Column>
        </Row>

        <Column
          background="brand-alpha-weak"
          border="brand-alpha-medium"
          borderStyle="dashed"
          radius="l"
          padding="16"
          gap="4"
        >
          <Text variant="body-strong-s">¿Por qué pedimos tu nombre?</Text>
          <Text variant="body-default-s" onBackground="neutral-medium">
            Con tu <strong>nombre</strong> (puede ser solo el de pila) te tratamos con confianza cuando
            te avisemos si ganas, y evitamos confusiones si hay varias personas con el mismo final de
            número. Tu <strong>celular</strong> es la forma más rápida de contactarte para coordinar la
            cita del premio.
          </Text>
        </Column>

        <Column as="form" onSubmit={onSubmit} gap="20">
          <Grid columns="2" s={{ columns: 1 }} gap="20">
            <Input
              id="raffle-first"
              name="firstName"
              label="Nombre"
              placeholder="Ej. María"
              autoComplete="given-name"
              required
              maxLength={80}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              id="raffle-phone"
              name="phone"
              type="tel"
              label="Celular (WhatsApp)"
              placeholder="099 000 0000"
              autoComplete="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>

          <Checkbox
            id="raffle-consent"
            isChecked={consent}
            onToggle={() => setConsent((c) => !c)}
            label={`Acepto participar en el sorteo y que Crissel Studio use este número para contactarme si soy la ganadora del maquillaje, según lo indicado en esta página y en redes (anuncio el ${SORTEO_ANUNCIO_REDES_DIA}; servicio premio el ${SORTEO_SERVICIO_PREMIO_DIA}).`}
          />

          {message && (
            <Feedback
              variant={message.type === 'ok' ? 'success' : 'danger'}
              description={message.text}
            />
          )}

          <Row>
            <Button
              type="submit"
              size="l"
              prefixIcon="party"
              label={submitting ? 'Enviando…' : 'Participar en el sorteo'}
              loading={submitting}
              disabled={submitting || !consent}
            />
          </Row>
        </Column>
      </Column>
    </RevealFx>
  )
}
