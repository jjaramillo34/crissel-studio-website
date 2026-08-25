'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Button,
  Column,
  Feedback,
  Input,
  Row,
  Select,
  SmartLink,
  Text,
  Textarea,
} from '@once-ui-system/core'
import { SectionHeader } from './SectionHeader'

type FormField = 'name' | 'email' | 'message' | 'subject'
type FormErrors = Partial<Record<FormField, string>>

const subjectOptions = [
  { value: 'appointment', label: 'Reserva de cita' },
  { value: 'makeup', label: 'Consulta maquillaje' },
  { value: 'eyebrows', label: 'Consulta cejas' },
  { value: 'lashes', label: 'Consulta pestañas' },
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
    <section id="contacto" className="crissel-band crissel-band--contact" aria-labelledby="contacto-title">
      <div className="crissel-band__media">
        <Image
          src="/assets/images/hero.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="crissel-band__wash" aria-hidden />
      </div>

      <Row
        className="crissel-band__content"
        fillWidth
        maxWidth="l"
        gap="48"
        paddingX="l"
        paddingY="80"
        vertical="center"
        s={{ direction: 'column', gap: '32' }}
        zIndex={1}
      >
        <Column gap="24" fillWidth>
          <SectionHeader
            tone="dark"
            align="start"
            eyebrow="Contacto y ubicación"
            title="Visítanos en el"
            titleAccent="estudio"
            description="Espacio tranquilo y céntrico. En el corazón de Ambato."
          />
          <Column gap="8">
            <Text variant="heading-strong-s" className="crissel-hero__title">
              Centro Comercial La Galería
            </Text>
            <Text variant="body-default-m" className="crissel-hero__lede">
              Mera entre Rocafuerte y Bolívar
              <br />
              Ambato, Ecuador
            </Text>
          </Column>
          <Column gap="4">
            <SmartLink href="https://bit.ly/crisselstudio">
              <Text variant="body-default-m" className="crissel-hero__lede">
                bit.ly/crisselstudio
              </Text>
            </SmartLink>
            <SmartLink href="https://instagram.com/crisselstudio.ec">
              <Text variant="body-default-s" className="crissel-hero__lede">
                @crisselstudio.ec
              </Text>
            </SmartLink>
          </Column>
          <Row gap="12" s={{ direction: 'column' }}>
            <Button href="https://bit.ly/crisselstudio" label="Reservar cita" prefixIcon="calendar" />
            <Button
              variant="secondary"
              href="https://wa.me/593992950683"
              label="WhatsApp"
              className="crissel-hero__cta-ghost"
            />
          </Row>
        </Column>

        <Column
          as="form"
          fillWidth
          className="crissel-band__card"
          padding="32"
          gap="16"
          radius="l"
          onSubmit={handleSubmit}
        >
          <Text variant="label-default-s" onBackground="brand-medium">
            Escríbenos
          </Text>
          <Text variant="heading-strong-l" className="font-display">
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
        </Column>
      </Row>
    </section>
  )
}

export default Contact
