import { motion, useReducedMotion } from 'framer-motion'
import { ClipboardList, Brush, Sparkles, HeartHandshake } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { cn } from '@/lib/utils'

const steps = [
  {
    icon: ClipboardList,
    title: 'Consulta Inspiracional',
    description: 'Analizamos tus rasgos, estilo de vida y objetivos de belleza para definir el servicio ideal.',
  },
  {
    icon: Brush,
    title: 'Diseño Personalizado',
    description: 'Creamos un mapa facial y seleccionamos técnicas, materiales y tonos exclusivos para ti.',
  },
  {
    icon: Sparkles,
    title: 'Aplicación Experta',
    description: 'Ejecución precisa con productos certificados, cuidando cada detalle y tu comodidad.',
  },
  {
    icon: HeartHandshake,
    title: 'Cuidado & Seguimiento',
    description: 'Entrega de guía de mantenimiento, recomendaciones de productos y control opcional.',
  },
]

const ProcessTimeline = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#FDECF6] to-pink-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Nuestro método"
          title="Te acompañamos en cada etapa de la experiencia"
          description="Desde la primera consulta hasta el seguimiento post servicio, vivimos contigo una experiencia boutique basada en técnica, calidez y transparencia."
        />

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#E57373]/40 to-transparent md:block" aria-hidden="true" />
          <div className="space-y-12">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0
              const containerClasses = cn(
                'relative flex flex-col items-center gap-4 md:flex-row',
                isEven ? 'md:items-start md:text-left' : 'md:flex-row-reverse md:items-end md:text-right'
              )

              return (
                <motion.div
                  key={step.title}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={prefersReducedMotion ? { duration: 0.4 } : { duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
                  className={containerClasses}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#E57373]/40 bg-white shadow-md">
                    <step.icon className="h-7 w-7 text-[#E57373]" aria-hidden="true" />
                  </div>
                  <div className={cn('max-w-lg space-y-3', isEven ? 'md:text-left' : 'md:text-right')}>
                    <h3 className="text-2xl font-bold text-gray-800">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessTimeline
