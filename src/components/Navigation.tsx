import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import logoImage from '../assets/images/logo_photo.png'

const Navigation = () => {
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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-pink-100' 
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 flex items-center space-x-2"
            >
              <img 
                src={logoImage} 
                alt="Crissel Studio Logo" 
                className="w-8 h-8 object-contain"
              />
              <Link 
                to="/"
                className="text-xl font-bold text-[#E57373] hover:opacity-80 transition-opacity"
              >
                Crissel Studio
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => {
                  const isActive = (item.path === '/productos' && location.pathname === '/productos') ||
                                 (item.path === '/' && location.pathname === '/' && activeSection === item.id)
                  
                  if (item.path === '/productos') {
                    return (
                      <Link key={item.id} to="/productos">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
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
                      whileHover={{ scale: 1.05 }}
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#E57373] to-[#F8BBD9] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Reservar Cita
              </motion.a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="bg-[#E57373] text-white p-2 rounded-lg"
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
                className="block w-full bg-gradient-to-r from-[#E57373] to-[#F8BBD9] text-white px-4 py-3 rounded-lg text-center font-medium shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
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
