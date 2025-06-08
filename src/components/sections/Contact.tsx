import { motion } from 'framer-motion'
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form
    setFormData({ name: '', email: '', message: '', subject: 'commission' })
    setIsSubmitting(false)
    
    // Show success message (in real app, you'd handle this properly)
    alert('¡Mensaje enviado! Te responderemos pronto 💕')
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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-pink-50 to-white">
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
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-gray-800 font-medium">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl border-2 border-pink-100 focus:border-[#E57373] outline-none transition-colors bg-white/80 backdrop-blur-sm"
                    placeholder="Tu nombre completo"
                  />
                </motion.div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-gray-800 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl border-2 border-pink-100 focus:border-[#E57373] outline-none transition-colors bg-white/80 backdrop-blur-sm"
                    placeholder="tu@email.com"
                  />
                </motion.div>
              </div>

              <motion.div
                whileFocus={{ scale: 1.01 }}
                className="space-y-2"
              >
                <label className="text-gray-800 font-medium">Asunto</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-pink-100 focus:border-[#E57373] outline-none transition-colors bg-white/80 backdrop-blur-sm"
                >
                  <option value="appointment">Reserva de Cita</option>
                  <option value="makeup">Consulta Maquillaje</option>
                  <option value="eyebrows">Consulta Cejas</option>
                  <option value="lashes">Consulta Pestañas</option>
                  <option value="other">Otro</option>
                </select>
              </motion.div>

              <motion.div
                whileFocus={{ scale: 1.01 }}
                className="space-y-2"
              >
                <label className="text-gray-800 font-medium">Mensaje</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-pink-100 focus:border-[#E57373] outline-none transition-colors bg-white/80 backdrop-blur-sm resize-none"
                  placeholder="Cuéntanos sobre el servicio que necesitas o cualquier consulta..."
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 bg-gradient-to-r from-[#E57373] to-[#F8BBD9] text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-start space-x-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-pink-100"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-[#E57373] to-[#F8BBD9] rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{info.title}</h4>
                      <p className="text-[#E57373] font-medium">{info.info}</p>
                      <p className="text-gray-600 text-sm">{info.description}</p>
                    </div>
                  </motion.div>
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
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-pink-100 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center`}>
                      <social.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 group-hover:text-[#E57373] transition-colors">
                        {social.name}
                      </h4>
                      <p className="text-gray-600 text-sm">{social.description}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-[#E57373]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
