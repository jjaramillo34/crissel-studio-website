'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Seo } from '@/components/Seo'
import Image from 'next/image'
import { payload, getMediaUrl } from '@/lib/payload'

interface BlogPostPageProps {
  slug: string
}

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
  sections: Array<{
    type: string
    content?: string | string[]
    heading?: string
  }>
}

const BlogPostPage = ({ slug }: BlogPostPageProps) => {
  const router = useRouter()
  const prefersReducedMotion = useReducedMotion()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      if (!slug) {
        setError('Slug no proporcionado')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        console.log('Fetching blog post with slug:', slug)
        const fetchedPost = await payload.getBlogBySlug(slug, { depth: 1 })
        console.log('Fetched post:', fetchedPost)
        
        if (fetchedPost) {
          setPost(fetchedPost)
          setError(null)
        } else {
          console.warn('No post found for slug:', slug)
          setError('Artículo no encontrado')
        }
      } catch (err: any) {
        console.error('Error fetching blog post:', err)
        setError(`No se pudo cargar el artículo: ${err.message || 'Error desconocido'}`)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-white to-[#FDECF1] px-4">
        <div className="h-96 w-full max-w-3xl animate-pulse rounded-3xl bg-gray-200" />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-white to-[#FDECF1] px-4 text-center">
        <h1 className="text-3xl font-bold text-[#E57373]">Artículo no encontrado</h1>
        <p className="mt-4 text-gray-600 max-w-md">
          {error || 'No pudimos encontrar el contenido que buscas. Puede que el enlace haya cambiado o el artículo ya no esté disponible.'}
        </p>
        <button
          onClick={() => router.back()}
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
      <Seo
        title={`${post.title} | Blog Crissel Studio`}
        description={post.excerpt}
        image={getMediaUrl(post.featuredImage) || undefined}
        type="article"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
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

        {(() => {
          const imageUrl = getMediaUrl(post.featuredImage)
          return imageUrl ? (
            <motion.div
              className="mb-8 h-72 w-full rounded-3xl overflow-hidden shadow-lg relative"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0.4 : 0.6, ease: 'easeOut' }}
            >
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                className="object-cover"
                unoptimized={imageUrl.startsWith('http://localhost')}
              />
            </motion.div>
          ) : null
        })()}

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
              // Handle list content - it might be a string with newlines or an array
              const listItems = Array.isArray(section.content)
                ? section.content
                : typeof section.content === 'string'
                ? section.content.split('\n').filter(Boolean)
                : []
              
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
                    {listItems.map((item, itemIndex) => (
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
