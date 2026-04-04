'use client'

import { type ReactNode, type ComponentType } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  eyebrowIcon?: ComponentType<{ className?: string }>
  title: ReactNode
  description?: ReactNode
  align?: 'start' | 'center' | 'end'
  className?: string
  descriptionClassName?: string
  /** Use h1 for standalone pages (e.g. /productos); default h2 for sections */
  titleAs?: 'h1' | 'h2'
  titleClassName?: string
}

const alignMap: Record<NonNullable<SectionHeaderProps['align']>, string> = {
  start: 'items-start text-left',
  center: 'items-center text-center',
  end: 'items-end text-right',
}

const descriptionWidth: Record<NonNullable<SectionHeaderProps['align']>, string> = {
  start: 'max-w-3xl',
  center: 'max-w-2xl',
  end: 'max-w-3xl',
}

export const SectionHeader = ({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  description,
  align = 'center',
  className,
  descriptionClassName,
  titleAs = 'h2',
  titleClassName,
}: SectionHeaderProps) => {
  const prefersReducedMotion = useReducedMotion()
  const Title = titleAs === 'h1' ? motion.h1 : motion.h2

  const containerClasses = cn(
    'mb-12 flex flex-col gap-4',
    alignMap[align],
    align === 'center' ? 'mx-auto' : '',
    className
  )

  return (
    <div className={containerClasses}>
      {eyebrow && (
        <motion.span
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0.4 } : { duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 rounded-full border border-rose-200/90 bg-gradient-to-r from-white via-rose-50/80 to-pink-50/70 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#c45c5c] shadow-sm backdrop-blur-sm"
        >
          {EyebrowIcon ? <EyebrowIcon className="h-4 w-4 text-[#E57373]" aria-hidden="true" /> : null}
          {eyebrow}
        </motion.span>
      )}

      <Title
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        className={cn(
          'font-display font-semibold tracking-tight text-neutral-900 text-3xl sm:text-4xl',
          titleClassName
        )}
      >
        {title}
      </Title>
      <span
        className={cn(
          'mt-2 block h-1 w-14 shrink-0 rounded-full bg-gradient-to-r from-[#E57373] to-[#F8BBD9]',
          align === 'center' && 'mx-auto',
          align === 'end' && 'self-end'
        )}
        aria-hidden
      />

      {description ? (
        <motion.p
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0.4 } : { duration: 0.5, ease: 'easeOut', delay: 0.15 }}
          className={cn('text-sm text-neutral-600 sm:text-base leading-relaxed', descriptionWidth[align], descriptionClassName)}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  )
}
