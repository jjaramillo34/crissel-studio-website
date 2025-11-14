import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PenTool, Sparkles } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { blogPosts } from '@/data/blogPosts'

const BlogHighlights = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-[#FDF7F9] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Blog & tips"
          title="Consejos para prolongar tu belleza"
          description="Descubre guías rápidas, tendencias y recomendaciones profesionales para que cada servicio se mantenga radiante desde casa."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={prefersReducedMotion ? { duration: 0.4 } : { duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-lg"
            >
              <Link to={`/blog/${post.slug}`} className="group block h-40 overflow-hidden">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </Link>
              <div className="flex flex-col gap-3 p-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#E57373]">
                  <PenTool className="h-4 w-4" aria-hidden="true" /> {post.category}
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  <Link to={`/blog/${post.slug}`} className="transition-colors duration-300 hover:text-[#E57373]">
                    {post.title}
                  </Link>
                </h3>
                <p className="flex-1 text-sm text-gray-600">{post.excerpt}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#E57373]/80">
                  <span>{new Date(post.publishedAt).toLocaleDateString('es-EC', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  <span className="text-[#E57373]">•</span>
                  <span>{post.readingTime}</span>
                  <span className="text-[#E57373]">•</span>
                  <span>{post.author}</span>
                </div>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#E57373] transition-colors duration-300 hover:text-[#c84d4d]"
                >
                  Leer más
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogHighlights
