import { motion, useReducedMotion } from 'framer-motion'
import { CalendarDays, Clock, PhoneCall } from 'lucide-react'

const slots = [
  { day: 'Hoy', time: '4:30 PM', service: 'Extensiones híbridas' },
  { day: 'Mañana', time: '10:00 AM', service: 'Maquillaje social' },
  { day: 'Sábado', time: '3:00 PM', service: 'Laminado de cejas' },
]

const AvailabilityWidget = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-gradient-to-br from-[#FDECF6] via-white to-pink-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-pink-100 bg-white shadow-xl">
          <div className="grid gap-10 p-10 lg:grid-cols-2">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, ease: 'easeOut' }}
              className="space-y-4"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#E57373]/20 bg-[#E57373]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#E57373]">
                Widget de disponibilidad
              </span>
              <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
                Reserva tu momento en minutos
              </h2>
              <p className="text-gray-600">
                Actualizamos la agenda a diario. Selecciona un horario sugerido o envíanos un mensaje para ajustar tu cita.
              </p>

              <div className="grid gap-4">
                {slots.map((slot) => (
                  <div key={slot.time} className="flex items-center justify-between rounded-2xl border border-pink-100 bg-white/80 p-4 backdrop-blur">
                    <div className="flex items-center gap-3">
                      <CalendarDays className="h-5 w-5 text-[#E57373]" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-gray-800">{slot.day}</p>
                        <p className="text-sm text-gray-500">{slot.service}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#E57373]">
                      <Clock className="h-5 w-5" aria-hidden="true" />
                      {slot.time}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="flex flex-col justify-center gap-6 rounded-3xl bg-gradient-to-br from-[#E57373] to-[#F8BBD9] p-8 text-white"
            >
              <div>
                <h3 className="text-2xl font-bold">Reserva express</h3>
                <p className="mt-2 text-sm text-white/80">
                  Confírmanos tu horario por WhatsApp o ingresa al calendario online para autogestionar tu cita.
                </p>
              </div>
              <motion.a
                href="https://bit.ly/crisselstudio"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#E57373] shadow-lg transition-all duration-300 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <CalendarDays className="h-5 w-5" aria-hidden="true" />
                Abrir calendario online
              </motion.a>
              <motion.a
                href="https://wa.me/593992950683"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <PhoneCall className="h-5 w-5" aria-hidden="true" />
                Hablar con el equipo
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AvailabilityWidget
