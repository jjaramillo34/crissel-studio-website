/**
 * Example script showing how to create content via Payload API
 * Run with: pnpm tsx scripts/create-content-example.ts
 * 
 * Make sure to set PAYLOAD_PUBLIC_SERVER_URL and have a user created first
 */

async function createContentExample() {
  const baseURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
  
  // First, you need to login to get a token
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

  // Example 1: Create a blog post
  console.log('📝 Step 2: Creating a blog post...')
  
  // First, try to get an existing media item for featuredImage
  let featuredImageId = null
  try {
    const mediaResponse = await fetch(`${baseURL}/api/media?limit=1`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
    if (mediaResponse.ok) {
      const mediaData = await mediaResponse.json()
      if (mediaData.docs && mediaData.docs.length > 0) {
        featuredImageId = mediaData.docs[0].id
        console.log(`   Using existing media: ${featuredImageId}`)
      }
    }
  } catch (err) {
    console.log('   No existing media found, will create without featuredImage')
  }

  // Note: Blog collection slug is 'blogs' (plural)
  const timestamp = Date.now()
  const blogPost: any = {
    title: `Test Blog Post ${timestamp}`,
    slug: `test-blog-post-${timestamp}`,
    excerpt: 'A test excerpt for the blog post',
    category: 'Maquillaje',
    author: 'Admin',
    publishedAt: new Date().toISOString(),
    readingTime: '3 min lectura',
    sections: [
      {
        type: 'paragraph',
        content: 'This is a test blog post created via API. The content goes here.',
      },
    ],
  }

  // Only add featuredImage if we have one
  if (featuredImageId) {
    blogPost.featuredImage = featuredImageId
  } else {
    console.log('   ⚠️  Warning: featuredImage is required but no media found. Skipping blog post creation.')
    console.log('   💡 Tip: Upload a media file first, or make featuredImage optional in your collection config.')
    console.log('')
  }

  if (featuredImageId) {
    const blogResponse = await fetch(`${baseURL}/api/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(blogPost),
    })

  if (blogResponse.ok) {
    const createdBlog = await blogResponse.json()
    console.log('✅ Blog post created:', createdBlog.id || createdBlog.doc?.id || 'Success')
    console.log(`   Title: ${blogPost.title}`)
    console.log(`   Slug: ${blogPost.slug}`)
  } else {
    const errorText = await blogResponse.text()
    let errorMessage = errorText
    try {
      const errorJson = JSON.parse(errorText)
      if (errorJson.errors && errorJson.errors.length > 0) {
        errorMessage = errorJson.errors.map((err: any) => 
          err.data?.errors?.map((e: any) => `${e.path}: ${e.message}`).join(', ') || err.message
        ).join('; ')
      }
    } catch {
      // Keep original error text if not JSON
    }
    console.error('❌ Failed to create blog post:', errorMessage)
  }
  }
  console.log('')

  // Example 2: Create a service
  console.log('💼 Step 3: Creating a service...')
  const serviceTimestamp = Date.now()
  const service = {
    name: `Test Service ${serviceTimestamp}`,
    slug: `test-service-${serviceTimestamp}`,
    description: 'This is a test service created via API',
    shortDescription: 'A test service description',
    category: 'extensiones-pestanas',
  }

  const serviceResponse = await fetch(`${baseURL}/api/services`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(service),
  })

  if (serviceResponse.ok) {
    const createdService = await serviceResponse.json()
    console.log('✅ Service created:', createdService.id || createdService.doc?.id || 'Success')
    console.log(`   Name: ${service.name}`)
    console.log(`   Slug: ${service.slug}`)
  } else {
    const errorText = await serviceResponse.text()
    let errorMessage = errorText
    try {
      const errorJson = JSON.parse(errorText)
      if (errorJson.errors && errorJson.errors.length > 0) {
        errorMessage = errorJson.errors.map((err: any) => 
          err.data?.errors?.map((e: any) => `${e.path}: ${e.message}`).join(', ') || err.message
        ).join('; ')
      }
    } catch {
      // Keep original error text if not JSON
    }
    console.error('❌ Failed to create service:', errorMessage)
  }
  console.log('')

  // Example 3: List all blog posts
  console.log('📚 Step 4: Listing all blog posts...')
  const listResponse = await fetch(`${baseURL}/api/blogs?limit=10`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })

  if (listResponse.ok) {
    const data = await listResponse.json()
    console.log(`✅ Found ${data.totalDocs} blog posts:`)
    data.docs.forEach((post: any) => {
      console.log(`   - ${post.title} (${post.slug})`)
    })
  } else {
    const errorText = await listResponse.text()
    console.error('❌ Failed to list blog posts:', errorText)
  }

  console.log('\n✅ Content creation examples completed!')
}

createContentExample().catch(console.error)

