import { motion, useReducedMotion } from 'framer-motion'
import { ClipboardList, Brush, Sparkles, HeartHandshake } from 'lucide-react'

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
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, ease: 'easeOut' }}
            className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#E57373]/20 bg-white/80 px-5 py-2 text-sm font-medium text-[#E57373] shadow-sm"
          >
            Proceso paso a paso
          </motion.div>
          <motion.h2
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="text-4xl font-bold text-[#E57373]"
          >
            Así cuidamos cada detalle de tu experience
          </motion.h2>
          <p className="mt-4 text-gray-600">
            Nuestra metodología combina técnica, calidad y calidez para que cada visita sea memorable desde la reserva hasta el postservicio.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#E57373]/40 to-transparent md:block" aria-hidden="true" />
          <div className="space-y-12">
            {steps.map((step, index) => {
              const alignment = index % 2 === 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'
              return (
                <motion.div
                  key={step.title}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={prefersReducedMotion ? { duration: 0.4 } : { duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
                  className={`relative flex flex-col items-center gap-4 md:flex-row ${alignment}`}
                >
                  <div className={`order-2 md:order-${index % 2 === 0 ? '2' : '1'} max-w-lg`}> 
                    <h3 className="text-2xl font-bold text-gray-800">{step.title}</h3>
                    <p className="mt-2 text-gray-600">{step.description}</p>
                  </div>
                  <div className="order-1 flex h-16 w-16 items-center justify-center rounded-full border border-[#E57373]/40 bg-white shadow-md">
                    <step.icon className="h-7 w-7 text-[#E57373]" aria-hidden="true" />
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
