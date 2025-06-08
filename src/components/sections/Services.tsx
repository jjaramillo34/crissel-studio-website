import { motion } from 'framer-motion'
import { Eye, Sparkles, Clock, Star, Heart, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const Services = () => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Nuestros <span className="text-[#E57373]">Servicios</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#E57373] to-[#F8BBD9] rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Servicios profesionales de belleza especializados en realzar el poder de tu mirada.
            Técnicas expertas para pestañas, cejas y maquillaje.
          </p>
        </motion.div>

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
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative group"
            >
              {/* Popular badge */}
              {service.popular && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                  className="absolute -top-3 -right-3 z-10 bg-gradient-to-r from-crissel-pink to-crissel-purple text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1"
                >
                  <Star className="w-4 h-4" />
                  <span>Popular</span>
                </motion.div>
              )}

              <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-white to-pink-50 border-2 border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-[#E57373]/50">
                {/* Icon and header */}
                <div className="flex items-start space-x-4 mb-6">
                  <motion.div
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-2xl">{service.emoji}</span>
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{service.title}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2 text-[#E57373]">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">{service.duration}</span>
                      </div>
                      <div className="text-lg font-bold text-[#E57373]">
                        {service.price}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * featureIndex }}
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`block w-full py-3 rounded-full bg-gradient-to-r ${service.color} text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-center`}
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#E57373] to-[#F8BBD9] text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Reservar Cita
              </motion.a>
              <Link to="/productos">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-8 py-4 border-2 border-[#E57373] text-[#E57373] rounded-full font-semibold text-lg hover:bg-[#E57373] hover:text-white transition-all duration-300"
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
