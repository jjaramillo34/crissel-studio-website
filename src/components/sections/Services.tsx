'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Eye, Sparkles, Clock, Star, Heart, Zap } from 'lucide-react'
import Link from 'next/link'
import { SectionHeader } from './SectionHeader'
import { payload } from '@/lib/payload'

interface ServiceData {
  id: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  price?: number
  category: string
  duration?: string
  features?: Array<{ feature: string }>
  isFeatured?: boolean
}

// Map category to visual properties
const getCategoryStyle = (category: string) => {
  const styles: Record<string, { emoji: string; color: string }> = {
    'extensiones-pestanas': {
      emoji: '👁️',
      color: 'from-[#E57373] to-[#F8BBD9]',
    },
    'diseno-cejas': {
      emoji: '✨',
      color: 'from-[#F8BBD9] to-[#FCE4EC]',
    },
    'maquillaje': {
      emoji: '💄',
      color: 'from-[#FCE4EC] to-[#F8BBD9]',
    },
    'microblading': {
      emoji: '✏️',
      color: 'from-[#F8BBD9] to-[#E57373]',
    },
    'planchado-cejas': {
      emoji: '⚡',
      color: 'from-[#F8BBD9] to-[#E57373]',
    },
  }
  return styles[category] || { emoji: '✨', color: 'from-[#F8BBD9] to-[#FCE4EC]' }
}

const formatPrice = (price?: number): string => {
  if (!price) return 'Consultar precio'
  return `$${price}`
}

const Services = () => {
  const prefersReducedMotion = useReducedMotion()
  const [services, setServices] = useState<ServiceData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true)
        // Get featured services first, or all services if none are featured
        const response = await payload.getServices({ limit: 10 })
        const allServices = response.docs
        
        // Prioritize featured services, but show all if none are featured
        const featuredServices = allServices.filter((s) => s.isFeatured)
        const servicesToShow = featuredServices.length > 0 ? featuredServices : allServices
        
        setServices(servicesToShow.slice(0, 4)) // Limit to 4 for the grid
        setError(null)
      } catch (err: any) {
        console.error('Error fetching services:', err)
        setError('No se pudieron cargar los servicios')
        setServices([])
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const highlightStats = [
    {
      label: 'Consultas personalizadas',
      value: '100%',
      description: 'Diagnóstico previo en cada servicio'
    },
    {
      label: 'Productos profesionales',
      value: 'Dermatológicos',
      description: 'Calidad certificada para tu piel'
    },
    {
      label: 'Atención flexible',
      value: 'Agenda express',
      description: 'Horarios adaptados a tu rutina'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0, ...(prefersReducedMotion ? {} : { y: 24 }) },
    visible: {
      opacity: 1,
      ...(prefersReducedMotion ? {} : { y: 0 }),
      transition: prefersReducedMotion
        ? { duration: 0.4 }
        : {
            staggerChildren: 0.2,
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1] as const
          }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, ...(prefersReducedMotion ? {} : { y: 50 }) },
    visible: {
      opacity: 1,
      ...(prefersReducedMotion ? {} : { y: 0 }),
      transition: prefersReducedMotion ? { duration: 0.4 } : { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }
    }
  }

  return (
    <section id="servicios" className="section-brand relative py-20 overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-[#F8BBD9]/40 blur-3xl"
        animate={
          prefersReducedMotion
            ? { opacity: 0.6 }
            : { opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1], rotate: [0, 8, 0] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 12, repeat: Infinity, ease: 'easeInOut' }
        }
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-16 h-80 w-80 rounded-full bg-[#E57373]/10 blur-3xl"
        animate={
          prefersReducedMotion
            ? { opacity: 0.4 }
            : { opacity: [0.3, 0.6, 0.3], scale: [1.05, 0.95, 1.05], rotate: [0, -6, 0] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 14, repeat: Infinity, ease: 'easeInOut' }
        }
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Servicios estrella"
          title="Experiencias de belleza hechas para ti"
          description="Realzamos tu mirada con tratamientos personalizados, técnicas certificadas y seguimiento cercano. Descubre el servicio que encaja con tu estilo."
        />

        <div className="mx-auto mb-14 grid gap-4 sm:grid-cols-3 max-w-5xl">
          {highlightStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              className="rounded-2xl border border-rose-200/70 bg-white/90 p-4 shadow-sm backdrop-blur text-left"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-[#E57373] mb-1">{stat.value}</p>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{stat.label}</h3>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Services grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-96 animate-pulse rounded-3xl bg-gray-200" />
            ))}
          </div>
        ) : error || services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {error || 'No hay servicios disponibles en este momento.'}
            </p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {services.map((service, index) => {
              const categoryStyle = getCategoryStyle(service.category)
              const features = service.features?.map((f) => f.feature) || []
              const description = service.shortDescription || service.description

              return (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  whileHover={
                    prefersReducedMotion ? undefined : { scale: 1.02, y: -5 }
                  }
                  className="relative group"
                  aria-labelledby={`service-title-${index}`}
                  aria-describedby={`service-description-${index}`}
                >
                  {/* Popular badge */}
                  {service.isFeatured && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={prefersReducedMotion ? { duration: 0.3 } : { delay: 0.5 + index * 0.2, duration: 0.4, ease: 'easeOut' }}
                      className="absolute -top-3 -right-3 z-10 bg-gradient-to-r from-crissel-pink to-crissel-purple text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1"
                    >
                      <Star className="w-4 h-4" aria-hidden="true" />
                      <span>Popular</span>
                    </motion.div>
                  )}

                  <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-white to-rose-50/50 border border-rose-200/70 shadow-md hover:shadow-xl transition-all duration-300 group-hover:border-[#E57373]/45">
                    {/* Icon and header */}
                    <div className="flex items-start space-x-4 mb-6">
                      <motion.div
                        animate={
                          prefersReducedMotion
                            ? { scale: 1 }
                            : { rotate: [0, 5, 0, -5, 0] }
                        }
                        transition={
                          prefersReducedMotion
                            ? undefined
                            : { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }
                        }
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${categoryStyle.color} flex items-center justify-center shadow-lg`}
                      >
                        <span className="text-2xl">{categoryStyle.emoji}</span>
                      </motion.div>
                      
                      <div className="flex-1">
                        <h3 id={`service-title-${index}`} className="text-2xl font-bold text-gray-800 mb-2">{service.name}</h3>
                        <div className="flex items-center justify-between mb-2">
                          {service.duration && (
                            <div className="flex items-center space-x-2 text-[#E57373]">
                              <Clock className="w-4 h-4" aria-hidden="true" />
                              <span className="text-sm font-medium">{service.duration}</span>
                            </div>
                          )}
                          <div className="text-lg font-bold text-[#E57373]">
                            {formatPrice(service.price)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p id={`service-description-${index}`} className="text-gray-600 mb-6 leading-relaxed">
                      {description}
                    </p>

                    {/* Features */}
                    {features.length > 0 && (
                      <ul className="space-y-3 mb-8" role="list">
                        {features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            initial={{ opacity: 0, ...(prefersReducedMotion ? {} : { x: -20 }) }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={prefersReducedMotion ? { duration: 0.3 } : { delay: 0.1 * featureIndex, duration: 0.4, ease: 'easeOut' }}
                            className="flex items-center space-x-3"
                          >
                            <div className="w-2 h-2 rounded-full bg-[#E57373]"></div>
                            <span className="text-gray-700">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    )}

                    {/* CTA Button */}
                    <Link href={`/productos#${String(service.slug || '')}`}>
                      <motion.div
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`block w-full py-3.5 rounded-2xl bg-gradient-to-r ${categoryStyle.color} text-white font-semibold shadow-md shadow-rose-200/40 hover:shadow-lg transition-all duration-300 text-center`}
                        aria-label={`Ver detalles del servicio ${service.name}`}
                      >
                        Ver Detalles
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={
            prefersReducedMotion
              ? { duration: 0.6 }
              : { delay: 0.6, duration: 0.8, ease: 'easeOut' }
          }
          className="text-center mt-16"
        >
          <div className="rounded-2xl border border-rose-200/80 bg-gradient-to-r from-[#E57373]/12 to-[#F8BBD9]/25 p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              ¿Lista para realzar el poder de tu mirada?
            </h3>
            <p className="text-gray-600 mb-6">
              Reserva tu cita y descubre nuestros servicios profesionales de belleza
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://bit.ly/crisselstudio"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#E57373] to-[#F8BBD9] text-white rounded-2xl font-semibold text-lg shadow-md shadow-rose-200/40 hover:shadow-lg transition-all duration-300"
                aria-label="Reservar una cita en Crissel Studio"
              >
                Reservar Cita
              </motion.a>
              <Link href="/productos">
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-8 py-4 border-2 border-[#E57373] text-[#c45c5c] bg-white/80 rounded-2xl font-semibold text-lg hover:bg-[#E57373] hover:text-white transition-all duration-300"
                  aria-label="Ver productos disponibles"
                >
                  Ver Productos
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
