import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const payloadServerUrl =
  process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || process.env.PAYLOAD_PUBLIC_SERVER_URL
const payloadRemotePatterns = [
  {
    protocol: 'http',
    hostname: 'localhost',
    port: '3000',
    pathname: '/media/**',
  },
  {
    protocol: 'http',
    hostname: 'localhost',
    port: '3000',
    pathname: '/api/media/**',
  },
]

if (payloadServerUrl) {
  const payloadUrl = new URL(payloadServerUrl)
  const protocol = payloadUrl.protocol.replace(':', '')
  const port = payloadUrl.port || undefined

  payloadRemotePatterns.push(
    { protocol, hostname: payloadUrl.hostname, port, pathname: '/media/**' },
    { protocol, hostname: payloadUrl.hostname, port, pathname: '/api/media/**' },
  )
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },

  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  
  // Image optimization
  images: {
    remotePatterns: payloadRemotePatterns,
  },
  
  // Note: Don't add 'payload' to transpilePackages - 
  // @payloadcms/next handles this automatically via serverExternalPackages
}

export default withPayload(nextConfig, {
  configPath: path.resolve(__dirname, './payload.config.ts'),
})
