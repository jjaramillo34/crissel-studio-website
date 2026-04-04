'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Heart, Eye, Star, Award, Sparkles } from 'lucide-react'
// Use public folder path for static image
const heroImage = '/assets/images/hero.jpeg'
import { SectionHeader } from './SectionHeader'

const About = () => {
  const prefersReducedMotion = useReducedMotion()

  const containerVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0 }
        }
      }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            staggerChildren: 0.2,
            duration: 0.6,
            ease: 'easeOut'
          }
        }
      }

  const itemVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0 }
        }
      }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: 'easeOut' }
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
    <section id="sobre-nosotros" className="section-brand py-20 relative">
      {/* Animated background elements */}
      <motion.div
        aria-hidden="true"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0]
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }
        }
        className="absolute -top-20 -right-20 w-64 h-64 bg-[#E57373]/5 rounded-full blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: [1.2, 1, 1.2],
                rotate: [5, 0, 5]
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }
        }
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
              <SectionHeader
                eyebrow="Nuestra esencia"
                title="Belleza consciente en Crissel Studio"
                description="Somos especialistas en realzar la mirada con técnicas seguras, procesos personalizados y un acompañamiento cálido en cada visita."
                align="start"
                className="mb-4"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6 text-lg text-gray-700">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
              >
                En Crissel Studio somos especialistas en realzar la belleza natural de cada cliente. 
                Nuestro enfoque profesional se centra en técnicas avanzadas de extensiones de pestañas, 
                diseño de cejas y maquillaje que destacan el poder de tu mirada.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4 }}
              >
                Con años de experiencia en el mundo de la belleza, ofrecemos servicios personalizados 
                que transforman y realzan tus facciones naturales. Cada tratamiento está diseñado 
                para brindarte confianza y elegancia en tu día a día.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.6 }}
              >
                Ubicados en el corazón de Ambato, Ecuador, nuestro estudio combina técnicas profesionales 
                con un ambiente acogedor donde cada cliente recibe atención personalizada y resultados 
                que superan las expectativas.
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                type="button"
                whileHover={{ 
                  scale: prefersReducedMotion ? 1 : 1.05,
                  boxShadow: prefersReducedMotion ? "none" : "0 10px 20px rgba(229, 115, 115, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-gradient-to-r from-[#E57373] to-[#e8899f] text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-rose-200/50 transition-all duration-300 relative overflow-hidden group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]"
                aria-label="Ver nuestros servicios"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-[#E57373] to-[#F8BBD9] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />
                <span className="relative z-10 flex items-center gap-2">
                  Ver Nuestros Servicios
                  <Sparkles className="w-4 h-4" aria-hidden="true" focusable="false" />
                </span>
              </motion.button>
              <a
                href="/galeria"
                className="mt-4 inline-flex items-center gap-2 px-8 py-3 border-2 border-rose-200 bg-white/80 text-[#c45c5c] rounded-2xl font-semibold text-lg hover:bg-rose-50 hover:border-[#F8BBD9] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F8BBD9]"
                aria-label="Ver galería de trabajos"
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
                className="relative w-full h-96 rounded-[2rem] overflow-hidden border border-rose-200/70 bg-white shadow-[0_24px_60px_-28px_rgba(229,115,115,0.35)] ring-1 ring-rose-100/60"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={heroImage}
                  alt="Crissel Studio Beauty Salon Interior" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-tr from-[#E57373]/15 via-transparent to-[#F8BBD9]/20 pointer-events-none"
                  aria-hidden
                />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/50 bg-white/85 px-4 py-3 shadow-lg backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#E57373]">Especialidad</p>
                  <p className="font-display text-lg text-neutral-900">Pestañas · Cejas · Maquillaje pro</p>
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
              <motion.article
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: prefersReducedMotion ? 1 : 1.05, 
                  y: prefersReducedMotion ? 0 : -5,
                  boxShadow: prefersReducedMotion
                    ? "0 10px 15px -3px rgba(229, 115, 115, 0.1), 0 4px 6px -4px rgba(229, 115, 115, 0.1)"
                    : "0 20px 25px -5px rgba(229, 115, 115, 0.12), 0 10px 10px -5px rgba(229, 115, 115, 0.06)"
                }}
                className="text-center p-8 rounded-2xl bg-white/95 backdrop-blur-sm border border-rose-100/90 shadow-md hover:shadow-lg hover:border-rose-200/80 transition-all duration-300"
                aria-labelledby={`highlight-title-${index}`}
                aria-describedby={`highlight-description-${index}`}
              >
                <motion.div
                  aria-hidden="true"
                  animate={
                    prefersReducedMotion
                      ? { scale: 1 }
                      : { 
                          rotate: [0, 5, 0, -5, 0],
                          scale: [1, 1.1, 1]
                        }
                  }
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : { 
                          duration: 2, 
                          repeat: Infinity, 
                          ease: "easeInOut", 
                          delay: index * 0.5 
                        }
                  }
                  className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#E57373] to-[#F8BBD9] rounded-full flex items-center justify-center shadow-md"
                >
                  <motion.div
                    aria-hidden="true"
                    animate={
                      prefersReducedMotion
                        ? { scale: 1, rotate: 0 }
                        : {
                            scale: [1, 1.2, 1],
                            rotate: [0, 360]
                          }
                    }
                    transition={
                      prefersReducedMotion
                        ? undefined
                        : {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                    }
                  >
                    <highlight.icon className="w-9 h-9 text-white" aria-hidden="true" focusable="false" />
                  </motion.div>
                </motion.div>
                <motion.h3 
                  id={`highlight-title-${index}`}
                  className="text-xl font-semibold text-gray-800 mb-2"
                  whileHover={{ color: "#E57373" }}
                >
                  {highlight.title}
                </motion.h3>
                <p id={`highlight-description-${index}`} className="text-gray-600">{highlight.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
