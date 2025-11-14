import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

const highlights = [
  {
    title: 'Kit Lash Lover',
    description: 'Sérum fortalecedor + cepillo duo + protector de sueño. Ideal para mantener tus extensiones impecables.',
  },
  {
    title: 'Skin Prep Glow',
    description: 'Rutina previa de skincare con exfoliante enzimático y mist calmante para maximizar el maquillaje profesional.',
  },
  {
    title: 'Cejas Pro Finish',
    description: 'Combo de gel nutritivo, lápiz de precisión y mini spoolie para retocar tu diseño en casa.',
  },
]

const ProductsTeaser = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-pink-100 bg-gradient-to-r from-[#FDECF6] via-white to-[#F8BBD9]/40 p-10 shadow-xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, ease: 'easeOut' }}
              className="space-y-5"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#E57373]/20 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#E57373]">
                Sección de productos
              </span>
              <h2 className="text-3xl font-bold text-[#E57373] md:text-4xl">
                Complementa tu look con nuestros favoritos studio
              </h2>
              <p className="text-gray-600">
                Descubre el catálogo completo en la página de productos. Preparamos kits exclusivos y recomendaciones personalizadas para que tu rutina sea más fácil.
              </p>
              <Link
                to="/productos"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#E57373] transition-colors duration-300 hover:text-[#c84d4d]"
              >
                Ver todos los servicios & productos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>

            <motion.ul
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="space-y-4"
            >
              {highlights.map((item) => (
                <li key={item.title} className="rounded-2xl border border-white/80 bg-white/90 p-5 shadow-sm">
                  <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#E57373]">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    NUEVO FAVORITO
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-gray-800">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductsTeaser
