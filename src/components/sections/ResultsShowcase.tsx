import { motion, useReducedMotion } from 'framer-motion'
import beforeAfter1 from '../../assets/gallery/extensiones-pestanas-1.jpg'
import beforeAfter2 from '../../assets/gallery/extensiones-pestanas-3.jpg'
import makeupBefore from '../../assets/gallery/maquillaje-fantasia-2.jpg'
import makeupAfter from '../../assets/gallery/maquillaje-fantasia-9.jpg'
import browBefore from '../../assets/gallery/planchado-cejas-1.jpg'
import browAfter from '../../assets/gallery/planchado-cejas-2.jpg'

const results = [
  {
    title: 'Extensiones Volumen Signature',
    technique: 'Efecto volumen ruso con fibras premium',
    durability: 'Duración estimada: 6-8 semanas',
    care: 'Evitar aceites y cepillar suavemente cada mañana',
    before: beforeAfter1,
    after: beforeAfter2,
  },
  {
    title: 'Maquillaje Glam Nocturno',
    technique: 'Preparación de piel + shimmer studio personalizado',
    durability: 'Duración estimada: 12 horas con sellado profesional',
    care: 'Retirar con bálsamo suave y aplicar hidratante',
    before: makeupBefore,
    after: makeupAfter,
  },
  {
    title: 'Laminado de Cejas Luxe',
    technique: 'Moldeado lifting + tinte nutriente con keratina',
    durability: 'Duración estimada: 4-6 semanas',
    care: 'No mojar en 24h y aplicar sérum nutritivo 2 veces por semana',
    before: browBefore,
    after: browAfter,
  },
]

const ResultsShowcase = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-pink-50 to-[#FDECF1] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center max-w-2xl">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, ease: 'easeOut' }}
            className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#E57373]/20 bg-white/80 px-5 py-2 text-sm font-medium text-[#E57373] shadow-sm backdrop-blur"
          >
            Transformaciones reales
          </motion.div>
          <motion.h2
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="text-4xl font-bold text-[#E57373] sm:text-5xl"
          >
            Resultados Antes y Después
          </motion.h2>
          <p className="mt-4 text-gray-600">
            Cada look se diseña con técnicas avanzadas, enfoque en el cuidado posterior y mantenimiento pensado para tu rutina.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          {results.map((result, index) => (
            <motion.article
              key={result.title}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={prefersReducedMotion ? { duration: 0.4 } : { duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-lg"
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
