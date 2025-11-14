import { useMemo } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { blogPosts } from '@/data/blogPosts'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()

  const post = useMemo(() => blogPosts.find((item) => item.slug === slug), [slug])

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-white to-[#FDECF1] px-4 text-center">
        <h1 className="text-3xl font-bold text-[#E57373]">Artículo no encontrado</h1>
        <p className="mt-4 text-gray-600 max-w-md">
          No pudimos encontrar el contenido que buscas. Puede que el enlace haya cambiado o el artículo ya no esté disponible.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#E57373] px-6 py-2 text-sm font-semibold text-[#E57373] transition-colors duration-300 hover:bg-[#E57373] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>
      </div>
    )
  }

  return (
    <article className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-[#FDECF1] py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#E57373]/30 px-4 py-2 text-sm font-semibold text-[#E57373] transition-colors duration-300 hover:border-[#E57373]/60 hover:bg-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al blog
        </Link>

        <SectionHeader
          eyebrow={`${post.category} • ${new Date(post.publishedAt).toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' })}`}
          title={post.title}
          description={`${post.author} • ${post.readingTime}`}
          align="start"
          className="mb-8"
          descriptionClassName="text-[#E57373]"
        />

        <motion.img
          src={post.featuredImage}
          alt={post.title}
          className="mb-8 h-72 w-full rounded-3xl object-cover shadow-lg"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.4 : 0.6, ease: 'easeOut' }}
        />

        <div className="space-y-8 text-base leading-relaxed text-gray-700">
          {post.sections.map((section, index) => {
            if (section.type === 'paragraph') {
              return (
                <motion.p
                  key={index}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: prefersReducedMotion ? 0.4 : 0.5, ease: 'easeOut', delay: index * 0.03 }}
                >
                  {section.content as string}
                </motion.p>
              )
            }

            if (section.type === 'list') {
              return (
                <motion.div
                  key={index}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: prefersReducedMotion ? 0.4 : 0.5, ease: 'easeOut', delay: index * 0.03 }}
                  className="space-y-3"
                >
                  {section.heading ? (
                    <h3 className="text-xl font-semibold text-[#E57373]">{section.heading}</h3>
                  ) : null}
                  <ul className="list-disc space-y-2 pl-5 text-gray-700">
                    {(section.content as string[]).map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              )
            }

            if (section.type === 'quote') {
              return (
                <motion.blockquote
                  key={index}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: prefersReducedMotion ? 0.4 : 0.5, ease: 'easeOut', delay: index * 0.03 }}
                  className="rounded-3xl border border-pink-100 bg-white/80 p-6 text-[#E57373] shadow-sm"
                >
                  “{section.content as string}”
                </motion.blockquote>
              )
            }

            return null
          })}
        </div>
      </div>
    </article>
  )
}

export default BlogPostPage
