import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, Star, MessageCircle } from 'lucide-react'

const reviews = [
  { name: 'Julia M.', text: 'Servicio impecable, súper delicadas con el trabajo y el asesoramiento.', rating: 5 },
  { name: 'Sofía L.', text: 'Los looks duran muchísimo. Ambiente relajante y productos de excelente calidad.', rating: 5 },
]

const LocationReviews = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center max-w-2xl">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, ease: 'easeOut' }}
            className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#E57373]/20 bg-white/90 px-5 py-2 text-sm font-medium text-[#E57373] shadow-sm"
          >
            Estamos en el corazón de Ambato
          </motion.div>
          <motion.h2
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="text-4xl font-bold text-[#E57373]"
          >
            Mapa interactivo + reseñas
          </motion.h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={prefersReducedMotion ? { duration: 0.4 } : { duration: 0.6, ease: 'easeOut' }}
            className="overflow-hidden rounded-3xl border border-pink-100 shadow-lg"
          >
            <iframe
              title="Ubicación Crissel Studio"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d998.2456134498702!2d-78.6172263!3d-1.2523192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d38153a7f47a1b%3A0xede20b87c18fd8f!2sCentro%20Comercial%20La%20Galer%C3%ADa!5e0!3m2!1ses-419!2sec!4v1732552800000!5m2!1ses-419!2sec"
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
              className="rounded-3xl border border-pink-100 bg-gradient-to-br from-[#F8BBD9]/20 to-white p-6"
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
                  className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm"
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
