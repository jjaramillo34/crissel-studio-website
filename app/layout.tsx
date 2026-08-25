import type { Metadata } from 'next'
import type { ServerFunctionClient } from 'payload'
import { RootLayout as PayloadRootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import '@payloadcms/next/css'
import '../src/global.css'
import configPromise from '../payload.config'
import { importMap } from './(payload)/admin/importMap.js'

export const metadata: Metadata = {
  title: 'Crissel Studio',
  description: 'Estudio de belleza en Ambato.',
}

const serverFunction: ServerFunctionClient = async function serverFunction(args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <PayloadRootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </PayloadRootLayout>
  )
}
