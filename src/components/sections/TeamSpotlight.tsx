'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { GraduationCap, Award } from 'lucide-react'
import Image from 'next/image'
import { SectionHeader } from './SectionHeader'
import { payload, getMediaUrl } from '@/lib/payload'

interface TeamMember {
  id: string
  name: string
  role: string
  bio?: string
  photo: any
  specialties?: Array<{ specialty: string }>
  order?: number
}

const TeamSpotlight = () => {
  const prefersReducedMotion = useReducedMotion()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTeam() {
      try {
        setLoading(true)
        const response = await payload.getTeam({ limit: 10 })
        setTeamMembers(response.docs)
        setError(null)
      } catch (err: any) {
        console.error('Error fetching team:', err)
        setError('No se pudo cargar el equipo')
        // Fallback to empty array
        setTeamMembers([])
      } finally {
        setLoading(false)
      }
    }

    fetchTeam()
  }, [])

  if (loading) {
    return (
      <section className="section-brand-alt py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Nuestro talento"
            title="Conoce al equipo certificado de Crissel"
            description="Somos especialistas en mirada, maquillaje y cuidado integral. Cada artista mantiene certificaciones vigentes y actualiza técnicas globales para ofrecerte resultados impecables."
          />
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 animate-pulse rounded-3xl bg-gray-200" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error || teamMembers.length === 0) {
    return (
      <section className="section-brand-alt py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Nuestro talento"
            title="Conoce al equipo certificado de Crissel"
            description="Somos especialistas en mirada, maquillaje y cuidado integral. Cada artista mantiene certificaciones vigentes y actualiza técnicas globales para ofrecerte resultados impecables."
          />
          {error && (
            <p className="text-center text-gray-500">No se pudo cargar el equipo. Por favor, inténtalo más tarde.</p>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="section-brand-alt py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Nuestro talento"
          title="Conoce al equipo certificado de Crissel"
          description="Somos especialistas en mirada, maquillaje y cuidado integral. Cada artista mantiene certificaciones vigentes y actualiza técnicas globales para ofrecerte resultados impecables."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {teamMembers.map((member, index) => {
            const photoUrl = getMediaUrl(member.photo)
            const specialties = member.specialties?.map((s) => s.specialty) || []

            return (
              <motion.article
                key={member.id}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={prefersReducedMotion ? { duration: 0.4 } : { duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
                className="overflow-hidden rounded-2xl border border-rose-200/70 bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-60">
                  {photoUrl ? (
                    <Image
                      src={photoUrl}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-pink-100 to-pink-200" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" aria-hidden="true" />
                </div>
                <div className="space-y-4 p-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
                    <p className="text-sm font-medium uppercase tracking-wide text-[#E57373]">{member.role}</p>
                  </div>
                  {member.bio && (
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                      <GraduationCap className="mt-1 h-5 w-5 flex-shrink-0 text-[#E57373]" aria-hidden="true" />
                      <p>{member.bio}</p>
                    </div>
                  )}
                  {specialties.length > 0 && (
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                      <Award className="mt-1 h-5 w-5 flex-shrink-0 text-[#E57373]" aria-hidden="true" />
                      <ul className="space-y-1">
                        {specialties.map((specialty, idx) => (
                          <li key={idx}>{specialty}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TeamSpotlight
