'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
// Use public folder path for static image
const logoImage = '/assets/images/logo_photo.png'
import { Heart, Instagram, MapPin, MessageCircle, Calendar, Sparkles, Eye } from 'lucide-react'

const Footer = () => {
  const prefersReducedMotion = useReducedMotion()
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Sobre Nosotros', href: '#sobre-nosotros' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Productos', href: '/productos' },
    { name: 'Tienda Nagaraku', href: '/tienda' },
    { name: 'Galería', href: '#galeria' },
    { name: 'Contacto', href: '#contacto' },
  ]

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/crisselstudio.ec' },
    { name: 'WhatsApp', icon: MessageCircle, href: 'https://wa.me/593123456789' },
    { name: 'Reservas', icon: Calendar, href: 'https://bit.ly/crisselstudio' },
    { name: 'Ubicación', icon: MapPin, href: '#contact' }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative overflow-hidden bg-[#1F1F28] text-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <motion.div
          aria-hidden="true"
          className="absolute top-10 left-10 h-24 w-24 rounded-full bg-[#E57373]/10 blur-2xl"
          animate={
            prefersReducedMotion
              ? { opacity: 0.4 }
              : { scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 12, repeat: Infinity, ease: 'easeInOut' }
          }
        />
        <motion.div
          aria-hidden="true"
          className="absolute top-32 right-16 h-20 w-20 rounded-full bg-[#F8BBD9]/10 blur-2xl"
          animate={
            prefersReducedMotion
              ? { opacity: 0.35 }
              : { scale: [0.95, 1.08, 0.95], opacity: [0.4, 0.7, 0.4] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }
          }
        />
        <motion.div
          aria-hidden="true"
          className="absolute bottom-20 left-1/4 h-16 w-16 rounded-full bg-pink-300/10 blur-2xl"
          animate={
            prefersReducedMotion
              ? { opacity: 0.3 }
              : { scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }
          }
        />
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand section */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, ease: 'easeOut' }}
              className="lg:col-span-2"
            >
              <div className="mb-4 flex flex-col items-start gap-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={logoImage} 
                    alt="Crissel Studio Logo" 
                    className="h-12 w-12 rounded-full border border-[#E57373]/30 shadow-lg"
                    loading="lazy"
                  />
                  <motion.button
                    onClick={scrollToTop}
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                    className="text-3xl font-bold tracking-tight text-white"
                  >
                    Crissel Studio
                  </motion.button>
                </div>
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, ease: 'easeOut' }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-white/60 shadow-sm backdrop-blur"
                >
                  Belleza consciente • Detalle artesanal
                </motion.div>
              </div>
              
              <p className="mb-6 max-w-md leading-relaxed text-white/75">
                Estudio de belleza especializado en maquillaje profesional, 
                diseño de cejas y extensiones de pestañas. 
                Realzamos el poder de tu mirada.
              </p>

              <div className="flex flex-wrap items-center gap-2 text-gray-300">
                <Eye className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm">Centro Comercial La Galería, Ambato, Ecuador</span>
                <Heart className="h-4 w-4 animate-pulse text-[#E57373]" aria-hidden="true" />
              </div>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              <h3 className="text-xl font-semibold mb-6 text-gray-300">
                Navegación
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <motion.li
                    key={link.href}
                    whileHover={prefersReducedMotion ? undefined : { x: 5 }}
                    transition={{ type: prefersReducedMotion ? 'tween' : "spring", stiffness: 300 }}
                  >
                    {link.href.startsWith('/') ? (
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 transition-colors duration-300 hover:text-[#E57373]"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => scrollToSection(link.href)}
                        className="text-left text-sm text-white/70 transition-colors duration-300 hover:text-[#E57373]"
                      >
                        {link.name}
                      </button>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            >
              <h3 className="text-xl font-semibold mb-6 text-gray-300">
                Síguenos
              </h3>
              <div className="space-y-4">
                {socialLinks.map((social, index) => {
                  const href = String(social.href || '')
                  return (
                  <motion.a
                    key={index}
                    href={href}
                    target={href.startsWith('http') ? "_blank" : undefined}
                    rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-3 text-white/70 hover:text-[#E57373] transition-colors duration-300 text-sm group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]/60 rounded-lg"
                    aria-label={`Abrir ${social.name}`}
                  >
                    <div className="w-8 h-8 bg-[#E57373]/20 rounded-lg flex items-center justify-center group-hover:bg-[#E57373]/30 transition-colors duration-300">
                      <social.icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <span>{social.name}</span>
                  </motion.a>
                  )
                })}
              </div>

              {/* Call to action */}
              <div className="mt-8 p-4 bg-[#E57373]/10 rounded-2xl border border-[#E57373]/20">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">
                  ¿Lista para tu transformación?
                </h4>
                <p className="text-xs text-white/60 mb-3">
                  Agenda tu cita y realza el poder de tu mirada
                </p>
                <motion.a
                  href="https://bit.ly/crisselstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full px-3 py-2 bg-[#E57373] rounded-lg text-xs font-medium hover:bg-[#E57373]/80 transition-colors text-center text-white"
                  aria-label="Reservar cita en Crissel Studio"
                >
                  Reservar Cita
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0.6 } : { duration: 0.6, delay: 0.6 }}
          className="border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-white/60">
                <span>© {currentYear} Crissel Studio.</span>
                <span>Todos los derechos reservados.</span>
              </div>

              <div className="flex items-center space-x-6 text-sm text-white/60">
                <span>Hecho con</span>
                <Heart className="w-4 h-4 text-[#E57373] animate-pulse" aria-hidden="true" />
                <span>en Ambato, Ecuador</span>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="flex items-center justify-center mt-6 space-x-2">
              <Sparkles className="w-4 h-4 text-[#E57373] animate-gentle-bounce" aria-hidden="true" />
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#E57373] to-transparent"></div>
              <Eye className="w-4 h-4 text-[#F8BBD9] animate-float" aria-hidden="true" />
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#F8BBD9] to-transparent"></div>
              <Heart className="w-4 h-4 text-pink-300 animate-pulse" aria-hidden="true" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Back to top button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-[#E57373] to-[#F8BBD9] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        aria-label="Volver al inicio"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </footer>
  )
}

export default Footer
