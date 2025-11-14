import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { Mail, MapPin, Instagram, Youtube, MessageCircle, Send, Heart, Star } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: 'commission'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const prefersReducedMotion = useReducedMotion()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatusMessage('')
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form
    setFormData({ name: '', email: '', message: '', subject: 'commission' })
    setIsSubmitting(false)
    
    // Provide accessible success feedback
    setStatusMessage('¡Mensaje enviado! Te responderemos pronto 💕')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/crisselstudio.ec',
      color: 'from-pink-400 to-purple-600',
      description: 'Síguenos para ver nuestro trabajo diario'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://wa.me/593123456789',
      color: 'from-green-400 to-green-600',
      description: 'Contáctanos directamente'
    },
    {
      name: 'Reservas Online',
      icon: Youtube,
      url: 'https://bit.ly/crisselstudio',
      color: 'from-purple-400 to-pink-600',
      description: 'Agenda tu cita fácilmente'
    }
  ]

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Ubicación',
      info: 'Centro Comercial La Galería',
      description: 'Mera entre Rocafuerte y Bolívar, Ambato, Ecuador'
    },
    {
      icon: Mail,
      title: 'Reservas Online',
      info: 'bit.ly/crisselstudio',
      description: 'Agenda tu cita fácilmente'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0, ...(prefersReducedMotion ? {} : { y: 24 }) },
    visible: {
      opacity: 1,
      ...(prefersReducedMotion ? {} : { y: 0 }),
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            staggerChildren: 0.2,
            duration: 0.6,
            ease: 'easeOut'
          }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, ...(prefersReducedMotion ? {} : { y: 30 }) },
    visible: {
      opacity: 1,
      ...(prefersReducedMotion ? {} : { y: 0 }),
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }
    }
  }

  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-pink-50 to-white relative overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute -top-24 -left-16 h-64 w-64 rounded-full bg-[#E57373]/10 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: [1, 1.15, 1],
                rotate: [0, 8, 0]
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut'
              }
        }
      />
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-32 -right-10 h-72 w-72 rounded-full bg-[#F8BBD9]/10 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: [1.1, 0.95, 1.1],
                rotate: [5, -5, 5]
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut'
              }
        }
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Ubicación y <span className="text-[#E57373]">Contacto</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#E57373] to-[#F8BBD9] rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visítanos en nuestro estudio en Ambato o agenda tu cita online. 
            ¡Estamos aquí para realzar el poder de tu mirada!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Contáctanos
              </h3>
              <p className="text-gray-600">
                Completa el formulario para consultas o usa nuestro sistema de reservas online
              </p>
            </motion.div>

            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="space-y-6"
              aria-describedby="contact-form-description"
              aria-busy={isSubmitting}
            >
              <p id="contact-form-description" className="sr-only">
                Formulario de contacto para enviar consultas o reservar servicios.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
                  className="space-y-2 rounded-2xl border-2 border-transparent focus-within:border-[#E57373] focus-within:shadow-lg transition-all bg-white/60 backdrop-blur-sm p-4"
                >
                  <label htmlFor="contact-name" className="text-gray-800 font-medium">
                    Nombre
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className="w-full px-4 py-3 rounded-xl border border-pink-100 focus:border-[#E57373] focus:outline-none transition-colors bg-white"
                    placeholder="Tu nombre completo"
                  />
                </motion.div>

                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
                  className="space-y-2 rounded-2xl border-2 border-transparent focus-within:border-[#E57373] focus-within:shadow-lg transition-all bg-white/60 backdrop-blur-sm p-4"
                >
                  <label htmlFor="contact-email" className="text-gray-800 font-medium">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="w-full px-4 py-3 rounded-xl border border-pink-100 focus:border-[#E57373] focus:outline-none transition-colors bg-white"
                    placeholder="tu@email.com"
                  />
                </motion.div>
              </div>

              <motion.div
                whileHover={prefersReducedMotion ? undefined : { scale: 1.005 }}
                className="space-y-2 rounded-2xl border-2 border-transparent focus-within:border-[#E57373] focus-within:shadow-lg transition-all bg-white/60 backdrop-blur-sm p-4"
              >
                <label htmlFor="contact-subject" className="text-gray-800 font-medium">
                  Asunto
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-pink-100 focus:border-[#E57373] focus:outline-none transition-colors bg-white"
                >
                  <option value="appointment">Reserva de Cita</option>
                  <option value="makeup">Consulta Maquillaje</option>
                  <option value="eyebrows">Consulta Cejas</option>
                  <option value="lashes">Consulta Pestañas</option>
                  <option value="other">Otro</option>
                </select>
              </motion.div>

              <motion.div
                whileHover={prefersReducedMotion ? undefined : { scale: 1.005 }}
                className="space-y-2 rounded-2xl border-2 border-transparent focus-within:border-[#E57373] focus-within:shadow-lg transition-all bg-white/60 backdrop-blur-sm p-4"
              >
                <label htmlFor="contact-message" className="text-gray-800 font-medium">
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-pink-100 focus:border-[#E57373] focus:outline-none transition-colors bg-white resize-none"
                  placeholder="Cuéntanos sobre el servicio que necesitas o cualquier consulta..."
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 bg-gradient-to-r from-[#E57373] to-[#F8BBD9] text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                aria-label="Enviar mensaje de contacto"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      aria-hidden="true"
                      animate={
                        prefersReducedMotion
                          ? { rotate: 0 }
                          : { rotate: 360 }
                      }
                      transition={
                        prefersReducedMotion
                          ? undefined
                          : { duration: 1, repeat: Infinity, ease: "linear" }
                      }
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar Mensaje</span>
                  </>
                )}
              </motion.button>
              <div
                role="status"
                aria-live="polite"
                className="min-h-[1.5rem] text-center text-sm font-medium text-[#E57373]"
              >
                {statusMessage}
              </div>
            </motion.form>
          </motion.div>

          {/* Contact info and social */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-8"
          >
            {/* Contact info */}
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Información de Contacto
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.article
                    key={index}
                    whileHover={
                      prefersReducedMotion ? undefined : { scale: 1.02, x: 5 }
                    }
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-pink-100 shadow transition-shadow hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]/70 focus-visible:shadow-lg"
                    aria-labelledby={`contact-info-title-${index}`}
                    aria-describedby={`contact-info-description-${index}`}
                    role="group"
                    tabIndex={0}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-[#E57373] to-[#F8BBD9] rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-white" aria-hidden="true" focusable="false" />
                    </div>
                    <div>
                      <h4 id={`contact-info-title-${index}`} className="font-semibold text-gray-800">
                        {info.title}
                      </h4>
                      <p className="text-[#E57373] font-medium">{info.info}</p>
                      <p id={`contact-info-description-${index}`} className="text-gray-600 text-sm">
                        {info.description}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>

            {/* Social media */}
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Síguenos en Redes
              </h3>
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={
                      prefersReducedMotion ? undefined : { scale: 1.05, x: 10 }
                    }
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-pink-100 hover:shadow-lg transition-all duration-300 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]"
                    aria-label={`Visitar ${social.name}`}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center`}>
                      <social.icon className="w-6 h-6 text-white" aria-hidden="true" focusable="false" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 group-hover:text-[#E57373] transition-colors">
                        {social.name}
                      </h4>
                      <p className="text-gray-600 text-sm">{social.description}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                      <svg className="w-5 h-5 text-[#E57373]" fill="none" stroke="currentColor" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Studio note */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-[#E57373]/10 to-[#F8BBD9]/10 rounded-3xl p-6 border border-pink-100"
            >
              <div className="flex items-start space-x-3 mb-4">
                <Heart className="w-6 h-6 text-[#E57373] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Nuestro Compromiso
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    "En Crissel Studio Ambato, cada cliente es especial. Nos comprometemos a 
                    realzar tu belleza natural con técnicas profesionales y productos de calidad."
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-[#E57373]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-sm ml-2">- Crissel Studio Team</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
