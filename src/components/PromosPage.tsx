'use client'

import { useCallback, useState } from 'react'
import {
  Background,
  Button,
  Column,
  Heading,
  Icon,
  Media,
  RevealFx,
  Row,
  Tag,
  Text,
} from '@once-ui-system/core'
import { SectionHeader } from '@/components/sections/SectionHeader'
import {
  MADRE_COUPON_WHATSAPP_MESSAGE,
  PROMO_WHATSAPP_LINES,
  promos,
  whatsappHref,
  type PromoEntry,
} from '@/data/promos'
import { PromosNoticeBanner } from '@/components/promos/PromosNoticeBanner'
import { RaffleSection } from '@/components/promos/RaffleSection'

const PromoCard = ({ promo }: { promo: PromoEntry }) => (
  <Column
    as="article"
    fillWidth
    background="surface"
    border="accent-alpha-medium"
    radius="xl"
    padding="32"
    s={{ padding: '20' }}
    gap="24"
  >
    <Row gap="12" vertical="center" wrap>
      <Tag variant="accent" prefixIcon="calendar" label={promo.tag} />
      <Text variant="body-strong-s" onBackground="neutral-medium">
        {promo.validLabel}
      </Text>
    </Row>

    <Column gap="8">
      <Heading as="h2" variant="display-strong-xs">
        {promo.title}
      </Heading>
      <Text variant="body-default-l" onBackground="neutral-medium">
        {promo.subtitle}
      </Text>
    </Column>

    <Column as="ul" gap="8" margin="0" padding="0" style={{ listStyle: 'none' }}>
      {promo.services.map((service) => (
        <Row as="li" key={service} gap="8" vertical="center">
          <Row center width="24" height="24" radius="full" background="brand-alpha-weak">
            <Icon name="sparkle" size="xs" onBackground="brand-strong" />
          </Row>
          <Text variant="body-strong-s">{service}</Text>
        </Row>
      ))}
    </Column>

    <Row gap="24" vertical="center" s={{ direction: 'column' }}>
      <Media
        flex={1}
        src={promo.imageSrc}
        alt={promo.imageAlt}
        aspectRatio="4 / 5"
        radius="l"
        border="neutral-alpha-weak"
        sizes="(max-width: 1024px) 100vw, 30vw"
        priority
      />

      <Column flex={1} gap="20" fillWidth>
        <Column background="accent-alpha-weak" border="accent-alpha-medium" radius="l" padding="24" gap="4">
          <Text variant="label-default-s" onBackground="accent-medium">
            Inversión promo
          </Text>
          <Text variant="display-strong-l" onBackground="accent-strong">
            {promo.price}
          </Text>
          {promo.priceNote && (
            <Row gap="8" vertical="center">
              <Icon name="gift" size="s" onBackground="brand-medium" />
              <Text variant="body-strong-s" onBackground="neutral-medium">
                {promo.priceNote}
              </Text>
            </Row>
          )}
        </Column>
        {promo.perks.map((perk) => (
          <Text key={perk} variant="heading-strong-m" onBackground="brand-strong">
            {perk}
          </Text>
        ))}
      </Column>
    </Row>
  </Column>
)

const CouponAside = ({ couponCode }: { couponCode?: string }) => {
  const [copied, setCopied] = useState(false)

  const copyCoupon = useCallback(async () => {
    if (!couponCode) return
    try {
      await navigator.clipboard.writeText(couponCode)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [couponCode])

  return (
    <Column as="aside" fillWidth gap="24">
      <Column background="surface" border="neutral-alpha-weak" radius="xl" padding="32" s={{ padding: '20' }} gap="16">
        <Text variant="label-default-s" onBackground="brand-medium">
          Cupón activo
        </Text>
        <Row gap="12" vertical="center" wrap>
          <Text variant="display-strong-s" style={{ letterSpacing: '0.2em' }}>
            {couponCode}
          </Text>
          <Button
            variant="secondary"
            size="s"
            prefixIcon={copied ? 'check' : 'copy'}
            label={copied ? 'Copiado' : 'Copiar código'}
            onClick={copyCoupon}
          />
        </Row>
        <Text variant="body-default-s" onBackground="neutral-medium">
          Menciona el cupón <strong>{couponCode}</strong> al agendar por WhatsApp y obtén{' '}
          <strong>5% de descuento</strong> sobre tu servicio elegible.
        </Text>
      </Column>

      <Column background="surface" border="neutral-alpha-weak" radius="xl" padding="32" s={{ padding: '20' }} gap="16">
        <Column gap="8">
          <Heading as="h3" variant="heading-strong-l">
            Agenda por WhatsApp
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-medium">
            El mensaje ya incluye tu cupón. Elige la línea que prefieras:
          </Text>
        </Column>
        <Column background="page" border="neutral-alpha-medium" borderStyle="dashed" radius="m" padding="12">
          <Text variant="body-default-xs" onBackground="neutral-medium">
            «{MADRE_COUPON_WHATSAPP_MESSAGE}»
          </Text>
        </Column>
        <Column gap="12">
          {PROMO_WHATSAPP_LINES.map((line) => (
            <Button
              key={line.id}
              href={whatsappHref(line.waE164, MADRE_COUPON_WHATSAPP_MESSAGE)}
              fillWidth
              size="l"
              prefixIcon="whatsapp"
              label={`WhatsApp ${line.label} · ${line.displayNational}`}
            />
          ))}
        </Column>
      </Column>

      <Column background="accent-alpha-weak" border="accent-alpha-medium" radius="xl" padding="24" gap="8">
        <Text variant="heading-strong-s" onBackground="accent-strong">
          Próximas promos
        </Text>
        <Text variant="body-default-s" onBackground="neutral-medium">
          Seguiremos sumando campañas y fechas especiales en esta misma página.
        </Text>
      </Column>
    </Column>
  )
}

const PromosPage = () => {
  const featured = promos.filter((p) => p.featured)
  const couponCode = featured[0]?.couponCode

  return (
    <Column as="main" fillWidth horizontal="center" overflow="hidden">
      <Background
        position="absolute"
        top="0"
        left="0"
        fill
        pointerEvents="none"
        gradient={{
          display: true,
          colorStart: 'accent-alpha-medium',
          colorEnd: 'static-transparent',
          x: 50,
          y: 0,
          width: 200,
          height: 100,
          opacity: 50,
        }}
      />

      <Column
        zIndex={1}
        fillWidth
        maxWidth="l"
        paddingX="24"
        paddingTop="104"
        paddingBottom="80"
        gap="40"
      >
        <Column gap="32" horizontal="center">
          <Button href="/" variant="tertiary" size="s" prefixIcon="arrowLeft" label="Volver al inicio" />
          <SectionHeader
            titleAs="h1"
            eyebrow="Edición limitada"
            title="Promos que"
            titleAccent="enamoran"
            description="Cupones, combos y fechas especiales. Escríbenos por WhatsApp con el mensaje listo y menciona tu cupón para aplicar descuentos."
          />
        </Column>

        <RevealFx translateY="8" fillWidth>
          <PromosNoticeBanner />
        </RevealFx>

        <Row gap="32" vertical="start" m={{ direction: 'column' }}>
          <Column flex={7} gap="32" fillWidth>
            {featured.map((promo, index) => (
              <RevealFx key={promo.id} delay={index * 0.1} translateY="16" fillWidth>
                <PromoCard promo={promo} />
              </RevealFx>
            ))}
          </Column>
          <Column flex={5} fillWidth>
            <RevealFx delay={0.1} translateY="16" fillWidth>
              <CouponAside couponCode={couponCode} />
            </RevealFx>
          </Column>
        </Row>

        <RaffleSection />
      </Column>
    </Column>
  )
}

export default PromosPage
