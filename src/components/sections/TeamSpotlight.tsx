import { motion, useReducedMotion } from 'framer-motion'
import { GraduationCap, Award } from 'lucide-react'
import team1 from '../../assets/gallery/maquillaje-fantasia-7.jpg'
import team2 from '../../assets/gallery/maquillaje-fantasia-11.jpg'
import team3 from '../../assets/gallery/maquillaje-social-1.jpg'

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
        <div className="mb-12 text-center">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, ease: 'easeOut' }}
            className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#E57373]/20 bg-white/95 px-5 py-2 text-sm font-medium text-[#E57373] shadow-sm"
          >
            Equipo certificado
          </motion.div>
          <motion.h2
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="text-4xl font-bold text-[#E57373]"
          >
            Manos expertas detrás de cada look
          </motion.h2>
          <p className="mt-4 text-gray-600">
            Nuestro equipo está en constante actualización, domina tendencias globales y adapta cada técnica a tus rasgos únicos.
          </p>
        </div>

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
