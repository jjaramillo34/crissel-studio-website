'use client'

import { Accordion, Column, Text } from '@once-ui-system/core'
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

const FaqQuick = () => {
  return (
    <section id="faq" className="crissel-section crissel-section--soft">
      <div className="crissel-section__inner">
        <SectionHeader
          eyebrow="Preguntas frecuentes"
          title="Lo que más nos"
          titleAccent="preguntan"
          description="Queremos que te sientas segura antes, durante y después de tu visita."
        />

        <Column fillWidth maxWidth="m" gap="8">
          {faqItems.map((item) => (
            <Accordion key={item.question} title={item.question}>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {item.answer}
              </Text>
            </Accordion>
          ))}
        </Column>
      </div>
    </section>
  )
}

export default FaqQuick
