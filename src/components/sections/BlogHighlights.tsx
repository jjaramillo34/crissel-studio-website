import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PenTool, Sparkles } from 'lucide-react'

const posts = [
  {
    title: '5 pasos para prolongar tus extensiones',
    excerpt: 'Desde la limpieza diaria hasta los productos prohibidos. Guía rápida para que tus pestañas luzcan impecables por más tiempo.',
    category: 'Extensiones',
    date: 'Abr 2025',
  },
  {
    title: 'Rutina de skincare antes del maquillaje pro',
    excerpt: 'Preparar la piel es la clave del glow. Descubre la rutina recomendada por nuestro team para lograr un acabado perfecto.',
    category: 'Skincare',
    date: 'Mar 2025',
  },
  {
    title: 'Tendencias de cejas 2025',
    excerpt: 'Laminado suave, lifting nutritivo y diseño híbrido. Analizamos qué técnicas favorecen cada tipo de rostro.',
    category: 'Cejas',
    date: 'Feb 2025',
  },
]

const BlogHighlights = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-[#FDF7F9] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 rounded-full border border-[#E57373]/20 bg-white px-5 py-2 text-sm font-medium text-[#E57373] shadow-sm"
          >
            Blog & Tips
          </motion.div>
          <motion.h2
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="text-4xl font-bold text-[#E57373]"
          >
            Consejos para potenciar tu rutina beauty
          </motion.h2>
          <p className="max-w-3xl text-gray-600">
            Compartimos contenido educativo para que disfrutes tus servicios por más tiempo y descubras nuevas tendencias de belleza.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={prefersReducedMotion ? { duration: 0.4 } : { duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
              className="flex h-full flex-col rounded-2xl border border-pink-100 bg-white p-6 shadow-lg"
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#E57373]">
                <PenTool className="h-4 w-4" aria-hidden="true" /> {post.category}
              </div>
              <h3 className="mt-3 text-xl font-bold text-gray-800">{post.title}</h3>
              <p className="mt-3 flex-1 text-sm text-gray-600">{post.excerpt}</p>
              <div className="mt-4 text-xs font-semibold text-[#E57373]/80">{post.date}</div>
              <Link
                to="/blog"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#E57373] transition-colors duration-300 hover:text-[#c84d4d]"
              >
                Leer más
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogHighlights
