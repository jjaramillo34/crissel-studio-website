'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Button, Row, SmartLink } from '@once-ui-system/core'

/** Real work photos only (no flyers with text) — they fill a tilted, scrolling 3D wall */
const photos = [
  '/assets/gallery/hero/hero_c1.jpg',
  '/assets/gallery/hero/hero_l1.webp',
  '/assets/gallery/maquillaje-fantasia-catrina-2.jpg',
  '/assets/gallery/hero/hero_r1.jpg',
  '/assets/gallery/hero/hero_c2.jpg',
  '/assets/gallery/maquillaje-fantasia-mariposa.jpg',
  '/assets/gallery/hero/hero_l2.webp',
  '/assets/gallery/hero/hero_r2.jpg',
  // the center column (photos 8–11) mixes in the new nail work
  '/assets/gallery/unas-1.jpg',
  '/assets/gallery/maquillaje-fantasia-gato-2.jpg',
  '/assets/gallery/unas-3.jpg',
  '/assets/gallery/maquillaje-fantasia-2.jpg',
]

const COLUMNS = 5
const PER_COLUMN = 4

/** Each column takes the next 4 photos, so neighboring columns never show the same photo */
const columns = Array.from({ length: COLUMNS }, (_, col) =>
  Array.from({ length: PER_COLUMN }, (_, i) => photos[(col * PER_COLUMN + i) % photos.length]),
)

/** Accent word under the title cycles through what the studio does */
const accents = ['Ambato', 'pestañas', 'cejas', 'maquillaje', 'uñas']
const ACCENT_INTERVAL_MS = 2600

const headlineWords = ['Mirada', 'y', 'belleza']

const useCyclingIndex = (length: number, intervalMs: number) => {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % length), intervalMs)
    return () => window.clearInterval(id)
  }, [length, intervalMs])
  return index
}

/** Tilts the wall slightly toward the mouse (fine pointers only, never with reduced motion) */
const useMouseTilt = <T extends HTMLElement>() => {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const allowed = window.matchMedia(
      '(pointer: fine) and (prefers-reduced-motion: no-preference)',
    ).matches
    if (!allowed) return

    let frame = 0
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--mx', x.toFixed(3))
        el.style.setProperty('--my', y.toFixed(3))
      })
    }
    el.addEventListener('pointermove', onMove)
    return () => {
      el.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])
  return ref
}

const Hero = () => {
  const accentIndex = useCyclingIndex(accents.length, ACCENT_INTERVAL_MS)
  const sectionRef = useMouseTilt<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="crissel-hero2"
      aria-label="Inicio Crissel Studio"
    >
      <div className="crissel-wall" aria-hidden>
        <div className="crissel-wall__plane">
          {columns.map((images, col) => (
            <div
              key={col}
              className="crissel-wall__col"
              data-direction={col % 2 === 0 ? 'up' : 'down'}
              style={{ ['--speed' as string]: `${46 + col * 7}s` }}
            >
              <div className="crissel-wall__track">
                {[...images, ...images].map((src, i) => {
                  // Any photo can be on screen at load (the tilt and the moving loop bring both
                  // copies into view), so all load eagerly — the repeat is the same URL, so it
                  // costs nothing extra. The most central ones get fetched first.
                  const central = i < 2 && col >= 1 && col <= 3
                  return (
                    <div key={`${src}-${i}`} className="crissel-wall__item">
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="(max-width: 700px) 40vw, 22vw"
                        loading="eager"
                        fetchPriority={central ? 'high' : 'auto'}
                        className="object-cover"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="crissel-hero2__glow" aria-hidden />

      <div className="crissel-hero2__content">
        <p className="crissel-hero2__eyebrow">
          <span aria-hidden>✦</span> Pestañas · Makeup · Uñas <span aria-hidden>✦</span>
        </p>

        <h1 className="crissel-hero2__title font-display">
          <span className="crissel-hero2__line">
            {headlineWords.map((word, i) => (
              <span
                key={word}
                className="crissel-hero2__word"
                style={{ ['--i' as string]: i }}
                aria-hidden
              >
                {word}
              </span>
            ))}
          </span>
          <span className="crissel-hero2__line" aria-hidden>
            <span className="crissel-hero2__word" style={{ ['--i' as string]: 3 }}>
              en
            </span>
            <span className="crissel-hero2__accent-slot">
              <em
                key={accents[accentIndex]}
                className={`crissel-hero2__accent${accentIndex === 0 ? ' is-initial' : ''}`}
              >
                {accents[accentIndex]}
              </em>
            </span>
          </span>
          {/* What screen readers and search engines get: a stable, complete headline */}
          <span className="crissel-sr-only">
            Mirada y belleza en Ambato: pestañas, cejas, maquillaje y uñas
          </span>
        </h1>

        <p className="crissel-hero2__lede">
          Extensiones de pestañas, maquillaje profesional, uñas y productos para tu mirada.
          Atención personalizada, con detalle en cada cita.
        </p>

        <Row gap="12" horizontal="center" s={{ direction: 'column', fillWidth: true }} className="crissel-hero2__ctas">
          <Button href="https://bit.ly/crisselstudio" size="l" label="Reservar cita" prefixIcon="calendar" />
          <Button
            variant="secondary"
            size="l"
            href="#servicios"
            label="Ver tratamientos"
            className="crissel-hero__cta-ghost"
          />
        </Row>
      </div>

      <SmartLink unstyled href="#sobre-nosotros" className="crissel-hero2__scroll">
        <span>Desliza</span>
        <span className="crissel-hero2__scroll-line" aria-hidden />
      </SmartLink>
    </section>
  )
}

export default Hero
