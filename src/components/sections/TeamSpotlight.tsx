import { motion, useReducedMotion } from 'framer-motion'
import { GraduationCap, Award } from 'lucide-react'
import team1 from '../../assets/gallery/maquillaje-fantasia-7.jpg'
import team2 from '../../assets/gallery/maquillaje-fantasia-11.jpg'
import team3 from '../../assets/gallery/maquillaje-social-1.jpg'
import { SectionHeader } from './SectionHeader'

const teamMembers = [
  {
    name: 'Cris León',
    role: 'Master Lash & Brow Artist',
    certifications: ['Lash Institute 2018', 'Keratina Expert 2020'],
    specialty: 'Extensiones volumen y diseño de cejas laminadas',
    photo: team1,
  },
  {
    name: 'Carla Ríos',
    role: 'Makeup Lead Artist',
    certifications: ['MAC Pro Masterclass', 'Bridal Studio 2021'],
    specialty: 'Maquillaje social HD y visagismo personalizado',
    photo: team2,
  },
  {
    name: 'Dani Vera',
    role: 'Skin & Lash Care Specialist',
    certifications: ['Cosmetología ISPED', 'Lash Lift Advanced'],
    specialty: 'Tratamientos nutritivos y planes de mantenimiento',
    photo: team3,
  },
]

const TeamSpotlight = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Nuestro talento"
          title="Conoce al equipo certificado de Crissel"
          description="Somos especialistas en mirada, maquillaje y cuidado integral. Cada artista mantiene certificaciones vigentes y actualiza técnicas globales para ofrecerte resultados impecables."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {teamMembers.map((member, index) => (
            <motion.article
              key={member.name}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={prefersReducedMotion ? { duration: 0.4 } : { duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
              className="overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-lg"
            >
              <div className="relative h-60">
                <img src={member.photo} alt={member.name} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" aria-hidden="true" />
              </div>
              <div className="space-y-4 p-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-sm font-medium uppercase tracking-wide text-[#E57373]">{member.role}</p>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <GraduationCap className="mt-1 h-5 w-5 text-[#E57373]" aria-hidden="true" />
                  <ul className="space-y-1">
                    {member.certifications.map((cert) => (
                      <li key={cert}>{cert}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <Award className="mt-1 h-5 w-5 text-[#E57373]" aria-hidden="true" />
                  <p>{member.specialty}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSpotlight
