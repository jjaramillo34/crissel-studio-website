'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { SectionHeader } from './SectionHeader'

const highlights = [
  {
    title: 'Kit Lash Lover',
    description: 'Sérum fortalecedor + cepillo duo + protector de sueño. Ideal para mantener tus extensiones impecables.',
  },
  {
    title: 'Skin Prep Glow',
    description: 'Rutina previa de skincare con exfoliante enzimático y mist calmante para maximizar el maquillaje profesional.',
  },
  {
    title: 'Cejas Pro Finish',
    description: 'Combo de gel nutritivo, lápiz de precisión y mini spoolie para retocar tu diseño en casa.',
  },
]

const ProductsTeaser = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="section-brand py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-rose-200/70 bg-gradient-to-br from-[#FDECF6]/90 via-white to-[#F8BBD9]/45 p-10 shadow-xl shadow-rose-100/35">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, ease: 'easeOut' }}
              className="space-y-6"
            >
              <SectionHeader
                eyebrow="Favoritos del estudio"
                title="Productos que potencian tus servicios"
                description="Descubre accesorios, tratamientos y kits que recomendamos después de cada experiencia. Están listos en el estudio y también puedes solicitarlos online."
                align="start"
                className="mb-6"
              />

              <Link
                href="/productos"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#E57373] transition-colors duration-300 hover:text-[#c84d4d]"
              >
                Ver todos los servicios & productos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>

            <motion.ul
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="space-y-4"
            >
              {highlights.map((item) => (
                <li key={item.title} className="rounded-2xl border border-white/80 bg-white/90 p-5 shadow-sm">
                  <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#E57373]">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    NUEVO FAVORITO
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-gray-800">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductsTeaser
