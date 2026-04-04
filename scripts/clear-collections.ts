/**
 * Script to clear all collections (use with caution!)
 * Run with: pnpm tsx scripts/clear-collections.ts
 * 
 * This will delete ALL data from the specified collections.
 * Make sure you want to do this before running!
 */

async function clearCollections() {
  const baseURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
  
  console.log('⚠️  WARNING: This will delete ALL data from collections!\n')
  
  // Login
  console.log('🔐 Logging in...')
  const loginResponse = await fetch(`${baseURL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: process.env.ADMIN_EMAIL || 'admin@crisselstudio.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
    }),
  })

  if (!loginResponse.ok) {
    console.error('❌ Login failed:', await loginResponse.text())
    return
  }

  const { token } = await loginResponse.json()
  console.log('✅ Logged in successfully!\n')

  const headers = {
    Authorization: `JWT ${token}`,
  }

  // Collections to clear (excluding users to keep admin account)
  const collections = [
    { name: 'blogs', slug: 'blogs' },
    { name: 'services', slug: 'services' },
    { name: 'testimonials', slug: 'testimonials' },
    { name: 'gallery', slug: 'gallery' },
    { name: 'team', slug: 'team' },
    // Note: We're NOT clearing 'users' or 'media' to keep admin and uploaded files
  ]

  console.log('🗑️  Clearing collections...\n')

  for (const collection of collections) {
    try {
      // First, get all documents
      const listResponse = await fetch(`${baseURL}/api/${collection.slug}?limit=1000`, {
        headers,
      })

      if (!listResponse.ok) {
        console.log(`   ⚠️  ${collection.name}: Could not fetch (might be empty)`)
        continue
      }

      const data = await listResponse.json()
      const docs = data.docs || []
      
      if (docs.length === 0) {
        console.log(`   ✅ ${collection.name}: Already empty`)
        continue
      }

      console.log(`   📋 ${collection.name}: Found ${docs.length} documents`)

      // Delete each document
      let deleted = 0
      for (const doc of docs) {
        try {
          const deleteResponse = await fetch(`${baseURL}/api/${collection.slug}/${doc.id}`, {
            method: 'DELETE',
            headers,
          })

          if (deleteResponse.ok) {
            deleted++
          }
        } catch (error: any) {
          console.log(`      ⚠️  Failed to delete ${doc.id}: ${error.message}`)
        }
      }

      console.log(`   ✅ ${collection.name}: Deleted ${deleted}/${docs.length} documents`)
    } catch (error: any) {
      console.log(`   ❌ ${collection.name}: ${error.message}`)
    }
  }

  console.log('\n✅ Collection clearing completed!')
  console.log('\n💡 You can now run: pnpm seed-data')
}

clearCollections().catch(console.error)

