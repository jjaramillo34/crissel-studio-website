// Use public folder paths for blog post images
const lashFeatured = '/assets/gallery/extensiones-pestanas-3.jpg'
const makeupFeatured = '/assets/gallery/maquillaje-fantasia-9.jpg'
const browFeatured = '/assets/gallery/planchado-cejas-2.jpg'
const skincare2025Featured = '/assets/gallery/maquillaje-fantasia-3.jpg'
const lash2025Featured = '/assets/gallery/extensiones-pestanas-4.jpg'
const makeup2025Featured = '/assets/gallery/maquillaje-fantasia-8.jpg'
const brow2025Featured = '/assets/gallery/planchado-cejas-1.jpg'


export type BlogSection = {
  heading?: string
  type: 'paragraph' | 'list' | 'quote'
  content: string | string[]
}

export type BlogPost = {
  id: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  readingTime: string
  author: string
  slug: string
  featuredImage: string
  sections: BlogSection[]
}

export const blogPosts: BlogPost[] = [
  {
    id: 'glam-lash-care',
    title: '5 claves para prolongar tus extensiones de pestañas',
    excerpt:
      'Aprende la rutina diaria que recomendamos en Crissel Studio para que tus extensiones luzcan llenas y saludables durante más tiempo.',
    category: 'Extensiones',
    publishedAt: '2025-04-08',
    readingTime: '4 min lectura',
    author: 'Cris León',
    slug: 'glam-lash-care',
    featuredImage: lashFeatured,
    sections: [
      {
        type: 'paragraph',
        content:
          'Si recién sales del estudio con tus extensiones nuevas, este es el momento ideal para establecer hábitos que prolonguen su brillo y volumen. En Crissel Studio siempre explicamos estos cuidados, y aquí los recopilamos para que los tengas a mano.'
      },
      {
        heading: 'Primeras 24 horas',
        type: 'list',
        content: [
          'Evita agua caliente, vapor y sauna. El adhesivo necesita curar correctamente.',
          'Si te duchas, mantén el rostro alejado del chorro principal y seca con toques suaves.'
        ]
      },
      {
        heading: 'Rutina diaria en casa',
        type: 'list',
        content: [
          'Limpia las pestañas con un limpiador libre de aceites, aplicándolo con un cepillo suave.',
          'Cepilla tus extensiones por la mañana y por la noche con movimientos ascendentes.',
          'Aplica un sérum fortalecedor tres veces por semana para nutrir la raíz.'
        ]
      },
      {
        heading: 'Hábitos que debes evitar',
        type: 'list',
        content: [
          'Dormir boca abajo o frotarte los ojos con fuerza.',
          'Usar máscara a prueba de agua o desmaquillantes oleosos.',
          'Exponerlas prolongadamente a calor directo (plancha, secadora, etc.).'
        ]
      },
      {
        type: 'quote',
        content: 'Agenda tus retoques cada 3 semanas para mantener el diseño impecable y saludable.'
      },
      {
        type: 'paragraph',
        content:
          'Con estos cuidados tus extensiones se verán espectaculares hasta tu próxima visita. Recuerda que puedes adquirir en el estudio nuestro kit Lash Lover con limpiador, cepillo y sérum nutritivo.'
      }
    ]
  },
  {
    id: 'skin-prep-makeup',
    title: 'Skin prep profesional antes del maquillaje social',
    excerpt:
      'Descubre el paso a paso que seguimos en el estudio para preparar la piel y lograr un acabado impecable que resista cada celebración.',
    category: 'Skincare',
    publishedAt: '2025-03-21',
    readingTime: '3 min lectura',
    author: 'Cris León',
    slug: 'skin-prep-maquillaje',
    featuredImage: makeupFeatured,
    sections: [
      {
        type: 'paragraph',
        content:
          'Un maquillaje de larga duración comienza siempre con una piel bien preparada. Esta rutina express equilibra hidratación y control de brillo para que la base se funda sin marcar texturas.'
      },
      {
        heading: 'Rutina express Crissel Studio',
        type: 'list',
        content: [
          'Limpieza suave para retirar impurezas y preparar la piel.',
          'Tónico equilibrante para calmar y balancear el pH.',
          'Ampolla hidratante con ácido hialurónico y niacinamida.',
          'Crema ligera sellada con masaje estimulante.',
          'Primer híbrido (matificante + glow) adaptado por zonas.'
        ]
      },
      {
        type: 'paragraph',
        content:
          'Antes de la base, sellamos con spray fijador para encapsular la hidratación. Repetimos el spray al final del maquillaje para asegurar que resista fotografía, baile y horas de celebración.'
      },
      {
        heading: 'Tips para casa',
        type: 'list',
        content: [
          'Hidrata tu piel la noche anterior con productos libres de aceites pesados.',
          'Haz una exfoliación suave uno o dos días antes del evento.',
          'Evita probar productos nuevos el mismo día para prevenir reacciones.'
        ]
      }
    ]
  },
  {
    id: 'brow-trends-2025',
    title: 'Tendencias en diseño de cejas 2025',
    excerpt:
      'Laminado natural, lifting nutritivo y diseños híbridos. Analizamos qué técnicas favorecen cada tipo de rostro y cómo mantenerlas en casa.',
    category: 'Cejas',
    publishedAt: '2025-02-26',
    readingTime: '5 min lectura',
    author: 'Cris León',
    slug: 'tendencias-cejas-2025',
    featuredImage: browFeatured,
    sections: [
      {
        type: 'paragraph',
        content:
          'Este año las cejas celebran su versión más natural, peinadas y nutridas. Le decimos adiós a los trazos rígidos y apostamos por diseños que respetan el crecimiento original pero aportan definición.'
      },
      {
        heading: 'Técnicas estrella 2025',
        type: 'list',
        content: [
          'Laminado flexible combinado con tinte suave para un efecto relleno sin maquillaje.',
          'Lifting nutritivo con keratina vegetal para cejas densas y brillantes.',
          'Diseños híbridos que mezclan hilo, pinza y mapeo personalizado para un arco armónico.'
        ]
      },
      {
        heading: 'Cuidados post servicio',
        type: 'list',
        content: [
          'Cepilla tus cejas a diario y aplica sérum fortalecedor.',
          'Evita productos con alcohol las primeras 48 horas.',
          'Agrega un booster nutritivo una vez por semana para mantener la flexibilidad.'
        ]
      },
      {
        type: 'paragraph',
        content:
          'Cada tratamiento se personaliza según tu tipo de rostro y densidad de ceja. Agenda una evaluación y crea junto a nuestro equipo el look que mejor te represente.'
      }
    ]
  },
  {
    id: 'lash-care-2025',
    title: 'Rutinas de pestañas saludables 2025',
    excerpt:
      'Extensiones ligeras, lifting nutritivo y serums regeneradores. Descubre cómo mantener unas pestañas fuertes, curvadas y naturales sin esfuerzo.',
    category: 'Pestañas',
    publishedAt: '2025-03-10',
    readingTime: '6 min lectura',
    author: 'Cris León',
    slug: 'rutinas-pestanas-2025',
    featuredImage: lash2025Featured,
    sections: [
      {
        type: 'paragraph',
        content:
          'Las pestañas son un marco esencial de la mirada, y este 2025 la tendencia se centra en el cuidado real, no solo en el efecto visual. Menos exceso de volumen y más brillo y densidad natural.'
      },
      {
        heading: 'Tratamientos destacados',
        type: 'list',
        content: [
          'Lifting con proteínas vegetales para una curvatura natural y duradera.',
          'Extensiones ultraligeras que respetan el crecimiento de la pestaña.',
          'Serums fortalecedores con péptidos y biotina para un ciclo saludable.'
        ]
      },
      {
        heading: 'Consejos de mantenimiento',
        type: 'list',
        content: [
          'Evita frotar los ojos o dormir boca abajo tras el lifting.',
          'Usa desmaquillantes sin aceite ni alcohol.',
          'Aplica un serum nutritivo antes de dormir para prolongar el efecto.'
        ]
      },
      {
        type: 'paragraph',
        content:
          'El objetivo no es tener más pestañas, sino que las tuyas se sientan sanas y definidas. Reserva un diagnóstico personalizado para encontrar tu tratamiento ideal.'
      }
    ]
  },
  {
    id: 'makeup-minimalista-2025',
    title: 'Maquillaje minimalista: menos es más',
    excerpt:
      'Piel luminosa, tonos neutros y productos multifunción. Así llega el maquillaje 2025 con una visión más limpia y consciente.',
    category: 'Maquillaje',
    publishedAt: '2025-04-02',
    readingTime: '5 min lectura',
    author: 'Cris León',
    slug: 'maquillaje-minimalista-2025',
    featuredImage: makeup2025Featured,
    sections: [
      {
        type: 'paragraph',
        content:
          'El minimalismo redefine las rutinas de maquillaje con texturas ligeras y acabados naturales. La prioridad es mejorar la piel, no cubrirla.'
      },
      {
        heading: 'Productos clave',
        type: 'list',
        content: [
          'Bases híbridas con skincare activo para unificar y cuidar.',
          'Rubores y sombras en crema para un efecto “segunda piel”.',
          'Máscaras de pestañas ligeras que realzan sin apelmazar.'
        ]
      },
      {
        heading: 'Tips de aplicación',
        type: 'list',
        content: [
          'Aplica los productos con los dedos para un acabado más orgánico.',
          'Combina un iluminador líquido con tu crema hidratante.',
          'Usa tonos tierra o rosados para un look fresco y versátil.'
        ]
      },
      {
        type: 'paragraph',
        content:
          'El maquillaje minimalista resalta tu autenticidad. Cada paso está pensado para revelar tu piel, no esconderla.'
      }
    ]
  },
  {
    id: 'skincare-pre-makeup-2025',
    title: 'Preparar la piel antes del maquillaje',
    excerpt:
      'El secreto de un maquillaje duradero comienza en la piel. Descubre cómo preparar tu rostro para un acabado natural y saludable.',
    category: 'Skincare',
    publishedAt: '2025-04-20',
    readingTime: '4 min lectura',
    author: 'Cris León',
    slug: 'preparar-piel-maquillaje-2025',
    featuredImage: skincare2025Featured,
    sections: [
      {
        type: 'paragraph',
        content:
          'Antes de aplicar cualquier producto de maquillaje, la piel debe estar equilibrada, hidratada y protegida. Este paso hace la diferencia entre un acabado uniforme y uno cargado.'
      },
      {
        heading: 'Pasos esenciales',
        type: 'list',
        content: [
          'Limpieza suave para eliminar impurezas sin resecar.',
          'Hidratación personalizada según tu tipo de piel.',
          'Primer ligero con ingredientes calmantes para sellar la preparación.'
        ]
      },
      {
        heading: 'Consejos profesionales',
        type: 'list',
        content: [
          'Exfolia de forma regular para evitar textura bajo la base.',
          'Usa hidratantes con ácido hialurónico antes de aplicar maquillaje.',
          'No olvides el SPF: protege y mejora la adherencia de los productos.'
        ]
      },
      {
        type: 'paragraph',
        content:
          'Una piel cuidada es la mejor base de maquillaje. Dedicar cinco minutos extra a tu rutina marcará la diferencia en cada look.'
      }
    ]
  }  
]
