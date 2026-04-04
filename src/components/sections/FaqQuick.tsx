'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { SectionHeader } from './SectionHeader'

const faqItems = [
  {
    question: '¿Cuánto duran las extensiones de pestañas?',
    answer:
      'Con el cuidado recomendado duran entre 4 y 6 semanas antes del retoque. Entregamos guía de home care y cepillo de mantenimiento.',
  },
  {
    question: '¿Qué productos se utilizan?',
    answer:
      'Trabajamos con marcas hipoalergénicas y certificadas. Ajustamos fórmulas según sensibilidad de piel y tipo de pestaña.',
  },
  {
    question: '¿Qué pasa si nunca me he hecho un servicio similar?',
    answer:
      'Agendamos una mini consulta gratuita para resolver dudas, evaluar tus rasgos y recomendar el servicio ideal para tu estilo.',
  },
  {
    question: '¿Cómo reservo y cuál es la política de cancelación?',
    answer:
      'Puedes reservar online o por WhatsApp. Requerimos aviso con 24h para reagendar y mantener tu depósito aplicable.',
  },
]

const FaqQuick = () => {
  const prefersReducedMotion = useReducedMotion()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => setOpenIndex((prev) => (prev === index ? null : index))

  return (
    <section className="section-brand-alt py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FAQ rápido"
          title="Respuestas a tus dudas más comunes"
          description="Queremos que te sientas segura antes, durante y después de tu visita. Aquí resolvemos las preguntas que más recibimos."
        />

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={item.question} className="overflow-hidden rounded-2xl border border-rose-200/70 bg-white/95 shadow-sm hover:border-rose-200 transition-colors">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 text-gray-800">
                    <HelpCircle className="h-5 w-5 text-[#E57373]" aria-hidden="true" />
                    <span className="font-semibold">{item.question}</span>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-[#E57373]" aria-hidden="true" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false} mode="wait">
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0.2 : 0.3, ease: 'easeOut' }}
                    >
                      <p className="px-6 pb-5 text-sm text-gray-600 sm:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FaqQuick
