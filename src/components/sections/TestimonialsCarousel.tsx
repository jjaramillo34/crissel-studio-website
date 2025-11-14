import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Valeria Torres',
    role: 'Cliente extensión volumen',
    quote:
      'La asesoría fue súper personalizada. Pasaron dos semanas y mis pestañas siguen perfectas. ¡Me siento lista todos los días!',
    rating: 5,
  },
  {
    name: 'Camila López',
    role: 'Cliente maquillaje social',
    quote:
      'Cris entendió el estilo que buscaba para mi matrimonio civil. Uso de productos impecable y maquillaje que duró toda la noche.',
    rating: 5,
  },
  {
    name: 'Andrea Herrera',
    role: 'Cliente laminado de cejas',
    quote:
      'El proceso fue súper cómodo y me explicaron cada paso. Mis cejas lucen definidas sin maquillarme todos los días.',
    rating: 5,
  },
]

const TestimonialsCarousel = () => {
  const prefersReducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const currentTestimonial = testimonials[index]

  useEffect(() => {
    if (prefersReducedMotion) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 6500)
    return () => clearInterval(timer)
  }, [prefersReducedMotion])

  const ratingStars = useMemo(() => Array.from({ length: 5 }), [])

  const goNext = () => setIndex((prev) => (prev + 1) % testimonials.length)
  const goPrev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, ease: 'easeOut' }}
            className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#E57373]/20 bg-white/90 px-5 py-2 text-sm font-medium text-[#E57373] shadow-sm"
          >
            Testimonios Crissel Studio
          </motion.div>
          <motion.h2
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="text-4xl font-bold text-[#E57373]"
          >
            Lo que dicen nuestras clientas
          </motion.h2>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-pink-100 bg-gradient-to-r from-[#FCE4EC]/70 to-white p-8 shadow-xl">
          <motion.button
            type="button"
            onClick={goPrev}
            whileTap={{ scale: 0.95 }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/60 bg-white/80 p-2 text-[#E57373] shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>

          <motion.button
            type="button"
            onClick={goNext}
            whileTap={{ scale: 0.95 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/60 bg-white/80 p-2 text-[#E57373] shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>

          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentTestimonial.name}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: prefersReducedMotion ? 0.3 : 0.5, ease: 'easeOut' }}
              className="mx-auto max-w-3xl text-center"
            >
              <Quote className="mx-auto h-10 w-10 text-[#E57373]/60" aria-hidden="true" />
              <p className="mt-6 text-lg text-gray-700">“{currentTestimonial.quote}”</p>
              <div className="mt-6 flex items-center justify-center gap-4 text-sm font-semibold text-gray-800">
                <span>{currentTestimonial.name}</span>
                <span className="text-[#E57373]">|</span>
                <span>{currentTestimonial.role}</span>
              </div>
              <div className="mt-4 flex justify-center gap-1 text-[#E57373]">
                {ratingStars.map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className={`h-5 w-5 ${starIndex < currentTestimonial.rating ? 'fill-current' : 'stroke-current text-[#E57373]/40'}`}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsCarousel
