import { Metadata } from 'next'

const ogImage = '/assets/images/logo_photo.png'
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://crisselstudio.com'

export type SeoProps = {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
}

const defaultMeta = {
  title: 'Crissel Studio | Belleza consciente en Ambato',
  description:
    'Especialistas en extensiones de pestañas, diseño de cejas y maquillaje profesional en Ambato. Vive una experiencia boutique que realza tu mirada.',
  type: 'website' as const,
  image: ogImage,
}

export function generateMetadata({
  title,
  description,
  image,
  url,
  type = 'website',
}: SeoProps = {}): Metadata {
  const resolvedTitle = title ?? defaultMeta.title
  const resolvedDescription = description ?? defaultMeta.description
  const resolvedImage = image ?? defaultMeta.image
  const resolvedUrl = url
    ? new URL(url, siteUrl).toString()
    : new URL('/', siteUrl).toString()

  return {
    metadataBase: new URL(siteUrl),
    title: resolvedTitle,
    description: resolvedDescription,
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      images: [resolvedImage],
      url: resolvedUrl,
      type: type,
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      images: [resolvedImage],
    },
    alternates: {
      canonical: resolvedUrl,
    },
  }
}
