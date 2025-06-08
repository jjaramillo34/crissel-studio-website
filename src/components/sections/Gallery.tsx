import { motion } from 'framer-motion'
import { useState } from 'react'
import { Eye, Sparkles, Star, Heart, Crown } from 'lucide-react'

// Import gallery images
import makeupTransform from '../../assets/images/makeuptransform.jpg'
import lashExtensions1 from '../../assets/images/lashextensions1.jpg'
import lashExtensions2 from '../../assets/images/lashextensions2.jpg'
import lashLifting from '../../assets/images/lashLifting.jpg'
import browDesign1 from '../../assets/images/browDesign1.jpg'
import lashLiftingResult from '../../assets/images/lashLiftingResult.jpg'
import browDesign2 from '../../assets/images/browDesign2.jpg'
import lashExtensions3 from '../../assets/images/lashExtensions3.jpg'
import artisticMakeup from '../../assets/images/artisticMakeup.jpg'

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'Todo', icon: Star },
    { id: 'lashes', label: 'Extensiones de Pestañas', icon: Eye },
    { id: 'brows', label: 'Diseño de Cejas', icon: Crown },
    { id: 'makeup', label: 'Maquillaje', icon: Heart }
  ]

  const artworks = [
    {
      id: 1,
      title: "Transformación de Maquillaje",
      category: "makeup",
      type: "Antes y después",
      image: makeupTransform,
      icon: Heart
    },
    {
      id: 2,
      title: "Extensiones de Pestañas Volumen",
      category: "lashes",
      type: "Efecto dramático",
      image: lashExtensions1,
      icon: Eye
    },
    {
      id: 3,
      title: "Extensiones Profesionales",
      category: "lashes",
      type: "Resultado natural",
      image: lashExtensions2,
      icon: Eye
    },
    {
      id: 4,
      title: "Lifting de Pestañas",
      category: "lashes",
      type: "Curvatura natural",
      image: lashLifting,
      icon: Eye
    },
    {
      id: 5,
      title: "Diseño de Cejas Perfect",
      category: "brows",
      type: "Antes del tratamiento",
      image: browDesign1,
      icon: Crown
    },
    {
      id: 6,
      title: "Resultado Lifting",
      category: "lashes",
      type: "Transformación completa",
      image: lashLiftingResult,
      icon: Eye
    },
    {
      id: 7,
      title: "Cejas Diseñadas",
      category: "brows",
      type: "Depilación con hilo",
      image: browDesign2,
      icon: Crown
    },
    {
      id: 8,
      title: "Extensiones Híbridas",
      category: "lashes",
      type: "Efecto natural",
      image: lashExtensions3,
      icon: Eye
    },
    {
      id: 9,
      title: "Maquillaje Artístico",
      category: "makeup",
      type: "Trabajo creativo",
      image: artisticMakeup,
      icon: Heart
    }
  ]

  const filteredArtworks = activeCategory === 'all' 
    ? artworks 
    : artworks.filter(artwork => artwork.category === activeCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="galeria" className="py-20 bg-gradient-to-br from-pink-50 to-white">
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
            Nuestra <span className="text-[#E57373]">Galería</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#E57373] to-[#F8BBD9] rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre las transformaciones increíbles que realizamos en Crissel Studio. 
            Cada imagen muestra nuestro compromiso con la excelencia y la belleza natural.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-[#E57373] to-[#F8BBD9] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-pink-50 border-2 border-pink-100'
              }`}
            >
              <category.icon className="w-5 h-5" />
              <span>{category.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery grid */}
        <motion.div
          key={activeCategory}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredArtworks.map((artwork) => (
            <motion.div
              key={artwork.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Actual Beauty Work Image */}
                <div className="aspect-square relative">
                  <img 
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                  
                  {/* Service icon overlay */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <artwork.icon className="w-6 h-6 text-[#E57373]" />
                    </div>
                  </div>
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <h3 className="text-lg font-bold mb-1">{artwork.title}</h3>
                  <p className="text-white/90 text-sm">{artwork.type}</p>
                </div>

                {/* Hover effect - border glow */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#E57373]/50 transition-all duration-300"></div>
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
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              ¿Lista para tu transformación?
            </h3>
            <p className="text-gray-600 mb-6">
              Agenda tu cita y descubre el poder de realzar tu mirada con nuestros servicios profesionales
            </p>
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Gallery
