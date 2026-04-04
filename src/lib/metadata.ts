import { Metadata } from 'next'
// Use public folder path for static image
const ogImage = '/assets/images/logo_photo.png'

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
  const resolvedUrl = url ?? 'https://crisselstudio.com'

  return {
    metadataBase: new URL(resolvedUrl),
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

