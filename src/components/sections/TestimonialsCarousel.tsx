'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { payload } from '@/lib/payload'

interface TestimonialData {
  id: string
  name: string
  content: string
  rating: number
  service?: string
  isFeatured?: boolean
  order?: number
}

const TestimonialsCarousel = () => {
  const prefersReducedMotion = useReducedMotion()
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setLoading(true)
        // Get featured testimonials first, or all if none are featured
        const response = await payload.getTestimonials({ limit: 10 })
        const allTestimonials = response.docs
        
        // Prioritize featured testimonials
        const featuredTestimonials = allTestimonials.filter((t) => t.isFeatured)
        const testimonialsToShow = featuredTestimonials.length > 0 
          ? featuredTestimonials 
          : allTestimonials
        
        setTestimonials(testimonialsToShow)
        setError(null)
      } catch (err: any) {
        console.error('Error fetching testimonials:', err)
        setError('No se pudieron cargar los testimonios')
        setTestimonials([])
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const currentTestimonial = testimonials[index] || null

  useEffect(() => {
    if (prefersReducedMotion || testimonials.length === 0) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 6500)
    return () => clearInterval(timer)
  }, [prefersReducedMotion, testimonials.length])

  const ratingStars = useMemo(() => Array.from({ length: 5 }), [])

  const goNext = () => {
    if (testimonials.length === 0) return
    setIndex((prev) => (prev + 1) % testimonials.length)
  }
  
  const goPrev = () => {
    if (testimonials.length === 0) return
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  if (loading) {
    return (
      <section className="section-brand-alt relative py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Testimonios crissel studio"
            title="Opiniones que inspiran confianza"
            description="Cada experiencia se adapta a tus necesidades. Ellas ya lo vivieron y comparten cómo transformó su rutina."
          />
          <div className="h-64 animate-pulse rounded-3xl bg-gray-200" />
        </div>
      </section>
    )
  }

  if (error || testimonials.length === 0) {
    return (
      <section className="section-brand-alt relative py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Testimonios crissel studio"
            title="Opiniones que inspiran confianza"
            description="Cada experiencia se adapta a tus necesidades. Ellas ya lo vivieron y comparten cómo transformó su rutina."
          />
          <div className="text-center py-12">
            <p className="text-gray-500">
              {error || 'No hay testimonios disponibles en este momento.'}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-brand-alt relative py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Testimonios crissel studio"
          title="Opiniones que inspiran confianza"
          description="Cada experiencia se adapta a tus necesidades. Ellas ya lo vivieron y comparten cómo transformó su rutina."
        />

        <div className="relative overflow-hidden rounded-2xl border border-rose-200/70 bg-gradient-to-r from-[#FCE4EC]/80 via-white to-rose-50/40 p-8 shadow-xl shadow-rose-100/30">
          {testimonials.length > 1 && (
            <>
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
            </>
          )}

          <AnimatePresence initial={false} mode="wait">
            {currentTestimonial && (
              <motion.div
                key={currentTestimonial.id}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: prefersReducedMotion ? 0.3 : 0.5, ease: [0.4, 0, 0.2, 1] as const }}
                className="mx-auto max-w-3xl text-center"
              >
                <Quote className="mx-auto h-10 w-10 text-[#E57373]/60" aria-hidden="true" />
                <p className="mt-6 text-lg text-gray-700">"{currentTestimonial.content}"</p>
                <div className="mt-6 flex items-center justify-center gap-4 text-sm font-semibold text-gray-800">
                  <span>{currentTestimonial.name}</span>
                  {currentTestimonial.service && (
                    <>
                      <span className="text-[#E57373]">|</span>
                      <span>{currentTestimonial.service}</span>
                    </>
                  )}
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
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsCarousel
