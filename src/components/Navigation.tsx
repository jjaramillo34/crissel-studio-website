import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, Menu, Sparkles, Calendar, PhoneCall } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import logoImage from '../assets/images/logo_photo.png'

const Navigation = () => {
  const prefersReducedMotion = useReducedMotion()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { id: 'hero', label: 'Inicio', path: '/' },
    { id: 'sobre-nosotros', label: 'Sobre Nosotros', path: '/' },
    { id: 'servicios', label: 'Servicios', path: '/' },
    { id: 'productos', label: 'Productos', path: '/productos' },
    { id: 'galeria', label: 'Galería', path: '/' },
    { id: 'contacto', label: 'Contacto', path: '/' }
  ]

  const gradientBackground = useMemo(
    () =>
      isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-pink-100'
        : 'bg-white/80 backdrop-blur-sm',
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
    if (item.path === '/productos') {
      // Navigate to products page
      setIsMobileMenuOpen(false)
      return
    }
    
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      window.location.href = `/${item.id === 'hero' ? '' : '#' + item.id}`
      return
    }
    
    // Scroll to section on current page
    if (item.id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.getElementById(item.id)
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
              <img 
                src={logoImage} 
                alt="Crissel Studio Logo" 
                className="w-9 h-9 object-contain rounded-full border border-[#E57373]/40 shadow-sm"
              />
              <Link 
                to="/"
                className="text-lg sm:text-xl font-bold text-[#E57373] hover:opacity-80 transition-opacity"
              >
                Crissel Studio
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-3">
                {navItems.map((item) => {
                  const isActive = (item.path === '/productos' && location.pathname === '/productos') ||
                                 (item.path === '/' && location.pathname === '/' && activeSection === item.id)
                  
                  if (item.path === '/productos') {
                    return (
                      <Link key={item.id} to="/productos">
                        <motion.div
                          whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                            isActive
                              ? 'bg-[#E57373] text-white shadow-lg'
                              : 'text-gray-700 hover:text-[#E57373] hover:bg-pink-50'
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
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-[#E57373] text-white shadow-lg'
                          : 'text-gray-700 hover:text-[#E57373] hover:bg-pink-50'
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
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E57373] to-[#F8BBD9] px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]"
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
                className="rounded-lg bg-[#E57373] p-2 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
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
            className="fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-lg border-b border-pink-100 md:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => {
                const isActive = (item.path === '/productos' && location.pathname === '/productos') ||
                               (item.path === '/' && location.pathname === '/' && activeSection === item.id)
                
                if (item.path === '/productos') {
                  return (
                    <Link key={item.id} to="/productos">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                          isActive
                            ? 'bg-[#E57373] text-white'
                            : 'text-gray-700 hover:text-[#E57373] hover:bg-pink-50'
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
                    className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-[#E57373] text-white'
                        : 'text-gray-700 hover:text-[#E57373] hover:bg-pink-50'
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
                className="block w-full rounded-lg bg-gradient-to-r from-[#E57373] to-[#F8BBD9] px-4 py-3 text-center font-medium text-white shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E57373]"
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
