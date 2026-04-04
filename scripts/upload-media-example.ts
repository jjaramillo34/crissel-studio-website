/**
 * Example script showing how to upload media via Payload API
 * Run with: pnpm tsx scripts/upload-media-example.ts
 * 
 * This creates a media item that can be used for blog post featuredImage
 */

import { readFileSync } from 'fs'
import { join } from 'path'

async function uploadMediaExample() {
  const baseURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
  
  console.log('🔐 Step 1: Login to get authentication token...')
  
  const loginResponse = await fetch(`${baseURL}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: process.env.ADMIN_EMAIL || 'admin@crisselstudio.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
    }),
  })

  if (!loginResponse.ok) {
    console.error('❌ Login failed:', await loginResponse.text())
    return
  }

  const loginData = await loginResponse.json()
  const token = loginData.token
  console.log('✅ Logged in successfully!\n')

  // Example: Upload a media file
  console.log('📤 Step 2: Uploading media file...')
  
  // Option 1: Upload from a file path (if you have an image file)
  // For this example, we'll create a simple text file or use an existing image
  const imagePath = join(process.cwd(), 'public', 'assets', 'images', 'hero.jpg')
  
  try {
    // Try to read an existing image file
    const imageBuffer = readFileSync(imagePath)
    
    // Create FormData for file upload
    const formData = new FormData()
    const blob = new Blob([imageBuffer])
    const file = new File([blob], 'hero.jpg', { type: 'image/jpeg' })
    formData.append('file', file)
    
    // Optional: Add alt text
    formData.append('alt', 'Hero image for blog post')

    const uploadResponse = await fetch(`${baseURL}/api/media`, {
      method: 'POST',
      headers: {
        Authorization: `JWT ${token}`,
        // Don't set Content-Type - browser will set it with boundary for FormData
      },
      body: formData,
    })

    if (uploadResponse.ok) {
      const uploadedMedia = await uploadResponse.json()
      console.log('✅ Media uploaded successfully!')
      console.log(`   ID: ${uploadedMedia.id || uploadedMedia.doc?.id}`)
      console.log(`   Filename: ${uploadedMedia.filename}`)
      console.log(`   URL: ${uploadedMedia.url}`)
      console.log('\n💡 You can now use this media ID for blog post featuredImage!')
      return uploadedMedia.id || uploadedMedia.doc?.id
    } else {
      const errorText = await uploadResponse.text()
      console.error('❌ Failed to upload media:', errorText)
    }
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.log('⚠️  Image file not found at:', imagePath)
      console.log('💡 Alternative: You can upload media via:')
      console.log(`   curl -X POST ${baseURL}/api/media \\`)
      console.log(`     -H "Authorization: JWT {token}" \\`)
      console.log(`     -F "file=@/path/to/image.jpg"`)
    } else {
      console.error('❌ Error:', error.message)
    }
  }

  console.log('\n✅ Media upload example completed!')
}

uploadMediaExample().catch(console.error)

