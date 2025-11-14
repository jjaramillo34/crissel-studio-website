import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
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

const categoryIconMap = {
  lashes: Eye,
  brows: Crown,
  makeup: Heart,
} as const

const MotionLink = motion(Link)

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selected, setSelected] = useState<number|null>(null)

  const prefersReducedMotion = useReducedMotion()
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  const filteredImages = useMemo(() => {
    return activeCategory === 'all'
      ? images
      : images.filter(img => imageCategories[img.name ?? ''] === activeCategory)
  }, [activeCategory])
  const activeImage = selected !== null ? filteredImages[selected] : null

  const getImageTitle = useCallback((name?: string) => {
    if (!name) return 'Trabajo de belleza'
    return name
      .replace(/[-_]/g, ' ')
      .replace(/\..+$/, '')
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }, [])

  const openLightbox = useCallback((index: number) => {
    setSelected(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setSelected(null)
  }, [])

  const showPrevious = useCallback(() => {
    setSelected(prev => {
      if (prev === null) return prev
      return prev > 0 ? prev - 1 : prev
    })
  }, [])

  const showNext = useCallback(() => {
    setSelected(prev => {
      if (prev === null) return prev
      return prev < filteredImages.length - 1 ? prev + 1 : prev
    })
  }, [filteredImages.length])

  useEffect(() => {
    if (selected === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeLightbox()
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        showPrevious()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        showNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeLightbox, selected, showNext, showPrevious])

  useEffect(() => {
    if (selected !== null && selected >= filteredImages.length) {
      setSelected(filteredImages.length ? filteredImages.length - 1 : null)
    }
  }, [filteredImages.length, selected])

  useEffect(() => {
    if (selected !== null) {
      closeButtonRef.current?.focus({ preventScroll: true })
    }
  }, [selected])

  const containerVariants = {
    hidden: { opacity: 0, ...(prefersReducedMotion ? {} : { y: 24 }) },
    visible: {
      opacity: 1,
      ...(prefersReducedMotion ? {} : { y: 0 }),
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            staggerChildren: 0.1,
            duration: 0.5,
            ease: 'easeOut'
          }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, ...(prefersReducedMotion ? {} : { scale: 0.9, y: 16 }) },
    visible: {
      opacity: 1,
      ...(prefersReducedMotion ? {} : { scale: 1, y: 0 }),
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.45, ease: 'easeOut' }
    }
  }

  return (
    <section id="galeria" className="relative overflow-hidden py-20 bg-gradient-to-br from-pink-50 to-white">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 h-80 w-80 rounded-full bg-[#E57373]/10 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.1, 1], rotate: [0, 6, 0] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 12, repeat: Infinity, ease: 'easeInOut' }
        }
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#F8BBD9]/10 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1.1, 0.95, 1.1], rotate: [5, -5, 5] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 14, repeat: Infinity, ease: 'easeInOut' }
        }
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, ease: 'easeOut' }}
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
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
          className="flex flex-wrap justify-center gap-4 mb-12"
          aria-label="Filtros de la galería"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category.id
            return (
              <motion.button
                key={category.id}
                type="button"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#E57373] to-[#F8BBD9] text-white shadow-lg focus-visible:outline-[#E57373]'
                    : 'bg-white text-gray-700 border-2 border-pink-100 hover:bg-pink-50 focus-visible:outline-[#F8BBD9]'
                }`}
                aria-pressed={isActive}
              >
                <category.icon className="w-5 h-5" aria-hidden="true" focusable="false" />
                <span>{category.label}</span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Gallery grid */}
        <motion.div
          key={activeCategory}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredImages.map((img, index) => {
            const category = imageCategories[img.name ?? ''] ?? 'all'
            const ServiceIcon = categoryIconMap[category] ?? Sparkles
            const title = getImageTitle(img.name)
            const categoryLabel =
              category === 'all'
                ? 'Destacado'
                : categories.find(({ id }) => id === category)?.label ?? getImageTitle(category)

            return (
              <motion.article
                key={img.name ?? index}
                variants={itemVariants}
                whileHover={
                  prefersReducedMotion ? undefined : { scale: 1.03, y: -10 }
                }
                className="group cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E57373]"
                role="button"
                tabIndex={0}
                aria-label={`${title}. ${category === 'all' ? 'Trabajo destacado' : `Categoría: ${categoryLabel}`}`}
                onClick={() => openLightbox(index)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    openLightbox(index)
                  }
                }}
              >
                <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* Actual Beauty Work Image */}
                  <div className="aspect-square relative">
                    <img 
                      src={img.src}
                      alt={title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300" aria-hidden="true"></div>
                    
                    {/* Service icon overlay */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                        <ServiceIcon className="w-6 h-6 text-[#E57373]" aria-hidden="true" focusable="false" />
                      </div>
                    </div>

                    {/* Category chip */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur">
                        <ServiceIcon className="w-4 h-4 text-[#E57373]" aria-hidden="true" focusable="false" />
                        {categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white">
                    <h3 className="text-lg font-bold mb-1">{title}</h3>
                    <p className="text-sm text-white/80">
                      {category === 'all'
                        ? 'Galería destacada de Crissel Studio'
                        : `Servicio de ${categoryLabel}`}
                    </p>
                  </div>

                  {/* Hover effect - border glow */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#E57373]/50 transition-all duration-300" aria-hidden="true"></div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { delay: 0.4, duration: 0.8, ease: 'easeOut' }
          }
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              ¿Lista para tu transformación?
            </h3>
            <p className="text-gray-600 mb-6">
              Agenda tu cita y descubre el poder de realzar tu mirada con nuestros servicios profesionales
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <MotionLink
                to="/galeria"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center rounded-full border-2 border-[#E57373] px-8 py-3 text-sm font-semibold text-[#E57373] transition-all duration-300 hover:bg-[#E57373] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]"
                aria-label="Ver galería completa"
              >
                Ver Galería Completa
              </MotionLink>
              <motion.a
                href="https://bit.ly/crisselstudio"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#E57373] to-[#F8BBD9] text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]"
                aria-label="Abrir reservas online de Crissel Studio en una nueva ventana"
              >
                Reservar Cita
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Lightbox Modal */}
      {activeImage && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={closeLightbox}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="relative max-w-4xl w-full flex flex-col items-center gap-6 rounded-3xl bg-white/5 p-6 backdrop-blur-md"
            onClick={(event) => event.stopPropagation()}
            initial={{ scale: prefersReducedMotion ? 1 : 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label={`Detalle del trabajo ${getImageTitle(activeImage.name)}`}
          >
            <motion.button
              ref={closeButtonRef}
              type="button"
              className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white text-2xl leading-none hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition"
              onClick={closeLightbox}
              aria-label="Cerrar galería ampliada"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ×
            </motion.button>
            <figure className="w-full flex flex-col items-center gap-4">
              <img
                src={activeImage.src}
                alt={getImageTitle(activeImage.name)}
                className="max-h-[70vh] w-auto rounded-2xl object-contain shadow-2xl"
              />
              <figcaption className="text-center text-white">
                <p className="text-lg font-semibold">{getImageTitle(activeImage.name)}</p>
                <p className="text-sm text-white/80">
                  {selected !== null
                    ? `Imagen ${selected + 1} de ${filteredImages.length}`
                    : null}
                </p>
              </figcaption>
            </figure>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-white font-medium backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={(event) => {
                  event.stopPropagation()
                  showPrevious()
                }}
                disabled={selected === 0}
                aria-label="Ver imagen anterior"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Anterior
              </motion.button>
              <motion.button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-white font-medium backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={(event) => {
                  event.stopPropagation()
                  showNext()
                }}
                disabled={selected === filteredImages.length - 1}
                aria-label="Ver imagen siguiente"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Siguiente
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default Gallery
