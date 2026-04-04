import { REST_GET, REST_POST, REST_PUT, REST_PATCH, REST_DELETE, REST_OPTIONS } from '@payloadcms/next/routes'
import configPromise from '../../../payload.config'

const payloadConfig = configPromise

export const GET = REST_GET(payloadConfig)
export const POST = REST_POST(payloadConfig)
export const PUT = REST_PUT(payloadConfig)
export const PATCH = REST_PATCH(payloadConfig)
export const DELETE = REST_DELETE(payloadConfig)
export const OPTIONS = REST_OPTIONS(payloadConfig)
