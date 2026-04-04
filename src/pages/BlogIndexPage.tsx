'use client'

import { useEffect, useState } from 'react'
import { SectionHeader } from '@/components/sections/SectionHeader'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { PenTool } from 'lucide-react'
import { Seo } from '@/components/Seo'
import Image from 'next/image'
import { payload, getMediaUrl } from '@/lib/payload'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  featuredImage: any
  author: string
  publishedAt: string
  readingTime: string
}

const BlogIndexPage = () => {
  const prefersReducedMotion = useReducedMotion()
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        setLoading(true)
        const response = await payload.getBlogs({ limit: 20 })
        setBlogPosts(response.docs)
        setError(null)
      } catch (err: any) {
        console.error('Error fetching blog posts:', err)
        setError('No se pudieron cargar los artículos del blog')
        setBlogPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-[#FDECF1] py-24">
      <Seo
        title="Blog Crissel Studio | Tips de extensiones, cejas y maquillaje"
        description="Lee las últimas recomendaciones de nuestras especialistas en Ambato: extensiones de pestañas, skin prep profesional, tendencias en cejas y más."
        type="article"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Blog Crissel Studio"
          title="Tips y tendencias para realzar tu mirada"
          description="Explora nuestras guías profesionales sobre extensiones, cejas y maquillaje. Queremos que tu belleza resalte dentro y fuera del estudio."
          align="start"
        />

        {loading ? (
          <div className="grid gap-8 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-96 animate-pulse rounded-3xl bg-gray-200" />
            ))}
          </div>
        ) : error || blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {error || 'No hay artículos disponibles en este momento.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts
              .filter((post) => post.slug && typeof post.slug === 'string')
              .map((post, index) => {
                const imageUrl = getMediaUrl(post.featuredImage)
                const slug = String(post.slug)
                
                return (
                  <motion.article
                    key={post.id}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={prefersReducedMotion ? { duration: 0.4 } : { duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
                    className="flex h-full flex-col overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-lg"
                  >
                    <Link href={`/blog/${slug}`} className="group relative block h-56">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        unoptimized={imageUrl.startsWith('http://localhost')}
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-pink-100 to-pink-200" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" aria-hidden="true" />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#E57373] shadow-sm">
                      <PenTool className="h-3.5 w-3.5" aria-hidden="true" /> {post.category}
                    </span>
                  </Link>

                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      <Link href={`/blog/${slug}`} className="transition-colors duration-300 hover:text-[#E57373]">
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
                      href={`/blog/${slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#E57373] transition-colors duration-300 hover:text-[#c84d4d]"
                    >
                      Leer artículo completo
                    </Link>
                  </div>
                </motion.article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogIndexPage
