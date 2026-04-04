'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, Star, MessageCircle } from 'lucide-react'
import { SectionHeader } from './SectionHeader'

const reviews = [
  { name: 'Julia M.', text: 'Servicio impecable, súper delicadas con el trabajo y el asesoramiento.', rating: 5 },
  { name: 'Sofía L.', text: 'Los looks duran muchísimo. Ambiente relajante y productos de excelente calidad.', rating: 5 },
]

const LocationReviews = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="section-brand-alt py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Visítanos"
          title="Ubicación precisa y reseñas reales"
          description="Nos encuentras en el Centro Comercial La Galería, un espacio seguro y céntrico en Ambato. Mira cómo nos califican nuestras clientas."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={prefersReducedMotion ? { duration: 0.4 } : { duration: 0.6, ease: 'easeOut' }}
            className="overflow-hidden rounded-2xl border border-rose-200/70 shadow-lg shadow-rose-100/25"
          >
            <iframe
              title="Ubicación Crissel Studio"
              src="https://www.google.com/maps/embed?pb=!4v1731613494000!6m8!1m7!1sjuRQZVoaQ-9Iv1kgEQ6n6A!2m2!1d-1.2406276!2d-78.6290431!3f90!4f0!5f0.7820865974627469"
              className="h-[420px] w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={prefersReducedMotion ? { duration: 0.4 } : { duration: 0.5, ease: 'easeOut' }}
              className="rounded-2xl border border-rose-200/70 bg-gradient-to-br from-[#F8BBD9]/30 to-white p-6"
            >
              <div className="flex items-center gap-3 text-[#E57373]">
                <MapPin className="h-6 w-6" aria-hidden="true" />
                <p className="text-lg font-semibold">Centro Comercial La Galería, Mera entre Rocafuerte y Bolívar</p>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Estamos a pocos minutos de los principales puntos de la ciudad. Estacionamiento y acceso seguro.
              </p>
            </motion.div>

            <div className="space-y-4">
              {reviews.map((review, index) => (
                <motion.blockquote
                  key={review.name}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={prefersReducedMotion ? { duration: 0.3 } : { duration: 0.4, ease: 'easeOut', delay: index * 0.1 }}
                  className="rounded-2xl border border-rose-100/90 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3 text-[#E57373]">
                    <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                    <span className="text-sm font-semibold">5.0 en Google Reviews</span>
                  </div>
                  <p className="mt-3 text-gray-700">“{review.text}”</p>
                  <footer className="mt-2 flex items-center gap-2 text-sm font-semibold text-gray-600">
                    <MessageCircle className="h-4 w-4 text-[#E57373]" aria-hidden="true" />
                    {review.name}
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocationReviews
