import { motion, useReducedMotion } from 'framer-motion'
import { Eye, Sparkles, Clock, Star, Heart, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeader } from './SectionHeader'

const Services = () => {
  const prefersReducedMotion = useReducedMotion()
  const services = [
    {
      icon: Eye,
      title: "Extensiones de Pestañas",
      price: "$30 - $45",
      description: "Mejora la curvatura, cantidad y grosor de tus pestañas naturales con nuestras técnicas profesionales.",
      features: ["Efecto Rimel ($30)", "Efecto Híbrido ($40)", "Efecto Volumen ($45)"],
      color: "from-[#E57373] to-[#F8BBD9]",
      emoji: "👁️",
      popular: true,
      duration: "2-3 horas"
    },
    {
      icon: Sparkles,
      title: "Diseño de Cejas",
      price: "$15 - $25",
      description: "Diseño personalizado según tu rostro. Realza tu mirada naturalmente con técnicas de depilación y perfilado profesional.",
      features: ["Planchado de Cejas", "Depilación con Hilo", "Microblading de Cejas"],
      color: "from-[#F8BBD9] to-[#FCE4EC]",
      emoji: "✨",
      duration: "1-2 horas"
    },
    {
      icon: Heart,
      title: "Maquillaje Profesional",
      price: "$25 - $50",
      description: "Maquillaje profesional para eventos especiales, transformaciones completas con técnicas especializadas.",
      features: ["Maquillaje Social", "Maquillaje de Fantasía", "Eventos Especiales"],
      color: "from-[#FCE4EC] to-[#F8BBD9]",
      emoji: "💄",
      duration: "1-1.5 horas"
    },
    {
      icon: Zap,
      title: "Lifting de Pestañas",
      price: "$20 - $30",
      description: "Curvatura natural sin extensiones. Tratamiento no invasivo que realza tus pestañas naturales.",
      features: ["Levantamiento Natural", "Sin Mantenimiento", "Duración 6-8 semanas"],
      color: "from-[#F8BBD9] to-[#E57373]",
      emoji: "⚡",
      duration: "1 hora"
    }
  ]

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
            ease: 'easeOut'
          }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, ...(prefersReducedMotion ? {} : { y: 50 }) },
    visible: {
      opacity: 1,
      ...(prefersReducedMotion ? {} : { y: 0 }),
      transition: prefersReducedMotion ? { duration: 0.4 } : { duration: 0.6, ease: 'easeOut' }
    }
  }

  return (
    <section id="servicios" className="relative py-20 overflow-hidden bg-gradient-to-br from-white via-pink-50 to-[#FDECF1]">
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
              className="rounded-2xl border border-[#F8BBD9]/60 bg-white/80 p-4 shadow-sm backdrop-blur text-left"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-[#E57373] mb-1">{stat.value}</p>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{stat.label}</h3>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Services grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={
                prefersReducedMotion ? undefined : { scale: 1.02, y: -5 }
              }
              className="relative group"
              aria-labelledby={`service-title-${index}`}
              aria-describedby={`service-description-${index}`}
            >
              {/* Popular badge */}
              {service.popular && (
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

              <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-white to-pink-50 border-2 border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-[#E57373]/50">
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
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-2xl">{service.emoji}</span>
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 id={`service-title-${index}`} className="text-2xl font-bold text-gray-800 mb-2">{service.title}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2 text-[#E57373]">
                        <Clock className="w-4 h-4" aria-hidden="true" />
                        <span className="text-sm font-medium">{service.duration}</span>
                      </div>
                      <div className="text-lg font-bold text-[#E57373]">
                        {service.price}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p id={`service-description-${index}`} className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8" role="list">
                  {service.features.map((feature, featureIndex) => (
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

                {/* CTA Button */}
                <Link to="/productos">
                  <motion.div
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`block w-full py-3 rounded-full bg-gradient-to-r ${service.color} text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-center`}
                    aria-label={`Ver detalles del servicio ${service.title}`}
                  >
                    Ver Detalles
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

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
          <div className="bg-gradient-to-r from-[#E57373]/10 to-[#F8BBD9]/10 rounded-3xl p-8 border border-pink-100">
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
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#E57373] to-[#F8BBD9] text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label="Reservar una cita en Crissel Studio"
              >
                Reservar Cita
              </motion.a>
              <Link to="/productos">
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-8 py-4 border-2 border-[#E57373] text-[#E57373] rounded-full font-semibold text-lg hover:bg-[#E57373] hover:text-white transition-all duration-300"
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
