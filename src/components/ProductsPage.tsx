'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Eye, Crown, Heart, Sparkles, Clock, Star, ArrowLeft, Calendar, Phone, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'
import { SectionHeader } from './sections/SectionHeader'
import { Seo } from './Seo'

// Use public folder paths for service images
const extensionesImage = '/assets/gallery/maquillaje-fantasia-10.jpg'
const planchadoImage = '/assets/gallery/maquillaje-fantasia-5.jpg'
const depilacionImage = '/assets/gallery/maquillaje-fantasia-4.jpg'
const maquillajeImage = '/assets/gallery/maquillaje-fantasia-9.jpg'
const extensionesBenefitsImage = '/assets/gallery/maquillaje-fantasia-3.jpg'
const extensionesDetailsImage = '/assets/gallery/maquillaje-fantasia-6.jpg'

const ProductsPage = () => {
  const prefersReducedMotion = useReducedMotion()

  const services = [
    {
      id: 'extensiones',
      title: 'Extensiones de Pestañas',
      subtitle: 'By Crissel',
      icon: Eye,
      mainImage: extensionesImage,
      benefitsImage: extensionesBenefitsImage,
      detailsImage: extensionesDetailsImage,
      description: 'Servicio diseñado para vernos perfectas desde el momento de despertar, al salir de la ducha y cuando vamos a una piscina. Logramos un efecto de volumen y mucho más largas, logramos reajustar la forma de tus ojos, protegemos tus pestañas naturales, no afectan los ojos, y no causan irritación.',
      duration: 'Tiempo de duración de 8 meses a 1 año',
      serviceTime: 'Tiempo de servicio de 2 horas a 2:30',
      prices: [
        { name: 'Efecto Rimel', price: '$30.00', description: 'Look natural y elegante' },
        { name: 'Efecto Híbrido', price: '$40.00', description: 'Combinación perfecta' },
        { name: 'Efecto Volumen', price: '$45.00', description: 'Máximo impacto y volumen' }
      ],
      benefits: [
        'ADIÓS!!! rimel',
        'Disfruta de la piscina',
        'Perfecta desde que despiertas',
        'Ahorras tiempo en las mañanas'
      ],
      color: 'from-[#E57373] to-[#F8BBD9]'
    },
    {
      id: 'planchado',
      title: 'Planchado de Cejas',
      subtitle: 'Perfección Natural',
      icon: Crown,
      mainImage: planchadoImage,
      description: 'Técnica profesional que logra cejas perfectas con apariencia completa, ideal para cejas escasas.',
      benefits: [
        'Cejas peinadas',
        'Cejas perfectas',
        'Apariencia completa',
        'Ideal para cejas escasas'
      ],
      price: 'Consultar precio',
      color: 'from-[#F8BBD9] to-[#FCE4EC]'
    },
    {
      id: 'depilacion',
      title: 'Depilación con Hilo',
      subtitle: 'Precisión Perfecta',
      icon: Sparkles,
      mainImage: depilacionImage,
      description: 'Técnica de depilación exacta que cuida la elasticidad de tu piel con mayor tiempo de duración.',
      benefits: [
        'Cejas perfectas',
        'Depilación exacta',
        'Mayor tiempo de duración',
        'Cuida la elasticidad de tu piel'
      ],
      price: 'Consultar precio',
      color: 'from-[#FCE4EC] to-[#F8BBD9]'
    },
    {
      id: 'maquillaje',
      title: 'Maquillaje Social',
      subtitle: 'Elegancia y Estilo',
      icon: Heart,
      mainImage: maquillajeImage,
      description: 'Maquillaje profesional para eventos sociales que resalta tu belleza natural.',
      benefits: [
        'Mímate',
        'Deslumbra con tu llegada',
        'Fotografías perfectas',
        'Alimenta tu autoestima'
      ],
      price: 'Consultar precio',
      color: 'from-[#F8BBD9] to-[#E57373]'
    }
  ]

  const containerVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.4 }
        }
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            staggerChildren: 0.2,
            duration: 0.4,
            ease: 'easeOut'
          }
        }
      }

  const itemVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.4 }
        }
      }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: 'easeOut' }
        }
      }

  return (
    <>
      <Seo
        title="Servicios y productos Crissel Studio"
        description="Descubre extensiones de pestañas, laminado de cejas, maquillaje social y paquetes exclusivos diseñados por nuestro equipo en Ambato."
        type="article"
      />
      <div className="section-brand relative min-h-screen overflow-hidden pt-20">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[#F8BBD9]/30 blur-3xl"
          animate={
            prefersReducedMotion
              ? { opacity: 0.4 }
              : { opacity: [0.25, 0.6, 0.25], scale: [1, 1.08, 1] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 14, repeat: Infinity, ease: 'easeInOut' }
          }
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-32 right-16 h-64 w-64 rounded-full bg-[#E57373]/20 blur-3xl"
          animate={
            prefersReducedMotion
              ? { opacity: 0.35 }
              : { opacity: [0.3, 0.55, 0.3], scale: [0.95, 1.1, 0.95] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }
          }
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-16">
          {/* Header */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <div className="mb-8 flex justify-center sm:justify-start">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-2xl border border-rose-200/80 bg-white/90 px-4 py-2.5 text-sm font-medium text-[#c45c5c] shadow-sm backdrop-blur-sm transition-all hover:border-[#E57373]/50 hover:bg-white"
              >
                <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
                Volver al inicio
              </Link>
            </div>
            <SectionHeader
              titleAs="h1"
              titleClassName="text-4xl sm:text-5xl lg:text-[2.85rem] max-w-4xl mx-auto leading-[1.15]"
              eyebrow="Catálogo"
              title={
                <>
                  Nuestros{' '}
                  <span className="bg-gradient-to-r from-[#c45c5c] via-[#E57373] to-rose-400 bg-clip-text text-transparent">
                    productos & servicios
                  </span>
                </>
              }
              description="Extensiones de pestañas, cejas, depilación con hilo y maquillaje social — todo con el mismo estándar profesional de Crissel Studio en Ambato."
              align="center"
              className="mb-0"
            />
          </motion.div>

          {/* Services */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-24"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Content */}
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="flex flex-wrap items-center gap-4 mb-6">
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
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${service.color} shadow-md shadow-rose-200/35`}
                    >
                      <service.icon className="h-8 w-8 text-white" aria-hidden="true" />
                    </motion.div>
                    
                    <div>
                      <h2 className="font-display text-3xl font-semibold tracking-tight text-neutral-900 lg:text-4xl">
                        {service.title}
                      </h2>
                      <p className="text-lg font-medium text-[#c45c5c]">{service.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-base leading-relaxed text-neutral-600 sm:text-lg">
                    {service.description}
                  </p>

                  {/* Service Details */}
                  {service.duration && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="w-5 h-5 text-[#E57373]" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-5 h-5 text-[#E57373]" />
                        <span>{service.serviceTime}</span>
                      </div>
                    </div>
                  )}

                  {/* Pricing */}
                  {service.prices ? (
                    <div className="space-y-4">
                      <h3 className="font-display text-2xl font-semibold text-neutral-900 mb-4">Precios</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {service.prices.map((price, priceIndex) => (
                          <motion.div
                            key={priceIndex}
                            whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -5 }}
                            className="rounded-2xl border border-rose-200/70 bg-white/95 p-6 shadow-md shadow-rose-100/25 backdrop-blur-sm transition-all hover:border-rose-200 hover:shadow-lg"
                          >
                            <h4 className="mb-2 text-lg font-semibold text-neutral-900">{price.name}</h4>
                            <p className="text-3xl font-bold text-[#E57373] mb-2">{price.price}</p>
                            <p className="text-gray-600 text-sm">{price.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-rose-200/80 bg-gradient-to-r from-[#E57373]/12 to-[#F8BBD9]/25 p-6 shadow-sm">
                      <p className="text-2xl font-bold text-[#E57373]">{service.price}</p>
                    </div>
                  )}

                  {/* Benefits */}
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-neutral-900 mb-4">Beneficios</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.benefits.map((benefit, benefitIndex) => (
                        <motion.div
                          key={benefitIndex}
                          initial={{ opacity: 0, ...(prefersReducedMotion ? {} : { x: -20 }) }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{ delay: 0.1 * benefitIndex, duration: 0.4, ease: 'easeOut' }}
                          className="flex items-center space-x-3 rounded-2xl border border-rose-100/80 bg-white/85 p-3 backdrop-blur-sm"
                        >
                          <Star className="w-5 h-5 text-[#E57373] flex-shrink-0" />
                          <span className="font-medium text-neutral-700">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.a
                    href="https://bit.ly/crisselstudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r ${service.color} px-8 py-4 text-lg font-semibold text-white shadow-md shadow-rose-200/40 transition-all hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]`}
                    aria-label={`Reservar ${service.title}`}
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Reservar {service.title}</span>
                  </motion.a>
                </div>

                {/* Images */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <motion.div
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                    className="relative overflow-hidden rounded-2xl border border-rose-200/50 shadow-[0_28px_60px_-28px_rgba(229,115,115,0.35)] ring-1 ring-rose-100/50"
                  >
                    <img 
                      src={service.mainImage}
                      alt={service.title}
                      className="w-full h-80 lg:h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </motion.div>

                  {/* Additional Images */}
                  {service.benefitsImage && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <motion.div
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                        className="overflow-hidden rounded-2xl border border-rose-100/60 shadow-md"
                      >
                        <img 
                          src={service.benefitsImage}
                          alt={`${service.title} Benefits`}
                          className="w-full h-48 object-cover"
                        />
                      </motion.div>
                      {service.detailsImage && (
                        <motion.div
                          whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                          className="overflow-hidden rounded-2xl border border-rose-100/60 shadow-md"
                        >
                          <img 
                            src={service.detailsImage}
                            alt={`${service.title} Details`}
                            className="w-full h-48 object-cover"
                          />
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0.5 } : { delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            className="mt-20 rounded-2xl border border-rose-200/80 bg-gradient-to-br from-[#E57373]/10 via-white to-[#F8BBD9]/20 p-8 text-center shadow-md shadow-rose-100/30 sm:p-12"
          >
            <h2 className="font-display mb-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              ¿Lista para tu transformación?
            </h2>
            <p className="mb-10 text-lg text-neutral-600 max-w-2xl mx-auto">
              Contáctanos para agendar tu cita y descubrir el poder de realzar tu mirada
            </p>

            <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
              <div className="rounded-2xl border border-rose-100/90 bg-white/90 px-4 py-5 text-center shadow-sm">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E57373] to-[#F8BBD9] text-white shadow-sm">
                  <Phone className="h-5 w-5" aria-hidden />
                </div>
                <p className="font-semibold text-neutral-900">0995059403</p>
                <p className="font-semibold text-neutral-900">0992950683</p>
              </div>
              <div className="rounded-2xl border border-rose-100/90 bg-white/90 px-4 py-5 text-center shadow-sm">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E57373] to-[#F8BBD9] text-white shadow-sm">
                  <Mail className="h-5 w-5" aria-hidden />
                </div>
                <p className="break-all font-semibold text-neutral-900 text-sm sm:text-base">
                  crisseleon1990@gmail.com
                </p>
              </div>
              <div className="rounded-2xl border border-rose-100/90 bg-white/90 px-4 py-5 text-center shadow-sm">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E57373] to-[#F8BBD9] text-white shadow-sm">
                  <MapPin className="h-5 w-5" aria-hidden />
                </div>
                <p className="font-semibold text-neutral-900">Calle Mera entre Bolívar y Rocafuerte</p>
                <p className="text-sm text-neutral-600">Ambato, Ecuador</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.a
                href="https://bit.ly/crisselstudio"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block rounded-2xl bg-gradient-to-r from-[#E57373] to-[#F8BBD9] px-8 py-4 text-lg font-semibold text-white shadow-md shadow-rose-200/40 transition-all hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]"
                aria-label="Reservar cita online"
              >
                Reservar cita online
              </motion.a>
              <motion.a
                href="https://instagram.com/crisselstudio.ec"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block rounded-2xl border-2 border-[#E57373] bg-white/80 px-8 py-4 text-lg font-semibold text-[#c45c5c] transition-all hover:bg-[#E57373] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]"
                aria-label="Abrir Instagram de Crissel Studio"
              >
                Síguenos en Instagram
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default ProductsPage