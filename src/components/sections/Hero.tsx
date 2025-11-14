import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles, Eye, Star, Calendar, Award, Crown, HeartHandshake } from 'lucide-react'
import { Link } from 'react-router-dom'
import logoImage from '../../assets/images/logo_photo.png'
import heroImage from '../../assets/images/hero.jpeg'

const Hero = () => {
  const prefersReducedMotion = useReducedMotion()

  const floatingElements = [
    { icon: Eye, delay: 0, x: '10%', y: '20%' },
    { icon: Sparkles, delay: 1, x: '80%', y: '15%' },
    { icon: Star, delay: 2, x: '15%', y: '70%' },
    { icon: Sparkles, delay: 1.5, x: '85%', y: '75%' },
  ]

  const highlightMetrics = [
    {
      icon: HeartHandshake,
      value: '+1.5K',
      label: 'Clientes encantadas'
    },
    {
      icon: Crown,
      value: '10+',
      label: 'Años perfeccionando miradas'
    },
    {
      icon: Award,
      value: '4.9★',
      label: 'Promedio en reseñas'
    }
  ]

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-white flex items-center">
      {/* Animated gradient background shapes */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-[#E57373]/20 to-[#F8BBD9]/30 rounded-full blur-3xl z-0"
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.1, 1], rotate: [0, 15, 0] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 12, repeat: Infinity, ease: 'easeInOut' }
        }
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#F8BBD9]/30 to-[#E57373]/20 rounded-full blur-2xl z-0"
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1.1, 1, 1.1], rotate: [0, -10, 0] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 14, repeat: Infinity, ease: 'easeInOut' }
        }
      />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute top-0 left-0 w-full h-full"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E57373' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '60px 60px'
             }}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 z-10">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              prefersReducedMotion
                ? { opacity: 0.12, scale: 1 }
                : { opacity: 0.2, scale: 1, rotate: [0, 10, -10, 0] }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0.8 }
                : { delay: element.delay, duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
            }
            className="absolute"
            style={{ left: element.x, top: element.y }}
            aria-hidden="true"
          >
            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : { y: [-10, 10, -10] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <element.icon className="w-8 h-8 text-[#E57373]" aria-hidden="true" focusable="false" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Jumbotron main content */}
      <div className="relative z-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20 flex flex-col lg:flex-row lg:flex-wrap items-center lg:items-stretch gap-12">
          {/* Left side - Text content */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -50 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={prefersReducedMotion ? { duration: 0.6 } : { duration: 0.8, ease: 'easeOut' }}
            className="flex-1 flex flex-col justify-center lg:items-start items-center text-center lg:text-left"
          >
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.7, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-[#E57373]/20 bg-white/80 px-5 py-2 text-sm font-medium text-[#E57373] shadow-sm backdrop-blur"
              aria-label="Nuevas tendencias de belleza 2025"
            >
              <span className="inline-flex h-2 w-2 rounded-full bg-[#E57373] shadow-[0_0_10px_rgba(229,115,115,0.6)]" />
              Tendencias 2025 • Glam Glow Collection
            </motion.div>

            {/* Logo */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={prefersReducedMotion ? { duration: 0.6 } : { delay: 0.1, duration: 0.8, ease: 'easeOut' }}
              className="flex items-center space-x-4 mb-6"
            >
              <img 
                src={logoImage} 
                alt="Crissel Studio Logo" 
                className="w-16 h-16 object-contain drop-shadow-lg"
              />
              <div>
                <motion.h1
                  className="text-4xl lg:text-6xl font-bold text-[#E57373] drop-shadow-[0_2px_12px_rgba(229,115,115,0.25)]"
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : {
                          opacity: 1,
                          y: 0,
                          textShadow: [
                            "0 0 0px #E57373",
                            "0 0 16px #E57373",
                            "0 0 0px #E57373"
                          ]
                        }
                  }
                  transition={prefersReducedMotion ? { duration: 0.8 } : { duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                >
                  Crissel Studio
                </motion.h1>
                <motion.p
                  className="text-sm text-gray-600 italic"
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={prefersReducedMotion ? { duration: 0.6 } : { duration: 1, delay: 0.5, ease: 'easeOut' }}
                >By Cris Pestañas</motion.p>
              </div>
            </motion.div>
            
            <motion.h2
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0.6 } : { delay: 0.4, duration: 0.8, ease: 'easeOut' }}
              className="text-2xl lg:text-3xl text-[#E57373] font-semibold drop-shadow-[0_2px_8px_rgba(229,115,115,0.15)]"
            >
              ¡Realza el poder de tu mirada!
            </motion.h2>
            
            <motion.p
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0.6 } : { delay: 0.6, duration: 0.8, ease: 'easeOut' }}
              className="text-lg text-gray-700 max-w-lg"
            >
              En Crissel Studio, nos especializamos en realzar tu belleza natural a través de servicios profesionales de maquillaje, diseño de cejas y extensiones de pestañas en Ambato. Nuestro equipo está comprometido con la excelencia, utilizando técnicas avanzadas y productos de alta calidad para ofrecerte resultados espectaculares y personalizados. Disfruta de una experiencia única en un ambiente cálido y acogedor, donde tu confianza y satisfacción son nuestra prioridad.
            </motion.p>
            
            {/* Button row - jumbotron style */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0.6 } : { delay: 0.8, duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row flex-wrap gap-6 w-full max-w-2xl mt-8 justify-center lg:justify-start"
            >
              <motion.a
                href="https://bit.ly/crisselstudio"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 min-w-[180px] whitespace-nowrap px-8 py-4 bg-gradient-to-r from-[#E57373] to-[#F8BBD9] text-white rounded-full font-semibold text-lg shadow-lg transition-all duration-300 text-center flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373] will-change-transform"
                aria-label="Reservar una cita en Crissel Studio (se abre en una nueva pestaña)"
              >
                <Calendar className="w-5 h-5" />
                Reservar Cita
              </motion.a>

              <motion.button
                type="button"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex-1 min-w-[180px] whitespace-nowrap px-8 py-4 border-2 border-[#E57373] text-[#E57373] rounded-full font-semibold text-lg hover:bg-[#E57373] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373] will-change-transform"
                aria-label="Desplazarse a la sección de servicios"
              >
                <Sparkles className="w-5 h-5" />
                Ver Servicios
              </motion.button>

              <Link
                to="/galeria"
                className="flex-1 min-w-[180px] whitespace-nowrap px-8 py-4 border-2 border-[#F8BBD9] text-[#E57373] rounded-full font-semibold text-lg hover:bg-[#F8BBD9] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F8BBD9] will-change-transform"
                aria-label="Ir a la galería de trabajos"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>
                Ver Galería
              </Link>
            </motion.div>

            {/* Location info */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0.6 } : { delay: 1.0, duration: 0.8, ease: 'easeOut' }}
              className="text-sm text-gray-600 mt-8"
            >
              📍 Centro Comercial La Galería, Mera entre Rocafuerte y Bolívar, Ambato
            </motion.div>
          </motion.div>

          {/* Right side - Beauty visual */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={prefersReducedMotion ? { duration: 0.6 } : { delay: 0.4, duration: 1, ease: 'easeOut' }}
            className="flex-1 flex items-center justify-center"
          >
            <motion.div
              className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-[0_35px_80px_-40px_rgba(229,115,115,0.55)]"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { scale: [1, 1.05, 1] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 10, repeat: Infinity, ease: 'easeInOut' }
              }
            >
              {/* Hero image */}
              <img 
                src={heroImage} 
                alt="Crissel Studio Beauty Salon" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Animated overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-[#E57373]/20 to-[#F8BBD9]/20 pointer-events-none"
                animate={
                  prefersReducedMotion
                    ? { opacity: 0.75 }
                    : { opacity: [0.7, 0.9, 0.7] }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
                }
                aria-hidden="true"
              />
              {/* Floating service icons */}
              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [-20, 20, -20], rotate: [0, 10, -10, 0] }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }
                className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg text-[#E57373]"
                aria-hidden="true"
              >
                <span className="text-2xl" role="img" aria-label="Maquillaje">💄</span>
              </motion.div>
              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [20, -20, 20], rotate: [0, -10, 10, 0] }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }
                }
                className="absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg text-[#E57373]"
                aria-hidden="true"
              >
                <span className="text-xl" role="img" aria-label="Mirada">👁️</span>
              </motion.div>
              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [-15, 15, -15], rotate: [0, 10, -10, 0] }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                }
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                aria-hidden="true"
              >
                <Sparkles className="w-8 h-8 text-[#E57373]" aria-hidden="true" focusable="false" />
              </motion.div>

              <motion.div
                aria-hidden="true"
                className="absolute -inset-1 rounded-[28px] border border-white/40"
                animate={
                  prefersReducedMotion
                    ? { opacity: 0.35 }
                    : { opacity: [0.25, 0.5, 0.25] }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                }
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0.6 } : { duration: 0.8, delay: 1, ease: 'easeOut' }}
            className="w-full lg:basis-full mt-10 lg:mt-12"
          >
            <div className="mx-auto flex flex-col sm:flex-row justify-center gap-4 rounded-3xl border border-[#F8BBD9]/50 bg-white/75 px-6 py-5 shadow-lg backdrop-blur max-w-4xl">
              {highlightMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  className="flex flex-1 items-center gap-4 rounded-2xl bg-white/80 px-4 py-3 shadow-sm"
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.5, delay: index * 0.1 }
                      : { duration: 0.6, ease: 'easeOut', delay: 0.1 + index * 0.1 }
                  }
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#E57373] to-[#F8BBD9] text-white shadow-md">
                    <metric.icon className="h-6 w-6" aria-hidden="true" focusable="false" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-800">{metric.value}</p>
                    <p className="text-sm text-gray-500">{metric.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={prefersReducedMotion ? { duration: 0.6 } : { delay: 2, duration: 1, ease: 'easeOut' }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [0, 10, 0], scale: [1, 1.1, 1] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
          className="flex flex-col items-center space-y-2 text-[#E57373]"
        >
          <span className="text-sm font-medium">Descubre más</span>
          <svg
            className={`w-6 h-6 ${prefersReducedMotion ? '' : 'animate-bounce'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
