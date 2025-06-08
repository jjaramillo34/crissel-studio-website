import { motion } from 'framer-motion'
import { Sparkles, Eye, Star, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import logoImage from '../../assets/images/logo_photo.png'
import heroImage from '../../assets/images/hero.jpg'

const Hero = () => {
  const floatingElements = [
    { icon: Eye, delay: 0, x: '10%', y: '20%' },
    { icon: Sparkles, delay: 1, x: '80%', y: '15%' },
    { icon: Star, delay: 2, x: '15%', y: '70%' },
    { icon: Sparkles, delay: 1.5, x: '85%', y: '75%' },
  ]

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E57373' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '60px 60px'
             }}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ delay: element.delay, duration: 1 }}
            className="absolute"
            style={{ left: element.x, top: element.y }}
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <element.icon className="w-8 h-8 text-[#E57373]" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="flex items-center space-x-4 mb-6"
            >
              <img 
                src={logoImage} 
                alt="Crissel Studio Logo" 
                className="w-16 h-16 object-contain"
              />
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-[#E57373]">
                  Crissel Studio
                </h1>
                <p className="text-sm text-gray-600 italic">By Cris Pestañas</p>
              </div>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl lg:text-3xl text-[#E57373] font-semibold"
            >
              ¡Realza el poder de tu mirada!
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg text-gray-700 max-w-lg"
            >
              Estudio de maquillaje, diseño de cejas y pestañas en Ambato. 
              Servicios profesionales de belleza para realzar tu belleza natural.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="https://bit.ly/crisselstudio"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(229, 115, 115, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#E57373] to-[#F8BBD9] text-white rounded-full font-semibold text-lg shadow-lg transition-all duration-300 text-center flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Reservar Cita
              </motion.a>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-[#E57373] text-[#E57373] rounded-full font-semibold text-lg hover:bg-[#E57373] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Ver Servicios
              </motion.button>
            </motion.div>
            
            {/* Location info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="text-sm text-gray-600"
            >
              📍 Centro Comercial La Galería, Mera entre Rocafuerte y Bolívar, Ambato
            </motion.div>
          </motion.div>

          {/* Right side - Beauty visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden">
              {/* Hero image */}
              <img 
                src={heroImage} 
                alt="Crissel Studio Beauty Salon" 
                className="w-full h-full object-cover"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E57373]/20 to-[#F8BBD9]/20" />
              
              {/* Floating service icons */}
              <motion.div
                animate={{ y: [-20, 20, -20] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
              >
                <span className="text-2xl">💄</span>
              </motion.div>
              
              <motion.div
                animate={{ y: [20, -20, 20] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
              >
                <span className="text-xl">👁️</span>
              </motion.div>
              
              <motion.div
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
              >
                <Sparkles className="w-8 h-8 text-[#E57373]" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-2 text-[#E57373]"
        >
          <span className="text-sm font-medium">Descubre más</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
