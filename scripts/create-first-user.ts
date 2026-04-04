import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function createFirstUser() {
  try {
    const payload = await getPayload({ config: configPromise })
    
    // Check if users already exist
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (existingUsers.totalDocs > 0) {
      console.log('✅ Admin user already exists!')
      console.log(`Total users: ${existingUsers.totalDocs}`)
      return
    }

    // Create first admin user
    const email = process.env.ADMIN_EMAIL || 'admin@crisselstudio.com'
    const password = process.env.ADMIN_PASSWORD || 'admin123'
    const name = process.env.ADMIN_NAME || 'Admin User'

    console.log(`Creating first admin user: ${email}`)

    const user = await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        name,
      },
    })

    console.log('✅ First admin user created successfully!')
    console.log(`Email: ${user.email}`)
    console.log(`Name: ${user.name}`)
    console.log(`\nYou can now login at http://localhost:3000/admin`)
    console.log(`Email: ${email}`)
    console.log(`Password: ${password}`)
  } catch (error) {
    console.error('❌ Error creating user:', error)
    process.exit(1)
  }
}

createFirstUser()

