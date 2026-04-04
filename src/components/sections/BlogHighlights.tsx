'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { PenTool, Sparkles } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
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

const BlogHighlights = () => {
  const prefersReducedMotion = useReducedMotion()
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        setLoading(true)
        const response = await payload.getBlogs({ limit: 3 })
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

  if (loading) {
    return (
      <section className="section-brand-alt py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Blog & tips"
            title="Consejos para prolongar tu belleza"
            description="Descubre guías rápidas, tendencias y recomendaciones profesionales para que cada servicio se mantenga radiante desde casa."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl bg-gray-200" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error || blogPosts.length === 0) {
    return (
      <section className="section-brand-alt py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Blog & tips"
            title="Consejos para prolongar tu belleza"
            description="Descubre guías rápidas, tendencias y recomendaciones profesionales para que cada servicio se mantenga radiante desde casa."
          />
          {error && (
            <p className="text-center text-gray-500">{error}</p>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="section-brand-alt py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Blog & tips"
          title="Consejos para prolongar tu belleza"
          description="Descubre guías rápidas, tendencias y recomendaciones profesionales para que cada servicio se mantenga radiante desde casa."
        />

        <div className="grid gap-6 md:grid-cols-3">
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
                  viewport={{ once: true, amount: 0.4 }}
                  transition={prefersReducedMotion ? { duration: 0.4 } : { duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-rose-200/70 bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <Link href={`/blog/${slug}`} className="group relative block h-40 overflow-hidden">
                  {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                        unoptimized={imageUrl.startsWith('http://localhost')}
                      />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-pink-100 to-pink-200" />
                  )}
                </Link>
                <div className="flex flex-col gap-3 p-6">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#E57373]">
                    <PenTool className="h-4 w-4" aria-hidden="true" /> {post.category}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    <Link href={`/blog/${slug}`} className="transition-colors duration-300 hover:text-[#E57373]">
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
                    href={`/blog/${slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#E57373] transition-colors duration-300 hover:text-[#c84d4d]"
                  >
                    Leer más
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BlogHighlights
