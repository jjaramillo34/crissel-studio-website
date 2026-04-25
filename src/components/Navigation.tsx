'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, Menu, Calendar } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
// Use public folder path for static image
const logoImage = '/assets/images/logo_photo.png'

const Navigation = () => {
  const prefersReducedMotion = useReducedMotion()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { id: 'hero', label: 'Inicio', path: '/' },
    { id: 'sobre-nosotros', label: 'Sobre Nosotros', path: '/' },
    { id: 'servicios', label: 'Servicios', path: '/' },
    { id: 'productos', label: 'Productos', path: '/productos' },
    { id: 'tienda', label: 'Tienda', path: '/tienda' },
    { id: 'promos', label: 'Promos', path: '/promos' },
    { id: 'galeria', label: 'Galería', path: '/' },
    { id: 'contacto', label: 'Contacto', path: '/' }
  ]

  const isStandaloneRoute = (path: string) => path !== '/' && path.startsWith('/')

  const gradientBackground = useMemo(
    () =>
      isScrolled
        ? 'bg-white/92 backdrop-blur-xl shadow-[0_1px_0_0_rgba(229,115,115,0.12)] border-b border-rose-100/80'
        : 'bg-white/75 backdrop-blur-md',
    [isScrolled]
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.id)
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = (item: { id: string; path: string }) => {
    // Validate item properties
    const itemId = String(item?.id || '')
    const itemPath = String(item?.path || '/')
    
    if (isStandaloneRoute(itemPath)) {
      setIsMobileMenuOpen(false)
      return
    }
    
    if (pathname !== '/') {
      // If not on home page, navigate to home first
      const targetPath = itemId === 'hero' ? '/' : `/#${itemId}`
      window.location.href = targetPath
      return
    }
    
    // Scroll to section on current page
    if (itemId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.getElementById(itemId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={prefersReducedMotion ? { y: 0 } : { y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${gradientBackground}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Image 
                src={logoImage} 
                alt="Crissel Studio Logo" 
                width={36}
                height={36}
                className="w-9 h-9 object-contain rounded-2xl border border-neutral-200/90 bg-white shadow-sm"
              />
              <Link 
                href="/"
                className="font-display text-lg sm:text-xl font-semibold tracking-tight bg-gradient-to-r from-[#c45c5c] to-[#E57373] bg-clip-text text-transparent hover:opacity-85 transition-opacity"
              >
                Crissel Studio
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-3">
                {navItems.map((item) => {
                  const isActive =
                    (isStandaloneRoute(item.path) && pathname === item.path) ||
                    (item.path === '/' && pathname === '/' && activeSection === item.id)

                  if (isStandaloneRoute(item.path)) {
                    return (
                      <Link key={item.id} href={item.path}>
                        <motion.div
                          whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                            isActive
                              ? 'bg-gradient-to-r from-[#E57373] to-[#ec9aaa] text-white shadow-md shadow-rose-200/50'
                              : 'text-neutral-600 hover:text-[#c45c5c] hover:bg-rose-50/90'
                          }`}
                        >
                          {item.label}
                        </motion.div>
                      </Link>
                    )
                  }
                  
                  return (
                    <motion.button
                      key={item.id}
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleNavigation(item)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-[#E57373] to-[#ec9aaa] text-white shadow-md shadow-rose-200/50'
                          : 'text-neutral-600 hover:text-[#c45c5c] hover:bg-rose-50/90'
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Booking CTA */}
            <div className="hidden md:block">
              <motion.a
                href="https://bit.ly/crisselstudio"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#E57373] to-[#F8BBD9] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-rose-200/40 transition-all hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]"
                aria-label="Reservar cita en Crissel Studio"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Reservar Cita
              </motion.a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-xl bg-gradient-to-br from-[#E57373] to-[#d65f7a] p-2 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
                aria-label={isMobileMenuOpen ? 'Cerrar menú móvil' : 'Abrir menú móvil'}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl shadow-lg border-b border-rose-100/80 md:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => {
                const isActive =
                  (isStandaloneRoute(item.path) && pathname === item.path) ||
                  (item.path === '/' && pathname === '/' && activeSection === item.id)

                if (isStandaloneRoute(item.path)) {
                  return (
                    <Link key={item.id} href={item.path}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-[#E57373] to-[#ec9aaa] text-white'
                            : 'text-neutral-700 hover:text-[#c45c5c] hover:bg-rose-50'
                        }`}
                      >
                        {item.label}
                      </motion.div>
                    </Link>
                  )
                }
                
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleNavigation(item)}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#E57373] to-[#ec9aaa] text-white'
                        : 'text-neutral-700 hover:text-[#c45c5c] hover:bg-rose-50'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                )
              })}
              
              {/* Mobile Booking CTA */}
              <motion.a
                href="https://bit.ly/crisselstudio"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="block w-full rounded-xl bg-gradient-to-r from-[#E57373] to-[#F8BBD9] px-4 py-3 text-center font-semibold text-white shadow-md shadow-rose-200/40 transition-all hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Reservar cita en Crissel Studio"
              >
                Reservar Cita
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/20 z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
