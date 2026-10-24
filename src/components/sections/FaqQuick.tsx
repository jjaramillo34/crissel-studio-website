'use client'

import { useState } from 'react'
import { Button } from '@once-ui-system/core'
import { SectionHeader } from './SectionHeader'

const faqItems = [
  {
    question: '¿Cuánto duran las extensiones de pestañas?',
    answer:
      'Con el cuidado recomendado duran entre 4 y 6 semanas antes del retoque. Entregamos guía de mantenimiento para el hogar.',
  },
  {
    question: '¿Qué productos se utilizan?',
    answer:
      'Trabajamos con marcas profesionales y fórmulas pensadas para el salón. Ajustamos según sensibilidad de piel y tipo de pestaña.',
  },
  {
    question: '¿También hacen uñas?',
    answer:
      'Sí. Ofrecemos manicure y pedicure, esmaltado semipermanente, uñas acrílicas y polygel, y nail art. Escríbenos por WhatsApp para consultar precios y disponibilidad.',
    isNew: true,
  },
  {
    question: '¿Qué pasa si es mi primera vez?',
    answer:
      'Empezamos con una conversación breve para resolver dudas, evaluar tus rasgos y recomendar el servicio ideal para tu estilo.',
  },
  {
    question: '¿Cómo reservo y cuál es la política de cancelación?',
    answer:
      'Puedes reservar online o por WhatsApp. Pedimos aviso con 24 horas para reagendar y conservar tu depósito aplicable.',
  },
]

/** schema.org FAQPage so search engines can show these Q&As as rich results */
const faqJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}).replace(/</g, '\\u003c')

const FaqQuick = () => {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="crissel-section crissel-section--soft">
      <div className="crissel-section__inner">
        <div className="crissel-faq">
          <aside className="crissel-faq__intro">
            <SectionHeader
              align="start"
              size="compact"
              eyebrow="Preguntas frecuentes"
              title="Lo que más nos"
              titleAccent="preguntan"
              description="Queremos que te sientas segura antes, durante y después de tu visita."
            />

            <div className="crissel-faq__help">
              <p className="crissel-faq__help-title font-display">¿No encuentras tu respuesta?</p>
              <p className="crissel-faq__help-text">
                Escríbenos por WhatsApp y te ayudamos a elegir el servicio ideal para ti.
              </p>
              <Button
                href="https://wa.me/593992950683"
                prefixIcon="whatsapp"
                label="Escríbenos"
              />
            </div>
          </aside>

          <div className="crissel-faq__list">
            {faqItems.map((item, index) => {
              const isOpen = open === index
              return (
                <div key={item.question} className={`crissel-faq__item${isOpen ? ' is-open' : ''}`}>
                  <h3 className="crissel-faq__heading">
                    <button
                      type="button"
                      id={`faq-q-${index}`}
                      className="crissel-faq__question"
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${index}`}
                      onClick={() => setOpen(isOpen ? null : index)}
                    >
                      <span className="crissel-faq__number">{String(index + 1).padStart(2, '0')}</span>
                      <span className="crissel-faq__text font-display">{item.question}</span>
                      {item.isNew && <span className="crissel-tx__badge">Nuevo</span>}
                      <span className="crissel-faq__toggle" aria-hidden />
                    </button>
                  </h3>
                  <div
                    id={`faq-a-${index}`}
                    role="region"
                    aria-labelledby={`faq-q-${index}`}
                    className="crissel-faq__answer"
                    inert={!isOpen}
                  >
                    <div className="crissel-faq__answer-inner">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
    </section>
  )
}

export default FaqQuick
