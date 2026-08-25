'use client'

import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { Button, Column, Heading, Row, Text } from '@once-ui-system/core'

/** 6 photos: lashes | makeup | lash results — sides scroll up, center scrolls down */
const leftImages = [
  '/assets/gallery/hero/hero_r1.jpg',
  '/assets/gallery/hero/hero_r2.jpg',
]

const centerImages = [
  '/assets/gallery/hero/hero_c1.jpg',
  '/assets/gallery/hero/hero_c2.jpg',
]

const rightImages = [
  '/assets/gallery/hero/hero_l1.webp',
  '/assets/gallery/hero/hero_l2.webp',
]

function MarqueeColumn({
  images,
  direction,
  sizes,
  className = '',
  paused = false,
  eagerCount = 0,
}: {
  images: string[]
  direction: 'up' | 'down'
  sizes: string
  className?: string
  paused?: boolean
  /** How many images in the first loop load eagerly (for LCP). */
  eagerCount?: number
}) {
  const sequence = [...images, ...images]

  return (
    <div className={`crissel-marquee ${className}`} aria-hidden>
      <div
        className={[
          'crissel-marquee__track',
          direction === 'up' ? 'crissel-marquee__track--up' : 'crissel-marquee__track--down',
          paused ? 'is-paused' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {sequence.map((src, i) => {
          const isEager = i < eagerCount
          return (
            <div key={`${src}-${i}`} className="crissel-marquee__item">
              <Image
                src={src}
                alt=""
                fill
                sizes={sizes}
                priority={isEager}
                loading={isEager ? 'eager' : 'lazy'}
                className="object-cover"
              />
              <span className="crissel-marquee__tint" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Hero = () => {
  const prefersReducedMotion = useReducedMotion()
  const paused = Boolean(prefersReducedMotion)

  return (
    <section id="hero" className="crissel-hero crissel-hero--columns" aria-label="Inicio Crissel Studio">
      <div className="crissel-hero__grid">
        <div className="crissel-hero__col crissel-hero__col--side">
          <MarqueeColumn
            images={leftImages}
            direction="up"
            sizes="28vw"
            paused={paused}
            eagerCount={1}
          />
        </div>

        <div className="crissel-hero__col crissel-hero__col--center">
          <MarqueeColumn
            images={centerImages}
            direction="down"
            sizes="(max-width: 900px) 100vw, 44vw"
            paused={paused}
            eagerCount={1}
          />
          <div className="crissel-hero__center-wash" aria-hidden />

          <div className="crissel-hero__content">
            <Column gap="24" horizontal="center" align="center">
              <div className="crissel-hero__eyebrow-row">
                <span className="crissel-hero__rule" aria-hidden />
                <Text variant="label-default-s" className="crissel-hero__eyebrow">
                  Pestañas · Makeup · Crissel Studio
                </Text>
                <span className="crissel-hero__rule" aria-hidden />
              </div>

              <Heading
                as="h1"
                variant="display-strong-l"
                align="center"
                className="font-display crissel-hero__title"
              >
                Mirada y belleza <em className="crissel-hero__accent">en Ambato</em>
              </Heading>

              <Text
                variant="body-default-m"
                align="center"
                wrap="balance"
                className="crissel-hero__lede"
              >
                Extensiones de pestañas, maquillaje profesional y productos para tu mirada.
                Atención personalizada, con detalle en cada cita.
              </Text>

              <Row gap="12" s={{ direction: 'column', fillWidth: true }} horizontal="center">
                <Button
                  href="https://bit.ly/crisselstudio"
                  label="Reservar cita"
                  prefixIcon="calendar"
                />
                <Button
                  variant="secondary"
                  href="#servicios"
                  label="Ver tratamientos"
                  className="crissel-hero__cta-ghost"
                />
              </Row>
            </Column>
          </div>
        </div>

        <div className="crissel-hero__col crissel-hero__col--side">
          <MarqueeColumn
            images={rightImages}
            direction="up"
            sizes="28vw"
            paused={paused}
            className="crissel-marquee--slow"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
