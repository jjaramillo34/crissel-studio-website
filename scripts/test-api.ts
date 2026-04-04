/**
 * Test script to verify Payload CMS API is working
 * Run with: pnpm tsx scripts/test-api.ts
 */

async function testPayloadAPI() {
  const baseURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
  
  console.log('🧪 Testing Payload CMS API...\n')
  console.log(`Base URL: ${baseURL}\n`)

  // Test 1: Check if API is accessible
  console.log('1️⃣ Testing API accessibility...')
  try {
    const response = await fetch(`${baseURL}/api/users`)
    const data = await response.json()
    console.log('✅ API is accessible!')
    console.log(`   Status: ${response.status}`)
    console.log(`   Users found: ${data.totalDocs || 0}`)
    console.log('')
  } catch (error) {
    console.error('❌ API test failed:', error)
    return
  }

  // Test 2: List collections
  console.log('2️⃣ Testing collections endpoint...')
  try {
    // Note: Collection slugs must match exactly (Blog is 'blogs', Service is 'services')
    const collections = ['users', 'media', 'blogs', 'services', 'gallery', 'team', 'testimonial']
    
    for (const collection of collections) {
      try {
        const response = await fetch(`${baseURL}/api/${collection}?limit=1`)
        if (response.ok) {
          const data = await response.json()
          console.log(`   ✅ ${collection}: ${data.totalDocs || 0} documents`)
        } else {
          const errorText = await response.text()
          console.log(`   ⚠️  ${collection}: ${response.status} - ${errorText.substring(0, 50)}`)
        }
      } catch (err: any) {
        console.log(`   ⚠️  ${collection}: ${err.message}`)
      }
    }
    console.log('')
  } catch (error) {
    console.error('❌ Collections test failed:', error)
  }

  // Test 3: Test authentication (if you have credentials)
  console.log('3️⃣ Testing authentication...')
  console.log('   (Skipping - requires credentials)')
  console.log('')

  console.log('✅ API tests completed!')
  console.log('\n📝 You can use the API endpoints:')
  console.log(`   GET  ${baseURL}/api/{collection}`)
  console.log(`   POST ${baseURL}/api/{collection}`)
  console.log(`   GET  ${baseURL}/api/{collection}/{id}`)
  console.log(`   PATCH ${baseURL}/api/{collection}/{id}`)
  console.log(`   DELETE ${baseURL}/api/{collection}/{id}`)
}

testPayloadAPI().catch(console.error)

