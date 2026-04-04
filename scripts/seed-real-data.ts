/**
 * Script to seed real data for Crissel Studio
 * Run with: pnpm tsx scripts/seed-real-data.ts
 */

async function seedRealData() {
  const baseURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
  
  console.log('🌱 Seeding real data for Crissel Studio...\n')
  
  // Step 1: Login
  console.log('🔐 Step 1: Logging in...')
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
    'Content-Type': 'application/json',
    Authorization: `JWT ${token}`,
  }

  // Step 2: Get or create media
  console.log('📸 Step 2: Checking for media...')
  let featuredImageId = null
  const mediaResponse = await fetch(`${baseURL}/api/media?limit=1`, {
    headers: { Authorization: `JWT ${token}` },
  })
  
  if (mediaResponse.ok) {
    const mediaData = await mediaResponse.json()
    if (mediaData.docs && mediaData.docs.length > 0) {
      featuredImageId = mediaData.docs[0].id
      console.log(`✅ Using existing media: ${featuredImageId}\n`)
    }
  }

  if (!featuredImageId) {
    console.log('⚠️  No media found. Blog posts will be created without featuredImage.\n')
  }

  // Step 3: Create Real Blog Posts
  console.log('📝 Step 3: Creating blog posts...')
  const blogPosts = [
    {
      title: 'Guía Completa de Extensiones de Pestañas: Todo lo que Necesitas Saber',
      slug: 'guia-completa-extensiones-pestanas',
      excerpt: 'Descubre todo sobre las extensiones de pestañas: tipos, cuidados, duración y consejos profesionales para mantenerlas perfectas.',
      category: 'Pestañas',
      author: 'Crissel Studio',
      publishedAt: new Date('2024-11-01').toISOString(),
      readingTime: '8 min lectura',
      sections: [
        {
          type: 'paragraph',
          content: 'Las extensiones de pestañas se han convertido en uno de los tratamientos de belleza más populares. Si estás considerando hacerte extensiones o ya las tienes, esta guía te ayudará a entender todo lo necesario.',
        },
        {
          heading: 'Tipos de Extensiones de Pestañas',
          type: 'paragraph',
          content: 'Existen diferentes tipos de extensiones según el efecto deseado: clásicas, volumen ruso, híbridas y mega volumen. Cada una ofrece un resultado único.',
        },
        {
          type: 'list',
          content: 'Clásicas: Una extensión por pestaña natural\nVolumen Ruso: Múltiples extensiones finas por pestaña\nHíbridas: Combinación de clásicas y volumen\nMega Volumen: Máximo volumen y densidad',
        },
        {
          heading: 'Cuidados Esenciales',
          type: 'paragraph',
          content: 'Para mantener tus extensiones en perfecto estado, es importante evitar el agua las primeras 24 horas, no usar rímel a base de aceite, y cepillarlas diariamente con un cepillo especial.',
        },
        {
          type: 'quote',
          content: 'La clave para extensiones duraderas es el cuidado constante y los retoques regulares cada 2-3 semanas.',
        },
      ],
      featuredImage: featuredImageId,
    },
    {
      title: 'Microblading: La Solución Definitiva para Cejas Perfectas',
      slug: 'microblading-solucion-cejas-perfectas',
      excerpt: 'El microblading es una técnica semipermanente que te dará cejas perfectas durante meses. Conoce todo sobre este tratamiento revolucionario.',
      category: 'Cejas',
      author: 'Crissel Studio',
      publishedAt: new Date('2024-11-15').toISOString(),
      readingTime: '6 min lectura',
      sections: [
        {
          type: 'paragraph',
          content: 'El microblading ha revolucionado el mundo de la belleza, ofreciendo una solución semipermanente para tener cejas perfectas sin necesidad de maquillaje diario.',
        },
        {
          heading: '¿Qué es el Microblading?',
          type: 'paragraph',
          content: 'El microblading es una técnica de micropigmentación que utiliza una herramienta manual con agujas finas para crear trazos que imitan el vello natural de las cejas.',
        },
        {
          heading: 'Proceso y Duración',
          type: 'list',
          content: 'Consulta inicial y diseño de cejas\nAplicación del microblading (2-3 horas)\nSesión de retoque a las 4-6 semanas\nDuración: 12-18 meses',
        },
        {
          type: 'paragraph',
          content: 'El resultado es natural y personalizado, adaptándose a tu rostro y estilo personal.',
        },
      ],
      featuredImage: featuredImageId,
    },
    {
      title: 'Maquillaje Social: Tips para Eventos Especiales',
      slug: 'maquillaje-social-tips-eventos',
      excerpt: 'Aprende los secretos del maquillaje social para lucir impecable en tus eventos especiales. Técnicas profesionales y productos recomendados.',
      category: 'Maquillaje',
      author: 'Crissel Studio',
      publishedAt: new Date('2024-11-20').toISOString(),
      readingTime: '7 min lectura',
      sections: [
        {
          type: 'paragraph',
          content: 'El maquillaje social es perfecto para eventos especiales como bodas, quinceañeras, graduaciones y celebraciones importantes. Requiere técnicas específicas para lograr un acabado duradero y fotogénico.',
        },
        {
          heading: 'Preparación de la Piel',
          type: 'paragraph',
          content: 'La base de un buen maquillaje social es una piel bien preparada. Limpieza, hidratación y primer son esenciales para un acabado perfecto.',
        },
        {
          heading: 'Técnicas Profesionales',
          type: 'list',
          content: 'Corrección de color para unificar tonos\nContorno y resaltado para definir facciones\nMaquillaje de ojos con sombras duraderas\nLabios definidos y de larga duración',
        },
        {
          type: 'quote',
          content: 'Un maquillaje social bien ejecutado puede durar hasta 12 horas sin necesidad de retoques.',
        },
      ],
      featuredImage: featuredImageId,
    },
    {
      title: 'Planchado de Cejas: La Técnica que Está Revolucionando el Cuidado de Cejas',
      slug: 'planchado-cejas-tecnica-revolucionaria',
      excerpt: 'Descubre el planchado de cejas, una técnica innovadora que alisa y define tus cejas de forma semipermanente. Perfecto para cejas rebeldes.',
      category: 'Cejas',
      author: 'Crissel Studio',
      publishedAt: new Date('2024-12-01').toISOString(),
      readingTime: '5 min lectura',
      sections: [
        {
          type: 'paragraph',
          content: 'El planchado de cejas es una técnica relativamente nueva que está ganando popularidad por su capacidad de alisar y definir cejas de forma semipermanente.',
        },
        {
          heading: '¿En qué Consiste?',
          type: 'paragraph',
          content: 'El planchado utiliza una solución especial que relaja la estructura del vello, permitiendo que las cejas se mantengan en la forma deseada durante semanas.',
        },
        {
          heading: 'Beneficios',
          type: 'list',
          content: 'Cejas perfectamente definidas sin maquillaje\nDuración de 4-6 semanas\nIdeal para cejas rebeldes o desordenadas\nResultado natural y elegante',
        },
        {
          type: 'paragraph',
          content: 'Es perfecto para quienes buscan una solución de bajo mantenimiento para tener cejas perfectas todos los días.',
        },
      ],
      featuredImage: featuredImageId,
    },
  ]

  let createdBlogs = 0
  let skippedBlogs = 0
  for (const post of blogPosts) {
    try {
      // Check if blog post with this slug already exists
      const checkResponse = await fetch(`${baseURL}/api/blogs?where[slug][equals]=${post.slug}`, {
        headers: { Authorization: `JWT ${token}` },
      })

      if (checkResponse.ok) {
        const checkData = await checkResponse.json()
        if (checkData.docs && checkData.docs.length > 0) {
          console.log(`   ⏭️  "${post.title}" - Already exists (slug: ${post.slug})`)
          skippedBlogs++
          continue
        }
      }

      const response = await fetch(`${baseURL}/api/blogs`, {
        method: 'POST',
        headers,
        body: JSON.stringify(post),
      })

      if (response.ok) {
        const created = await response.json()
        console.log(`   ✅ "${post.title}"`)
        createdBlogs++
      } else {
        const errorText = await response.text()
        let errorMessage = errorText
        try {
          const errorJson = JSON.parse(errorText)
          if (errorJson.errors && errorJson.errors.length > 0) {
            errorMessage = errorJson.errors.map((err: any) => 
              err.data?.errors?.map((e: any) => `${e.path}: ${e.message}`).join(', ') || err.message
            ).join('; ')
          }
        } catch {
          // Keep original error text
        }
        console.log(`   ❌ "${post.title}" - ${errorMessage.substring(0, 150)}`)
      }
    } catch (error: any) {
      console.log(`   ❌ "${post.title}" - ${error.message}`)
    }
  }
  console.log(`\n✅ Created ${createdBlogs}/${blogPosts.length} blog posts${skippedBlogs > 0 ? ` (${skippedBlogs} already existed)` : ''}\n`)

  // Step 4: Create Real Services
  console.log('💼 Step 4: Creating services...')
  const services = [
    {
      name: 'Extensiones de Pestañas Clásicas',
      slug: 'extensiones-pestanas-clasicas',
      description: 'Extensiones de pestañas clásicas que añaden longitud y volumen de forma natural. Una extensión por pestaña natural para un look elegante y sofisticado. Perfecto para uso diario y eventos especiales.',
      shortDescription: 'Extensiones naturales que añaden longitud y volumen',
      category: 'extensiones-pestanas',
      duration: '2 horas',
      features: [
        { feature: 'Duración de 3-4 semanas' },
        { feature: 'Look natural y elegante' },
        { feature: 'Aplicación profesional' },
        { feature: 'Materiales de alta calidad' },
        { feature: 'Retoques incluidos' },
      ],
      isFeatured: true,
    },
    {
      name: 'Extensiones de Pestañas Volumen Ruso',
      slug: 'extensiones-pestanas-volumen-ruso',
      description: 'Técnica avanzada de volumen ruso que crea un efecto dramático y voluminoso. Múltiples extensiones finas por pestaña natural para un look impactante y glamuroso. Ideal para ocasiones especiales.',
      shortDescription: 'Volumen máximo con técnica rusa profesional',
      category: 'extensiones-pestanas',
      duration: '3 horas',
      features: [
        { feature: 'Efecto dramático y voluminoso' },
        { feature: 'Técnica rusa avanzada' },
        { feature: 'Hasta 5 extensiones por pestaña' },
        { feature: 'Duración de 4-5 semanas' },
        { feature: 'Look glamuroso y sofisticado' },
      ],
      isFeatured: true,
    },
    {
      name: 'Microblading de Cejas',
      slug: 'microblading-cejas',
      description: 'Técnica semipermanente de micropigmentación que crea trazos que imitan el vello natural. Cejas perfectas durante 12-18 meses sin necesidad de maquillaje diario. Diseño personalizado según tu rostro.',
      shortDescription: 'Cejas perfectas semipermanentes con microblading',
      category: 'microblading',
      duration: '2.5 horas',
      features: [
        { feature: 'Duración de 12-18 meses' },
        { feature: 'Diseño personalizado' },
        { feature: 'Aspecto completamente natural' },
        { feature: 'Sesión de retoque incluida' },
        { feature: 'Sin necesidad de maquillaje diario' },
      ],
      isFeatured: true,
    },
    {
      name: 'Planchado de Cejas',
      slug: 'planchado-cejas',
      description: 'Técnica innovadora que alisa y define tus cejas de forma semipermanente. Perfecto para cejas rebeldes o desordenadas. Resultado natural que dura 4-6 semanas.',
      shortDescription: 'Cejas definidas y alisadas de forma semipermanente',
      category: 'planchado-cejas',
      duration: '1 hora',
      features: [
        { feature: 'Duración de 4-6 semanas' },
        { feature: 'Ideal para cejas rebeldes' },
        { feature: 'Resultado natural' },
        { feature: 'Bajo mantenimiento' },
        { feature: 'Aplicación rápida' },
      ],
      isFeatured: false,
    },
    {
      name: 'Diseño de Cejas',
      slug: 'diseno-cejas',
      description: 'Servicio profesional de diseño y depilación de cejas. Análisis facial personalizado para crear la forma perfecta que realza tus facciones naturales.',
      shortDescription: 'Diseño profesional de cejas personalizado',
      category: 'diseno-cejas',
      duration: '45 minutos',
      features: [
        { feature: 'Análisis facial personalizado' },
        { feature: 'Diseño según tu rostro' },
        { feature: 'Depilación profesional' },
        { feature: 'Cejas simétricas y definidas' },
        { feature: 'Asesoramiento de mantenimiento' },
      ],
      isFeatured: false,
    },
    {
      name: 'Maquillaje Social',
      slug: 'maquillaje-social',
      description: 'Maquillaje profesional para eventos especiales: bodas, quinceañeras, graduaciones. Técnicas duraderas y fotogénicas que te harán lucir impecable durante todo el evento.',
      shortDescription: 'Maquillaje profesional para eventos especiales',
      category: 'maquillaje',
      duration: '2 horas',
      features: [
        { feature: 'Duración de hasta 12 horas' },
        { feature: 'Técnicas fotogénicas' },
        { feature: 'Productos de alta calidad' },
        { feature: 'Prueba previa incluida' },
        { feature: 'Maquillaje de novia disponible' },
      ],
      isFeatured: true,
    },
    {
      name: 'Maquillaje de Novia',
      slug: 'maquillaje-novia',
      description: 'Servicio especializado de maquillaje para novias. Consulta previa, prueba de maquillaje y aplicación el día de la boda. Look perfecto y duradero para tu día especial.',
      shortDescription: 'Maquillaje especializado para el día de tu boda',
      category: 'maquillaje',
      duration: '2.5 horas',
      features: [
        { feature: 'Consulta y prueba previa' },
        { feature: 'Aplicación el día del evento' },
        { feature: 'Productos resistentes al agua' },
        { feature: 'Look personalizado' },
        { feature: 'Acompañamiento durante el evento' },
      ],
      isFeatured: true,
    },
  ]

  let createdServices = 0
  let skippedServices = 0
  for (const service of services) {
    try {
      // Check if service with this slug already exists
      const checkResponse = await fetch(`${baseURL}/api/services?where[slug][equals]=${service.slug}`, {
        headers: { Authorization: `JWT ${token}` },
      })

      if (checkResponse.ok) {
        const checkData = await checkResponse.json()
        if (checkData.docs && checkData.docs.length > 0) {
          console.log(`   ⏭️  "${service.name}" - Already exists (slug: ${service.slug})`)
          skippedServices++
          continue
        }
      }

      const response = await fetch(`${baseURL}/api/services`, {
        method: 'POST',
        headers,
        body: JSON.stringify(service),
      })

      if (response.ok) {
        const created = await response.json()
        console.log(`   ✅ "${service.name}"`)
        createdServices++
      } else {
        const errorText = await response.text()
        let errorMessage = errorText
        try {
          const errorJson = JSON.parse(errorText)
          if (errorJson.errors && errorJson.errors.length > 0) {
            errorMessage = errorJson.errors.map((err: any) => {
              if (err.data?.errors) {
                return err.data.errors.map((e: any) => `${e.path}: ${e.message}`).join(', ')
              }
              return err.message || JSON.stringify(err)
            }).join('; ')
          }
        } catch {
          // Keep original error text if not JSON
        }
        console.log(`   ❌ "${service.name}" - ${errorMessage.substring(0, 150)}`)
      }
    } catch (error: any) {
      console.log(`   ❌ "${service.name}" - ${error.message}`)
    }
  }
  console.log(`\n✅ Created ${createdServices}/${services.length} services${skippedServices > 0 ? ` (${skippedServices} already existed)` : ''}\n`)

  // Step 5: Create Testimonials
  console.log('💬 Step 5: Creating testimonials...')
  const testimonials = [
    {
      name: 'María González',
      content: '¡Increíble experiencia! Las extensiones de pestañas quedaron perfectas y duraron más de un mes. El equipo es muy profesional y el ambiente es acogedor. Definitivamente volveré.',
      rating: 5,
    },
    {
      name: 'Ana Martínez',
      content: 'El microblading cambió mi vida. Ya no necesito maquillarme las cejas todos los días y se ven completamente naturales. El proceso fue cómodo y los resultados superaron mis expectativas.',
      rating: 5,
    },
    {
      name: 'Laura Rodríguez',
      content: 'Me hice el maquillaje social para mi boda y fue perfecto. Duró todo el día y me vi increíble en todas las fotos. La profesional que me atendió fue muy detallista y paciente.',
      rating: 5,
    },
    {
      name: 'Carmen López',
      content: 'El planchado de cejas es genial. Mis cejas siempre están perfectas sin esfuerzo. El servicio es rápido y el resultado dura semanas. Muy recomendado.',
      rating: 5,
    },
    {
      name: 'Sofía Pérez',
      content: 'Excelente atención y resultados. Las extensiones volumen ruso quedaron espectaculares. El equipo es muy profesional y siempre están al día con las últimas técnicas.',
      rating: 5,
    },
  ]

  let createdTestimonials = 0
  let skippedTestimonials = 0
  for (const testimonial of testimonials) {
    try {
      // Check if testimonial from this person already exists
      const checkResponse = await fetch(`${baseURL}/api/testimonials?where[name][equals]=${encodeURIComponent(testimonial.name)}`, {
        headers: { Authorization: `JWT ${token}` },
      })

      if (checkResponse.ok) {
        const checkData = await checkResponse.json()
        if (checkData.docs && checkData.docs.length > 0) {
          console.log(`   ⏭️  Testimonial from ${testimonial.name} - Already exists`)
          skippedTestimonials++
          continue
        }
      }

      const response = await fetch(`${baseURL}/api/testimonials`, {
        method: 'POST',
        headers,
        body: JSON.stringify(testimonial),
      })

      if (response.ok) {
        console.log(`   ✅ Testimonial from ${testimonial.name}`)
        createdTestimonials++
      } else {
        const error = await response.text()
        console.log(`   ⚠️  ${testimonial.name} - ${error.substring(0, 100)}`)
      }
    } catch (error: any) {
      console.log(`   ❌ ${testimonial.name} - ${error.message}`)
    }
  }
  console.log(`\n✅ Created ${createdTestimonials}/${testimonials.length} testimonials${skippedTestimonials > 0 ? ` (${skippedTestimonials} already existed)` : ''}\n`)

  // Step 6: Create Team Members
  console.log('👥 Step 6: Creating team members...')
  const teamMembers = [
    {
      name: 'Cris León',
      role: 'Master Lash & Brow Artist',
      bio: 'Certificaciones: Lash Institute 2018, Keratina Expert 2020, Lash Lift Advanced. Especialista en extensiones volumen, diseño de cejas laminadas y lifting de cejas.',
      specialties: [
        { specialty: 'Extensiones volumen' },
        { specialty: 'Diseño de cejas laminadas' },
        { specialty: 'Lifting de cejas' },
      ],
      photo: featuredImageId, // Using existing media, will need to upload team photos separately
      order: 1,
    },
    {
      name: 'Sofy Jaramillo',
      role: 'Makeup Lead Artist',
      bio: 'Certificada en Unidad Educativa Ecuatoriano Holandés. Especialista en maquillaje social, visagismo personalizado y maquillaje para eventos.',
      specialties: [
        { specialty: 'Maquillaje social' },
        { specialty: 'Visagismo personalizado' },
        { specialty: 'Maquillaje para eventos' },
      ],
      photo: featuredImageId, // Using existing media, will need to upload team photos separately
      order: 2,
    },
    {
      name: 'Betty León',
      role: 'Skin & Lash Care Specialist',
      bio: 'Certificada en Cosmetología ISPED. Especialista en tratamientos nutritivos y planes de mantenimiento para pestañas y cejas.',
      specialties: [
        { specialty: 'Tratamientos nutritivos' },
        { specialty: 'Planes de mantenimiento para pestañas' },
        { specialty: 'Planes de mantenimiento para cejas' },
      ],
      photo: featuredImageId, // Using existing media, will need to upload team photos separately
      order: 3,
    },
  ]

  let createdTeam = 0
  let skippedTeam = 0
  for (const member of teamMembers) {
    try {
      // Check if team member with this name already exists
      const checkResponse = await fetch(`${baseURL}/api/team?where[name][equals]=${encodeURIComponent(member.name)}`, {
        headers: { Authorization: `JWT ${token}` },
      })

      if (checkResponse.ok) {
        const checkData = await checkResponse.json()
        if (checkData.docs && checkData.docs.length > 0) {
          console.log(`   ⏭️  "${member.name}" - Already exists`)
          skippedTeam++
          continue
        }
      }

      // Skip if no photo available (photo is required)
      if (!member.photo) {
        console.log(`   ⚠️  "${member.name}" - Skipped (photo is required, upload team photos first)`)
        continue
      }

      const response = await fetch(`${baseURL}/api/team`, {
        method: 'POST',
        headers,
        body: JSON.stringify(member),
      })

      if (response.ok) {
        console.log(`   ✅ "${member.name}"`)
        createdTeam++
      } else {
        const errorText = await response.text()
        let errorMessage = errorText
        try {
          const errorJson = JSON.parse(errorText)
          if (errorJson.errors && errorJson.errors.length > 0) {
            errorMessage = errorJson.errors.map((err: any) => {
              if (err.data?.errors) {
                return err.data.errors.map((e: any) => `${e.path}: ${e.message}`).join(', ')
              }
              return err.message || JSON.stringify(err)
            }).join('; ')
          }
        } catch {
          // Keep original error text if not JSON
        }
        console.log(`   ❌ "${member.name}" - ${errorMessage.substring(0, 150)}`)
      }
    } catch (error: any) {
      console.log(`   ❌ "${member.name}" - ${error.message}`)
    }
  }
  console.log(`\n✅ Created ${createdTeam}/${teamMembers.length} team members${skippedTeam > 0 ? ` (${skippedTeam} already existed)` : ''}\n`)

  if (createdTeam < teamMembers.length && !featuredImageId) {
    console.log('💡 Note: Some team members were skipped because photos are required.')
    console.log('   Upload team photos to the Media collection first, then update the script to use specific photo IDs.\n')
  }

  // Summary
  console.log('📊 Summary:')
  console.log(`   Blog Posts: ${createdBlogs}`)
  console.log(`   Services: ${createdServices}`)
  console.log(`   Testimonials: ${createdTestimonials}`)
  console.log(`   Team Members: ${createdTeam}`)
  console.log('\n✅ Real data seeding completed!')
  console.log('\n💡 You can now view your content at:')
  console.log(`   Blog: ${baseURL}/api/blogs`)
  console.log(`   Services: ${baseURL}/api/services`)
  console.log(`   Testimonials: ${baseURL}/api/testimonials`)
  console.log(`   Team: ${baseURL}/api/team`)
}

seedRealData().catch(console.error)

