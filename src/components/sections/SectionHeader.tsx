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
}: SectionHeaderProps) => {
  const prefersReducedMotion = useReducedMotion()

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
          className="inline-flex items-center gap-2 rounded-full border border-[#E57373]/20 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#E57373] shadow-sm"
        >
          {EyebrowIcon ? <EyebrowIcon className="h-4 w-4" aria-hidden="true" /> : null}
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={prefersReducedMotion ? { duration: 0.5 } : { duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        className="text-3xl font-bold text-[#E57373] sm:text-4xl"
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0.4 } : { duration: 0.5, ease: 'easeOut', delay: 0.15 }}
          className={cn('text-sm text-gray-600 sm:text-base', descriptionWidth[align], descriptionClassName)}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  )
}
