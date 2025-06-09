import { motion } from 'framer-motion'
import { useState } from 'react'
import { Eye, Sparkles, Star, Heart, Crown } from 'lucide-react'

// Dynamically import all images from the gallery folder
const galleryImages = import.meta.glob('../../assets/gallery/*.{jpg,jpeg,png,webp}', { eager: true })
const images = Object.keys(galleryImages).map((path) => ({
  src: (galleryImages[path] as any).default,
  name: path.split('/').pop(),
}))

// Map filenames to categories
const imageCategories: Record<string, string> = {
  // Lashes
  'extensiones-pestanas-1.jpg': 'lashes',
  'extensiones-pestanas-2.jpg': 'lashes',
  'extensiones-pestanas-3.jpg': 'lashes',
  'extensiones-pestanas-4.jpg': 'lashes',
  // Brows
  'microblading-cejas-1.jpg': 'brows',
  'microblading-cejas-2.jpg': 'brows',
  'planchado-cejas-1.jpg': 'brows',
  'planchado-cejas-2.jpg': 'brows',
  // Makeup
  'maquillaje-fantasia-1.jpg': 'makeup',
  'maquillaje-fantasia-2.jpg': 'makeup',
  'maquillaje-fantasia-3.jpg': 'makeup',
  'maquillaje-fantasia-4.jpg': 'makeup',
  'maquillaje-fantasia-5.jpg': 'makeup',
  'maquillaje-fantasia-6.jpg': 'makeup',
  'maquillaje-fantasia-7.jpg': 'makeup',
  'maquillaje-fantasia-8.jpg': 'makeup',
  'maquillaje-fantasia-9.jpg': 'makeup',
  'maquillaje-fantasia-10.jpg': 'makeup',
  'maquillaje-fantasia-11.jpg': 'makeup',
  'maquillaje-social-1.jpg': 'makeup',
}

const categories = [
  { id: 'all', label: 'Todo', icon: Star },
  { id: 'lashes', label: 'Extensiones de Pestañas', icon: Eye },
  { id: 'brows', label: 'Diseño de Cejas', icon: Crown },
  { id: 'makeup', label: 'Maquillaje', icon: Heart },
]

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selected, setSelected] = useState<number|null>(null)

  const filteredImages = activeCategory === 'all'
    ? images
    : images.filter(img => imageCategories[img.name ?? ''] === activeCategory)

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
          {filteredImages.map((img, i) => (
            <motion.div
              key={img.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Actual Beauty Work Image */}
                <div className="aspect-square relative">
                  <img 
                    src={img.src}
                    alt={img.name?.replace(/[-_]/g, ' ').replace(/\..+$/, '')}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                  
                  {/* Service icon overlay */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <Eye className="w-6 h-6 text-[#E57373]" />
                    </div>
                  </div>
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <h3 className="text-lg font-bold mb-1">{img.name?.replace(/\..+$/, '')}</h3>
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
      {/* Lightbox Modal */}
      {selected !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setSelected(null)}>
          <div className="relative max-w-3xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-white text-2xl bg-black/40 rounded-full px-2 py-1 hover:bg-black/70 transition"
              onClick={() => setSelected(null)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <img
              src={filteredImages[selected].src}
              alt={filteredImages[selected].name?.replace(/[-_]/g, ' ').replace(/\..+$/, '')}
              className="rounded-lg shadow-2xl max-h-[80vh] w-auto object-contain"
            />
            <div className="flex gap-4 mt-4">
              <button
                className="text-white bg-[#E57373] rounded-full px-4 py-2 disabled:opacity-50"
                onClick={() => setSelected(selected > 0 ? selected - 1 : selected)}
                disabled={selected === 0}
              >Anterior</button>
              <button
                className="text-white bg-[#E57373] rounded-full px-4 py-2 disabled:opacity-50"
                onClick={() => setSelected(selected < filteredImages.length - 1 ? selected + 1 : selected)}
                disabled={selected === filteredImages.length - 1}
              >Siguiente</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery
