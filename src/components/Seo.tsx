'use client'

import { useEffect } from 'react'
// Use public folder path for static image
const ogImage = '/assets/images/logo_photo.png'

const defaultMeta = {
  title: 'Crissel Studio | Belleza consciente en Ambato',
  description:
    'Especialistas en extensiones de pestañas, diseño de cejas y maquillaje profesional en Ambato. Vive una experiencia boutique que realza tu mirada.',
  type: 'website',
  image: ogImage,
}

const setMeta = (key: 'name' | 'property', value: string, content?: string) => {
  const selector = `meta[${key}="${value}"]`
  let element = document.head.querySelector(selector) as HTMLMetaElement | null

  if (!content) {
    if (element) {
      document.head.removeChild(element)
    }
    return
  }

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(key, value)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

const setCanonical = (url: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = url
}

export type SeoProps = {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
}

export const Seo = ({ title, description, image, url, type = 'website' }: SeoProps) => {
  useEffect(() => {
    const resolvedTitle = title ?? defaultMeta.title
    const resolvedDescription = description ?? defaultMeta.description
    const resolvedImage = image ?? defaultMeta.image
    const resolvedUrl = url ?? window.location.href
    const resolvedType = type ?? defaultMeta.type

    document.title = resolvedTitle

    setMeta('name', 'description', resolvedDescription)
    setMeta('property', 'og:title', resolvedTitle)
    setMeta('property', 'og:description', resolvedDescription)
    setMeta('property', 'og:image', resolvedImage)
    setMeta('property', 'og:url', resolvedUrl)
    setMeta('property', 'og:type', resolvedType)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', resolvedTitle)
    setMeta('name', 'twitter:description', resolvedDescription)
    setMeta('name', 'twitter:image', resolvedImage)

    setCanonical(resolvedUrl)
  }, [title, description, image, url, type])

  return null
}
