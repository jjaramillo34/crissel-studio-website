import type { ServerFunctionClient } from 'payload'
import { RootLayout as PayloadRootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import '@payloadcms/next/css'
import configPromise from '../../payload.config'
import { importMap } from './admin/importMap.js'

const serverFunction: ServerFunctionClient = async function serverFunction(args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}

/** Root layout for the Payload admin only; the public site has its own in (marketing). */
export default function PayloadLayout({ children }: { children: React.ReactNode }) {
  return (
    <PayloadRootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </PayloadRootLayout>
  )
}
