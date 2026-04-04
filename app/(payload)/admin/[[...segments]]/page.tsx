import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import configPromise from '../../../../payload.config'
import { importMap } from '../importMap'

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ segments?: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}) {
  // Ensure params is always defined and has segments
  const resolvedParams = await params
  const segments = Array.isArray(resolvedParams?.segments) 
    ? resolvedParams.segments 
    : []
  
  // Ensure searchParams is always defined
  const resolvedSearchParams = await searchParams

  return generatePageMetadata({ 
    config: configPromise,
    params: Promise.resolve({ segments }),
    searchParams: Promise.resolve(resolvedSearchParams || {})
  })
}

export default async function AdminPage({
  params,
  searchParams,
}: {
  params: Promise<{ segments?: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}) {
  // Await params and ensure segments is always an array
  let segments: string[] = []
  try {
    const resolvedParams = await params
    segments = Array.isArray(resolvedParams?.segments) 
      ? resolvedParams.segments 
      : []
  } catch (error) {
    console.error('Error resolving params:', error)
    segments = []
  }
  
  // Await searchParams
  let resolvedSearchParams: { [key: string]: string | string[] } = {}
  try {
    resolvedSearchParams = await searchParams
  } catch (error) {
    console.error('Error resolving searchParams:', error)
    resolvedSearchParams = {}
  }

  return (
    <RootPage
      config={configPromise}
      importMap={importMap}
      params={Promise.resolve({ segments })}
      searchParams={Promise.resolve(resolvedSearchParams)}
    />
  )
}

