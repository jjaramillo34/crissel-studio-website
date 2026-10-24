'use client'

import { useState } from 'react'
import {
  Button,
  Column,
  Feedback,
  Icon,
  Input,
  Select,
  SmartLink,
  Text,
  Textarea,
} from '@once-ui-system/core'
import { PROMO_WHATSAPP_LINES, whatsappHref } from '@/data/promos'
import { SectionHeader } from './SectionHeader'

/**
 * Where the map pin and "Cómo llegar" point. Searching the mall's name pins the wrong mall
 * (Centro Comercial Ferroviario), so this uses the street corner. Replace with the studio's own
 * Google Maps place/embed link once it's listed.
 */
const MAP_QUERY = 'Juan León Mera y Rocafuerte, Ambato, Ecuador'
const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=17&output=embed`
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`
const WHATSAPP_GREETING = 'Hola Crissel Studio, quisiera información sobre sus servicios.'

type FormField = 'name' | 'email' | 'message' | 'subject'
type FormErrors = Partial<Record<FormField, string>>

const subjectOptions = [
  { value: 'appointment', label: 'Reserva de cita' },
  { value: 'makeup', label: 'Consulta maquillaje' },
  { value: 'eyebrows', label: 'Consulta cejas' },
  { value: 'lashes', label: 'Consulta pestañas' },
  { value: 'nails', label: 'Consulta uñas' },
  { value: 'other', label: 'Otro' },
]

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: 'appointment',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors: FormErrors = {}

    if (formData.name.trim().length < 1 || formData.name.length > 80) {
      nextErrors.name = 'Escribe tu nombre (máximo 80 caracteres).'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Escribe un correo electrónico válido.'
    }
    if (formData.message.trim().length < 10 || formData.message.length > 2000) {
      nextErrors.message = 'El mensaje debe tener entre 10 y 2000 caracteres.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus({ type: 'error', message: 'Revisa los campos marcados para continuar.' })
      return
    }

    setErrors({})
    setIsSubmitting(true)
    setStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = (await response.json()) as { ok: boolean; message: string }

      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'No pudimos enviar tu mensaje.')
      }

      setFormData({ name: '', email: '', message: '', subject: 'appointment' })
      setStatus({ type: 'success', message: result.message })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'No pudimos enviar tu mensaje.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: FormField, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }))
    setStatus(null)
  }

  return (
    <section
      id="contacto"
      className="crissel-section crissel-section--cream"
      aria-labelledby="contacto-title"
    >
      <div className="crissel-section__inner">
        <SectionHeader
          titleId="contacto-title"
          eyebrow="Contacto y ubicación"
          title="Visítanos en el"
          titleAccent="estudio"
          description="Espacio tranquilo y céntrico. En el corazón de Ambato."
        />

        <div className="crissel-contact">
          <div className="crissel-contact__info">
            <div className="crissel-contact__map">
              <iframe
                src={MAP_EMBED_URL}
                title="Mapa: Crissel Studio en el Centro Comercial La Galería, Ambato"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="crissel-contact__place">
                <span className="crissel-contact__pin" aria-hidden>
                  <Icon name="mapPin" size="s" />
                </span>
                <div className="crissel-contact__place-text">
                  <p className="crissel-contact__place-name font-display">Centro Comercial La Galería</p>
                  <p className="crissel-contact__place-address">Mera entre Rocafuerte y Bolívar · Ambato</p>
                </div>
                <Button href={DIRECTIONS_URL} size="s" label="Cómo llegar" arrowIcon />
              </div>
            </div>

            <ul className="crissel-contact__tiles">
              {PROMO_WHATSAPP_LINES.map((line) => (
                <li key={line.id}>
                  <SmartLink
                    unstyled
                    fillWidth
                    className="crissel-contact__tile"
                    href={whatsappHref(line.waE164, WHATSAPP_GREETING)}
                  >
                    <span className="crissel-contact__tile-icon">
                      <Icon name="whatsapp" size="s" />
                    </span>
                    <span className="crissel-contact__tile-label">WhatsApp {line.label}</span>
                    <span className="crissel-contact__tile-value">{line.displayNational}</span>
                  </SmartLink>
                </li>
              ))}
              <li>
                <SmartLink
                  unstyled
                  fillWidth
                  className="crissel-contact__tile"
                  href="mailto:crisseleon1990@gmail.com"
                >
                  <span className="crissel-contact__tile-icon">
                    <Icon name="mail" size="s" />
                  </span>
                  <span className="crissel-contact__tile-label">Email</span>
                  <span className="crissel-contact__tile-value">crisseleon1990@gmail.com</span>
                </SmartLink>
              </li>
              <li>
                <SmartLink
                  unstyled
                  fillWidth
                  className="crissel-contact__tile"
                  href="https://instagram.com/crisselstudio.ec"
                >
                  <span className="crissel-contact__tile-icon">
                    <Icon name="sparkle" size="s" />
                  </span>
                  <span className="crissel-contact__tile-label">Instagram</span>
                  <span className="crissel-contact__tile-value">@crisselstudio.ec</span>
                </SmartLink>
              </li>
            </ul>
          </div>

          <Column
            as="form"
            fillWidth
            className="crissel-contact__form"
            gap="16"
            onSubmit={handleSubmit}
          >
            <Text variant="label-strong-s" onBackground="brand-medium">
              Escríbenos
            </Text>
            <Text variant="heading-strong-xl" className="font-display">
              Tu cita te espera
            </Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Agenda en línea o déjanos un mensaje. Te orientamos para elegir el tratamiento ideal.
            </Text>
            <Input
              id="contact-name"
              name="name"
              label="Nombre"
              placeholder="Tu nombre completo"
              value={formData.name}
              onChange={(event) => handleChange('name', event.target.value)}
              autoComplete="name"
              maxLength={80}
              error={Boolean(errors.name)}
              errorMessage={errors.name}
              required
            />
            <Input
              id="contact-email"
              name="email"
              type="email"
              label="Email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={(event) => handleChange('email', event.target.value)}
              autoComplete="email"
              error={Boolean(errors.email)}
              errorMessage={errors.email}
              required
            />
            <Select
              id="contact-subject"
              label="Asunto"
              value={formData.subject}
              options={subjectOptions}
              onSelect={(value) => handleChange('subject', Array.isArray(value) ? value[0] : value)}
            />
            <Textarea
              id="contact-message"
              name="message"
              label="Mensaje"
              placeholder="Cuéntanos sobre el servicio que necesitas..."
              value={formData.message}
              onChange={(event) => handleChange('message', event.target.value)}
              lines={4}
              maxLength={2000}
              characterCount
              resize="none"
              error={Boolean(errors.message)}
              errorMessage={errors.message}
              required
            />
            <Button
              type="submit"
              size="l"
              prefixIcon="mail"
              label={isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
              fillWidth
              loading={isSubmitting}
              disabled={isSubmitting}
            />
            {status && (
              <Feedback
                variant={status.type === 'success' ? 'success' : 'danger'}
                description={status.message}
              />
            )}
            <Text variant="body-default-xs" onBackground="neutral-weak" align="center">
              ¿Prefieres reservar directo?{' '}
              <SmartLink href="https://bit.ly/crisselstudio" className="crissel-treatment__link">
                Agenda en línea →
              </SmartLink>
            </Text>
          </Column>
        </div>
      </div>
    </section>
  )
}

export default Contact
