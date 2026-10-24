'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Icon } from '@once-ui-system/core'
import { SectionHeader } from './SectionHeader'

const credentials = [
  { icon: 'eye', label: 'Especialistas en mirada, cejas y uñas' },
  { icon: 'shieldCheck', label: 'Productos profesionales certificados' },
  { icon: 'chat', label: 'Consulta personalizada en cada cita' },
]

/** Clients served, shown on the floating stat card (in thousands) */
const HAPPY_CLIENTS_K = 1.5

/**
 * Counts from 0 to `target` once the element scrolls into view.
 * Shows the final value immediately when already on screen or with reduced motion.
 */
const useCountUp = (target: number, durationMs = 1600) => {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(target)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return

    setValue(0)
    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / durationMs, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(target * eased)
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    })
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target, durationMs])

  return { ref, value }
}

/** Circular "CRISSEL STUDIO ✦ BY CRIS PESTAÑAS ✦ AMBATO ✦" badge; rotates slowly */
const RotatingBadge = () => (
  <div className="crissel-about__badge" aria-hidden>
    <svg viewBox="0 0 120 120" className="crissel-about__badge-ring">
      <defs>
        <path id="crissel-about-circle" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
      </defs>
      <text>
        <textPath href="#crissel-about-circle" textLength="285" lengthAdjust="spacing">
          CRISSEL STUDIO ✦ BY CRIS PESTAÑAS ✦ AMBATO ✦
        </textPath>
      </text>
    </svg>
    <span className="crissel-about__badge-center">✦</span>
  </div>
)

const About = () => {
  const { ref: statRef, value } = useCountUp(HAPPY_CLIENTS_K)

  return (
    <section id="sobre-nosotros" className="crissel-section crissel-section--blush">
      <div className="crissel-section__inner">
        <article className="crissel-about">
          <div className="crissel-about__collage">
            <div className="crissel-about__frame">
              <Image
                src="/assets/team/team1.jpg"
                alt="Equipo de Crissel Studio"
                fill
                sizes="(max-width: 900px) 80vw, 40vw"
                className="object-cover"
              />
            </div>
            <RotatingBadge />
            <div ref={statRef} className="crissel-about__stat">
              <span className="crissel-about__stat-value font-display">
                +{value.toFixed(1)}K
              </span>
              <span className="crissel-about__stat-label">clientas felices en Ambato</span>
            </div>
          </div>

          <div className="crissel-about__copy">
            <SectionHeader
              align="start"
              size="compact"
              eyebrow="Sobre nosotras"
              title="Crissel Studio."
              titleAccent="Tu mirada, en buenas manos"
              titleEnd="."
              description="By Cris Pestañas · Ambato"
            />

            <p className="crissel-treatment__desc">
              Somos un estudio de belleza en el Centro Comercial La Galería. Cada tratamiento
              comienza escuchándote: qué buscas, cómo es tu día a día y qué resultado se siente
              natural en ti. Trabajamos con técnicas actuales y productos de calidad, sin promesas
              vacías.
            </p>

            <ul className="crissel-about__chips">
              {credentials.map((item) => (
                <li key={item.label} className="crissel-about__chip">
                  <span className="crissel-about__chip-icon">
                    <Icon name={item.icon} size="s" />
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>

            <div className="crissel-about__actions">
              <Button href="https://bit.ly/crisselstudio" label="Reservar cita" prefixIcon="calendar" />
              <Link href="/galeria" className="crissel-treatment__link">
                Ver galería →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default About
