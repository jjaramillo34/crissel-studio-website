import { blogPosts } from '@/data/blogPosts'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { PenTool } from 'lucide-react'

const BlogIndexPage = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-[#FDECF1] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Blog Crissel Studio"
          title="Tips y tendencias para realzar tu mirada"
          description="Explora nuestras guías profesionales sobre extensiones, cejas y maquillaje. Queremos que tu belleza resalte dentro y fuera del estudio."
          align="start"
        />

        <div className="grid gap-8 md:grid-cols-2">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={prefersReducedMotion ? { duration: 0.4 } : { duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-lg"
            >
              <Link to={`/blog/${post.slug}`} className="group relative block h-56">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" aria-hidden="true" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#E57373] shadow-sm">
                  <PenTool className="h-3.5 w-3.5" aria-hidden="true" /> {post.category}
                </span>
              </Link>

              <div className="flex flex-1 flex-col gap-4 p-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  <Link to={`/blog/${post.slug}`} className="transition-colors duration-300 hover:text-[#E57373]">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-gray-600">{post.excerpt}</p>
                <div className="mt-auto flex flex-wrap items-center gap-3 text-xs font-semibold text-[#E57373]/80">
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
                  Leer artículo completo
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogIndexPage
