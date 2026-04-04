'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles, Gift, Heart } from 'lucide-react'
import { SectionHeader } from './SectionHeader'

const packages = [
  {
    name: 'Mirada Completa',
    price: '$70',
    description: 'Extensiones híbridas + diseño de cejas con laminado y tinte.',
    bonus: 'Incluye cepillo de mantenimiento y guía personalizada.',
    gradient: 'from-[#E57373] to-[#F8BBD9]',
  },
  {
    name: 'Glow Events',
    price: '$90',
    description: 'Maquillaje social HD + peinado express + retoque de cejas.',
    bonus: 'Se entrega kit mini retoque para la noche del evento.',
    gradient: 'from-[#F8BBD9] to-[#FDECF6]',
  },
  {
    name: 'Lash Rehab',
    price: '$55',
    description: 'Lifting nutritivo + tratamiento fortalecedor + plan de home care.',
    bonus: 'Agenda seguimiento gratuito a los 15 días.',
    gradient: 'from-[#FDECF6] to-[#F8BBD9]',
  },
]

const FeaturedPackages = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="section-brand-alt py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Paquetes destacados"
          title="Bundles creados para consentirte"
          description="Elige combos listos para cada ocasión. Incluyen beneficios adicionales y recomendaciones exclusivas del estudio."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {packages.map((bundle, index) => (
            <motion.article
              key={bundle.name}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={prefersReducedMotion ? { duration: 0.4 } : { duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
              className="flex h-full flex-col rounded-2xl border border-rose-200/70 bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <div className={`rounded-t-2xl bg-gradient-to-r ${bundle.gradient} p-6 text-white shadow-inner`}>
                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em]">
                  {index === 0 ? <Sparkles className="h-5 w-5" /> : index === 1 ? <Gift className="h-5 w-5" /> : <Heart className="h-5 w-5" />}
                  Paquete #{index + 1}
                </div>
                <h3 className="mt-3 text-2xl font-bold">{bundle.name}</h3>
                <p className="mt-2 text-lg font-semibold">{bundle.price}</p>
              </div>
              <div className="flex flex-1 flex-col gap-6 p-6">
                <p className="text-gray-700">{bundle.description}</p>
                <div className="rounded-2xl bg-gradient-to-r from-[#E57373]/10 to-[#F8BBD9]/10 p-4 text-sm text-[#E57373]">
                  <strong>Bonus:</strong> {bundle.bonus}
                </div>
                <motion.a
                  href="https://wa.me/593992950683"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-auto inline-flex items-center justify-center rounded-2xl border-2 border-[#E57373] px-6 py-3 text-sm font-semibold text-[#c45c5c] transition-all duration-300 hover:bg-gradient-to-r hover:from-[#E57373] hover:to-[#F8BBD9] hover:text-white hover:border-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]"
                >
                  Consultar disponibilidad
                </motion.a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedPackages
