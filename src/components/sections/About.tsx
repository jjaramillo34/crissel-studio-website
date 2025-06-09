import { motion } from 'framer-motion'
import { Heart, Eye, Star, Award, Sparkles } from 'lucide-react'
import heroImage from '../../assets/images/hero.jpg'

const About = () => {
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

  const highlights = [
    {
      icon: Heart,
      title: "Pasión por la Belleza",
      description: "Dedicados a realzar tu belleza natural con técnicas profesionales y cuidado personalizado"
    },
    {
      icon: Eye,
      title: "Especialistas en Mirada",
      description: "Expertos en extensiones de pestañas, diseño de cejas y lifting para realzar tu mirada"
    },
    {
      icon: Star,
      title: "Resultados Profesionales",
      description: "Transformaciones espectaculares que destacan la belleza única de cada cliente"
    },
    {
      icon: Award,
      title: "Experiencia Comprobada",
      description: "Años de experiencia y clientes satisfechas respaldan nuestro trabajo profesional"
    }
  ]

  return (
    <section id="sobre-nosotros" className="py-20 bg-gradient-to-br from-pink-50 to-white relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-20 -right-20 w-64 h-64 bg-[#E57373]/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [5, 0, 5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#F8BBD9]/5 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left side - Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <motion.h2 
                className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                Sobre <motion.span 
                  className="text-[#E57373] inline-block"
                  animate={{ 
                    textShadow: [
                      "0 0 0px rgba(229, 115, 115, 0)",
                      "0 0 10px rgba(229, 115, 115, 0.5)",
                      "0 0 0px rgba(229, 115, 115, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >Nosotros</motion.span>
              </motion.h2>
              <motion.div 
                className="w-20 h-1 bg-gradient-to-r from-[#E57373] to-[#F8BBD9] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "5rem" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6 text-lg text-gray-700">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                En Crissel Studio somos especialistas en realzar la belleza natural de cada cliente. 
                Nuestro enfoque profesional se centra en técnicas avanzadas de extensiones de pestañas, 
                diseño de cejas y maquillaje que destacan el poder de tu mirada.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Con años de experiencia en el mundo de la belleza, ofrecemos servicios personalizados 
                que transforman y realzan tus facciones naturales. Cada tratamiento está diseñado 
                para brindarte confianza y elegancia en tu día a día.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Ubicados en el corazón de Ambato, Ecuador, nuestro estudio combina técnicas profesionales 
                con un ambiente acogedor donde cada cliente recibe atención personalizada y resultados 
                que superan las expectativas.
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(229, 115, 115, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-[#E57373] text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-[#E57373] to-[#F8BBD9] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10 flex items-center gap-2">
                  Ver Nuestros Servicios
                  <Sparkles className="w-4 h-4" />
                </span>
              </motion.button>
              <a
                href="/galeria"
                className="mt-4 inline-flex items-center gap-2 px-8 py-3 border-2 border-[#F8BBD9] text-[#E57373] rounded-full font-semibold text-lg hover:bg-[#F8BBD9] hover:text-white transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>
                Ver Galería
              </a>
            </motion.div>
          </div>

          {/* Right side - Visual elements */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="relative">
              {/* Main beauty studio image */}
              <motion.div 
                className="relative w-full h-96 rounded-3xl overflow-hidden border-2 border-pink-100"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={heroImage}
                  alt="Crissel Studio Beauty Salon Interior" 
                  className="w-full h-full object-cover"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-[#E57373]/10 to-[#F8BBD9]/10"
                  animate={{
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Floating elements */}
                <motion.div
                  animate={{ 
                    y: [-10, 10, -10],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                >
                  <span className="text-2xl">💄</span>
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [10, -10, 10],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-1/4 right-1/4 w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                >
                  <span className="text-xl">✨</span>
                </motion.div>
                
                {/* Center element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-xl"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Eye className="w-10 h-10 text-[#E57373]" />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Highlights section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(229, 115, 115, 0.1), 0 10px 10px -5px rgba(229, 115, 115, 0.04)"
                }}
                className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut", 
                    delay: index * 0.5 
                  }}
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#E57373] to-[#F8BBD9] rounded-full flex items-center justify-center"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <highlight.icon className="w-8 h-8 text-white" />
                  </motion.div>
                </motion.div>
                <motion.h3 
                  className="text-xl font-semibold text-gray-800 mb-2"
                  whileHover={{ color: "#E57373" }}
                >
                  {highlight.title}
                </motion.h3>
                <p className="text-gray-600">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
