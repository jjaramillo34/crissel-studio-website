'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { Button, Icon, Row } from '@once-ui-system/core'
import { SectionHeader } from '@/components/sections/SectionHeader'
import {
  MADRE_COUPON_WHATSAPP_MESSAGE,
  PROMO_WHATSAPP_LINES,
  promos,
  whatsappHref,
  type PromoEntry,
} from '@/data/promos'
import { COUPON_FCFS_LIMIT, SORTEO_COPY_BANNER } from '@/data/raffle'
import { RaffleSection } from '@/components/promos/RaffleSection'

const BOOKING_URL = 'https://bit.ly/crisselstudio'
const INSTAGRAM_URL = 'https://instagram.com/crisselstudio.ec'
const NOTIFY_MESSAGE = 'Hola Crissel Studio, quiero enterarme de las próximas promociones.'

/** Ticket-style coupon: dashed edge with notches, big code, copy button */
const CouponTicket = ({ code, discount }: { code: string; discount?: string }) => {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [code])

  return (
    <div className="crissel-ticket">
      <div className="crissel-ticket__main">
        <span className="crissel-ticket__label">Cupón</span>
        <span className="crissel-ticket__code font-display">{code}</span>
        {discount && <span className="crissel-ticket__discount">{discount}</span>}
      </div>
      <button type="button" className="crissel-ticket__copy" onClick={copy}>
        <Icon name={copied ? 'check' : 'copy'} size="xs" />
        {copied ? 'Copiado' : 'Copiar'}
      </button>
    </div>
  )
}

/** Running promo: flyer in an arch on one side, offer and booking on the other */
const ActivePromo = ({ promo }: { promo: PromoEntry }) => {
  const message = promo.couponCode
    ? MADRE_COUPON_WHATSAPP_MESSAGE
    : `Hola Crissel Studio, quiero agendar la ${promo.title}.`

  return (
    <article className="crissel-promo" aria-labelledby={`${promo.id}-title`}>
      <div className="crissel-product__collage crissel-promo__flyer">
        <div className="crissel-promo__frame">
          <Image
            src={promo.imageSrc}
            alt={promo.imageAlt}
            fill
            sizes="(max-width: 900px) 90vw, 40vw"
            className="object-cover"
            priority
          />
        </div>
        <span className="crissel-product__badge">Activa</span>
      </div>

      <div className="crissel-promo__copy">
        <p className="crissel-treatment__number">
          {promo.tag} · {promo.validLabel}
        </p>
        <h2 id={`${promo.id}-title`} className="crissel-treatment__title font-display">
          {promo.title}
        </h2>
        <p className="crissel-treatment__subtitle">{promo.subtitle}</p>

        <div className="crissel-promo__price">
          <span className="crissel-promo__price-label">Inversión promo</span>
          <span className="crissel-promo__price-value font-display">{promo.price}</span>
          {promo.priceNote && (
            <span className="crissel-promo__price-note">
              <Icon name="gift" size="xs" />
              {promo.priceNote}
            </span>
          )}
        </div>

        <ul className="crissel-treatment__points">
          {[...promo.services, ...promo.perks].map((item) => (
            <li key={item}>
              <span className="crissel-treatment__check" aria-hidden>
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>

        {promo.couponCode && (
          <>
            <CouponTicket code={promo.couponCode} discount={promo.couponDiscountLabel} />
            <p className="crissel-promo__hint">
              El mensaje de WhatsApp ya incluye tu cupón. Elige la línea que prefieras:
            </p>
          </>
        )}

        <Row gap="12" s={{ direction: 'column', fillWidth: true }}>
          {PROMO_WHATSAPP_LINES.map((line, index) => (
            <Button
              key={line.id}
              href={whatsappHref(line.waE164, message)}
              variant={index === 0 ? 'primary' : 'secondary'}
              prefixIcon="whatsapp"
              label={`${line.label} · ${line.displayNational}`}
            />
          ))}
        </Row>
      </div>
    </article>
  )
}

/** Ended promo, kept as a small archive card */
const PastPromo = ({ promo }: { promo: PromoEntry }) => (
  <article className="crissel-past-promo">
    <div className="crissel-past-promo__thumb">
      <Image src={promo.imageSrc} alt={promo.imageAlt} fill sizes="160px" className="object-cover" />
    </div>
    <div className="crissel-past-promo__copy">
      <span className="crissel-past-promo__status">Finalizada</span>
      <h3 className="crissel-past-promo__title font-display">{promo.title}</h3>
      <p className="crissel-past-promo__meta">{promo.subtitle}</p>
      <p className="crissel-past-promo__meta">
        {promo.validLabel} · {promo.price}
      </p>
    </div>
  </article>
)

type PromosPageProps = {
  /** Ids of promos running right now (worked out on the server) */
  activeIds: string[]
  /** Ids of promos that have ended */
  pastIds: string[]
  raffleOpen: boolean
}

const PromosPage = ({ activeIds, pastIds, raffleOpen }: PromosPageProps) => {
  const active = promos.filter((promo) => activeIds.includes(promo.id))
  const past = promos.filter((promo) => pastIds.includes(promo.id))
  const hasActive = active.length > 0

  return (
    <main className="crissel-products">
      <section className="crissel-section crissel-section--blush crissel-products__intro">
        <div className="crissel-section__inner">
          <Button href="/" variant="tertiary" size="s" prefixIcon="arrowLeft" label="Volver al inicio" />
          <SectionHeader
            titleAs="h1"
            eyebrow="Edición limitada"
            title="Promos que"
            titleAccent="enamoran"
            description="Cupones, combos y fechas especiales. Escríbenos por WhatsApp con el mensaje listo y menciona tu cupón para aplicar descuentos."
          />
          <p className={`crissel-promo-status${hasActive ? ' is-live' : ''}`}>
            <span className="crissel-promo-status__dot" aria-hidden />
            {hasActive
              ? `${active.length === 1 ? '1 promo activa' : `${active.length} promos activas`} ahora mismo`
              : 'Sin promos activas por ahora'}
          </p>
        </div>
      </section>

      {hasActive ? (
        <section className="crissel-section crissel-section--cream" aria-label="Promos activas">
          <div className="crissel-section__inner crissel-promo-list">
            {active.map((promo) => (
              <ActivePromo key={promo.id} promo={promo} />
            ))}
          </div>
        </section>
      ) : (
        <section className="crissel-section crissel-section--cream" aria-labelledby="proximas-title">
          <div className="crissel-section__inner">
            <div className="crissel-promo-empty">
              <span className="crissel-standard__icon crissel-promo-empty__icon">
                <Icon name="gift" size="m" />
              </span>
              <SectionHeader
                titleId="proximas-title"
                size="compact"
                eyebrow="Próximamente"
                title="Nuevas promos"
                titleAccent="en camino"
                description="Preparamos campañas para fechas especiales a lo largo del año. Síguenos en Instagram o escríbenos y te avisamos apenas se publique la próxima."
              />
              <Row gap="12" horizontal="center" s={{ direction: 'column', fillWidth: true }}>
                <Button href={INSTAGRAM_URL} prefixIcon="sparkle" label="Seguir en Instagram" />
                <Button
                  href={whatsappHref(PROMO_WHATSAPP_LINES[1].waE164, NOTIFY_MESSAGE)}
                  variant="secondary"
                  prefixIcon="whatsapp"
                  label="Avísame por WhatsApp"
                />
              </Row>
              <Button href={BOOKING_URL} variant="tertiary" prefixIcon="calendar" label="O reserva tu cita al precio regular" />
            </div>
          </div>
        </section>
      )}

      {hasActive && raffleOpen && (
        <section className="crissel-section crissel-section--ink" aria-labelledby="extras-title">
          <div className="crissel-section__inner">
            <SectionHeader
              tone="dark"
              titleId="extras-title"
              eyebrow="Extras de la campaña"
              title="Cupones y"
              titleAccent="sorteo"
            />
            <div className="crissel-promo-extras">
              <div className="crissel-standard">
                <span className="crissel-standard__icon">
                  <Icon name="ticket" size="m" />
                </span>
                <h3 className="crissel-standard__title font-display">
                  Solo {COUPON_FCFS_LIMIT} cupones — orden de llegada
                </h3>
                <p className="crissel-standard__desc">
                  Para las primeras {COUPON_FCFS_LIMIT} personas que reserven durante esta campaña.
                  Primero en llegar, primero en servirse.
                </p>
              </div>
              <div className="crissel-standard">
                <span className="crissel-standard__icon">
                  <Icon name="crown" size="m" />
                </span>
                <h3 className="crissel-standard__title font-display">Sorteo: maquillaje</h3>
                <p className="crissel-standard__desc">Participa con tu número abajo. {SORTEO_COPY_BANNER}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {hasActive && raffleOpen && (
        <section className="crissel-section crissel-section--blush">
          <div className="crissel-section__inner crissel-promo-raffle">
            <RaffleSection />
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="crissel-section crissel-section--soft" aria-labelledby="anteriores-title">
          <div className="crissel-section__inner">
            <SectionHeader
              titleId="anteriores-title"
              size="compact"
              eyebrow="Archivo"
              title="Promos"
              titleAccent="anteriores"
            />
            <div className="crissel-past-promos">
              {past.map((promo) => (
                <PastPromo key={promo.id} promo={promo} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

export default PromosPage
