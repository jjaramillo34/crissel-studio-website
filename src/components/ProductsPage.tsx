import { motion, useReducedMotion } from 'framer-motion'
import { Eye, Crown, Heart, Sparkles, Clock, Star, ArrowLeft, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import ResultsShowcase from './sections/ResultsShowcase'
import { Seo } from './Seo'

// Import service images
import extensionesImage from '../assets/gallery/maquillaje-fantasia-10.jpg'
import planchadoImage from '../assets/gallery/maquillaje-fantasia-5.jpg'
import depilacionImage from '../assets/gallery/maquillaje-fantasia-4.jpg'
import maquillajeImage from '../assets/gallery/maquillaje-fantasia-9.jpg'
import extensionesBenefitsImage from '../assets/gallery/maquillaje-fantasia-3.jpg'
import extensionesDetailsImage from '../assets/gallery/maquillaje-fantasia-6.jpg'

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

  const containerVariants = {
    hidden: { opacity: 0, ...(prefersReducedMotion ? {} : { y: 24 }) },
    visible: {
      opacity: 1,
      ...(prefersReducedMotion ? {} : { y: 0 }),
      transition: prefersReducedMotion
        ? { duration: 0.4 }
        : {
            staggerChildren: 0.2,
            duration: 0.4,
            ease: 'easeOut'
          }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, ...(prefersReducedMotion ? {} : { y: 30 }) },
    visible: {
      opacity: 1,
      ...(prefersReducedMotion ? {} : { y: 0 }),
      transition: prefersReducedMotion ? { duration: 0.4 } : { duration: 0.6, ease: 'easeOut' }
    }
  }

  return (
    <>
      <Seo
        title="Servicios y productos Crissel Studio"
        description="Descubre extensiones de pestañas, laminado de cejas, maquillaje social y paquetes exclusivos diseñados por nuestro equipo en Ambato."
        type="article"
      />
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-[#FDECF1] pt-20">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <Link
                to="/"
                className="mr-8 inline-flex items-center gap-2 rounded-full border border-[#E57373]/30 bg-white/80 px-4 py-2 text-sm font-medium text-[#E57373] transition-colors duration-300 hover:border-[#E57373]/60 hover:bg-white"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Volver al Inicio</span>
              </Link>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-4">
              Nuestros <span className="text-[#E57373]">Productos</span>
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-[#E57373] to-[#F8BBD9] rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Descubre nuestros servicios profesionales de belleza diseñados para realzar tu mirada
              y destacar tu belleza natural con técnicas expertas.
            </p>
          </motion.div>

          {/* Services */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-20"
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
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${service.color} shadow-lg`}
                    >
                      <service.icon className="h-8 w-8 text-white" aria-hidden="true" />
                    </motion.div>
                    
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">{service.title}</h2>
                      <p className="text-[#E57373] text-lg font-medium">{service.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 text-base leading-relaxed sm:text-lg">
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
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Precios</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {service.prices.map((price, priceIndex) => (
                          <motion.div
                            key={priceIndex}
                            whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -5 }}
                            className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <h4 className="font-bold text-gray-800 text-lg mb-2">{price.name}</h4>
                            <p className="text-3xl font-bold text-[#E57373] mb-2">{price.price}</p>
                            <p className="text-gray-600 text-sm">{price.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-[#E57373]/10 to-[#F8BBD9]/10 border border-pink-100">
                      <p className="text-2xl font-bold text-[#E57373]">{service.price}</p>
                    </div>
                  )}

                  {/* Benefits */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Beneficios</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.benefits.map((benefit, benefitIndex) => (
                        <motion.div
                          key={benefitIndex}
                          initial={{ opacity: 0, ...(prefersReducedMotion ? {} : { x: -20 }) }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{ delay: 0.1 * benefitIndex, duration: 0.4, ease: 'easeOut' }}
                          className="flex items-center space-x-3 rounded-xl bg-white/60 p-3 backdrop-blur-sm"
                        >
                          <Star className="w-5 h-5 text-[#E57373] flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{benefit}</span>
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
                    className={`inline-flex items-center space-x-2 rounded-full bg-gradient-to-r ${service.color} px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]`}
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
                    className="relative overflow-hidden rounded-3xl shadow-2xl"
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
                        className="overflow-hidden rounded-2xl shadow-lg"
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
                          className="overflow-hidden rounded-2xl shadow-lg"
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
            className="text-center mt-20 rounded-3xl border border-pink-100 bg-gradient-to-r from-[#E57373]/10 to-[#F8BBD9]/10 p-12"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              ¿Lista para tu transformación?
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Contáctanos para agendar tu cita y descubrir el poder de realzar tu mirada
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#E57373] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-lg">📞</span>
                </div>
                <p className="font-semibold text-gray-800">0995059403</p>
                <p className="font-semibold text-gray-800">0992950683</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#E57373] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-lg">📧</span>
                </div>
                <p className="font-semibold text-gray-800">crisseleon1990@gmail.com</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#E57373] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-lg">📍</span>
                </div>
                <p className="font-semibold text-gray-800">Calle Mera entre Bolívar y Rocafuerte</p>
                <p className="text-gray-600">Ambato, Ecuador</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://bit.ly/crisselstudio"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block rounded-full bg-gradient-to-r from-[#E57373] to-[#F8BBD9] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]"
                aria-label="Reservar cita online"
              >
                Reservar Cita Online
              </motion.a>
              <motion.a
                href="https://instagram.com/crisselstudio.ec"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block rounded-full border-2 border-[#E57373] px-8 py-4 text-lg font-semibold text-[#E57373] transition-all duration-300 hover:bg-[#E57373] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]"
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