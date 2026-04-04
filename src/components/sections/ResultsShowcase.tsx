'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { SectionHeader } from './SectionHeader'
// Use public folder paths for images
const results = [
  {
    title: 'Extensiones Volumen Signature',
    technique: 'Efecto volumen ruso con fibras premium',
    durability: 'Duración estimada: 6-8 semanas',
    care: 'Evitar aceites y cepillar suavemente cada mañana',
    before: '/assets/gallery/extensiones-pestanas-1.jpg',
    after: '/assets/gallery/extensiones-pestanas-3.jpg',
  },
  {
    title: 'Maquillaje Glam Nocturno',
    technique: 'Preparación de piel + shimmer studio personalizado',
    durability: 'Duración estimada: 12 horas con sellado profesional',
    care: 'Retirar con bálsamo suave y aplicar hidratante',
    before: '/assets/gallery/maquillaje-fantasia-2.jpg',
    after: '/assets/gallery/maquillaje-fantasia-9.jpg',
  },
  {
    title: 'Laminado de Cejas Luxe',
    technique: 'Moldeado lifting + tinte nutriente con keratina',
    durability: 'Duración estimada: 4-6 semanas',
    care: 'No mojar en 24h y aplicar sérum nutritivo 2 veces por semana',
    before: '/assets/gallery/planchado-cejas-1.jpg',
    after: '/assets/gallery/planchado-cejas-2.jpg',
  },
]

const ResultsShowcase = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="section-brand-alt relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Metamorfosis reales"
          title="Antes y después que cuentan historias"
          description="Nuestro equipo aplica técnicas avanzadas, planifica la durabilidad de cada servicio y comparte un plan de cuidado personalizado para que tu look se mantenga impecable."
        />

        <div className="grid gap-10 lg:grid-cols-3">
          {results.map((result, index) => (
            <motion.article
              key={result.title}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={prefersReducedMotion ? { duration: 0.4 } : { duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-rose-200/70 bg-white shadow-[0_20px_50px_-24px_rgba(229,115,115,0.25)]"
            >
              <div className="grid grid-cols-2">
                <figure className="relative">
                  <img
                    src={result.before}
                    alt={`${result.title} antes del servicio`}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    Antes
                  </span>
                </figure>
                <figure className="relative">
                  <img
                    src={result.after}
                    alt={`${result.title} después del servicio`}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-[#E57373] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    Después
                  </span>
                </figure>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6">
                <h3 className="text-xl font-bold text-gray-800">{result.title}</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <strong className="text-[#E57373]">Técnica:</strong> {result.technique}
                  </li>
                  <li>
                    <strong className="text-[#E57373]">Durabilidad:</strong> {result.durability}
                  </li>
                  <li>
                    <strong className="text-[#E57373]">Cuidados:</strong> {result.care}
                  </li>
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ResultsShowcase
