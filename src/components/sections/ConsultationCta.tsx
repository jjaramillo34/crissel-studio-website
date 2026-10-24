'use client'

import { useEffect, useRef, useState } from 'react'
import { Button, Icon, Row } from '@once-ui-system/core'
import { SectionHeader } from './SectionHeader'

const services = ['Pestañas', 'Cejas', 'Maquillaje', 'Uñas']

const steps = [
  {
    icon: 'chat',
    title: 'Escríbenos',
    text: 'Reserva en línea o escríbenos por WhatsApp y cuéntanos qué te gustaría lograr.',
  },
  {
    icon: 'sparkle',
    title: 'Te asesoramos',
    text: 'Evaluamos tus rasgos y tu estilo para recomendarte lo que de verdad te favorece.',
  },
  {
    icon: 'calendar',
    title: 'Disfruta tu cita',
    text: 'Trabajamos con calma y detalle, y te explicamos cómo cuidar tu resultado en casa.',
  },
]

/** Slanted scrolling strip of service names (decorative; services are listed elsewhere) */
const Ribbon = ({ tone }: { tone: 'coral' | 'blush' }) => {
  const words = [...services, ...services, ...services]
  return (
    <div className={`crissel-ribbon crissel-ribbon--${tone}`} aria-hidden>
      <div className="crissel-ribbon__track">
        {[...words, ...words].map((word, i) => (
          <span key={i} className="crissel-ribbon__item">
            {word}
            <span className="crissel-ribbon__spark">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/** Adds `is-inview` once the steps scroll into view so the connecting line draws in */
const useInView = <T extends HTMLElement>() => {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -20% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, inView }
}

const ConsultationCta = () => {
  const { ref, inView } = useInView<HTMLOListElement>()

  return (
    <section
      className="crissel-section crissel-section--blush crissel-section--clip crissel-consult"
      aria-labelledby="consulta-title"
    >
      <div className="crissel-consult__ribbons">
        <Ribbon tone="blush" />
        <Ribbon tone="coral" />
      </div>

      <div className="crissel-section__inner">
        <SectionHeader
          titleId="consulta-title"
          eyebrow="Cómo trabajamos"
          title="Asesoría"
          titleAccent="personal"
          description="Antes de recomendar, queremos entender qué buscas y qué es realista para ti."
        />

        <ol ref={ref} className={`crissel-steps${inView ? ' is-inview' : ''}`}>
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="crissel-steps__item"
              style={{ ['--i' as string]: index }}
            >
              <span className="crissel-steps__circle">
                <Icon name={step.icon} size="m" />
              </span>
              <span className="crissel-steps__label">Paso {index + 1}</span>
              <h3 className="crissel-steps__title font-display">{step.title}</h3>
              <p className="crissel-steps__text">{step.text}</p>
            </li>
          ))}
        </ol>

        <Row gap="12" horizontal="center" s={{ direction: 'column', fillWidth: true }}>
          <Button href="https://bit.ly/crisselstudio" label="Agendar consulta" prefixIcon="calendar" />
          <Button
            href="https://wa.me/593992950683"
            variant="secondary"
            label="WhatsApp"
            prefixIcon="whatsapp"
          />
        </Row>
      </div>
    </section>
  )
}

export default ConsultationCta
