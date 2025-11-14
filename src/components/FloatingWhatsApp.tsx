import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const FloatingWhatsApp = () => {
  const prefersReducedMotion = useReducedMotion()

  const handleClick = () => {
    window.open('https://wa.me/593992950683', '_blank')
  }

  return (
    <motion.button
      onClick={handleClick}
      type="button"
      className="group fixed left-6 bottom-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-4 text-white shadow-lg transition-all duration-300 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#128C7E]"
      whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      aria-label="Chatea por WhatsApp con Crissel Studio"
    >
      <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
        <motion.span
          aria-hidden="true"
          className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold leading-none shadow"
          animate={
            prefersReducedMotion
              ? undefined
              : { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          1
        </motion.span>
      </div>
      <div className="flex flex-col text-left">
        <span className="text-sm font-semibold leading-tight">¿Necesitas ayuda?</span>
        <span className="text-xs text-white/80 leading-tight">Escríbenos ahora</span>
      </div>
    </motion.button>
  )
}
export default FloatingWhatsApp 