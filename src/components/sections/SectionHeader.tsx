'use client'

import type { ComponentType, ReactNode } from 'react'
import { Heading, Text } from '@once-ui-system/core'

interface SectionHeaderProps {
  eyebrow?: string
  /** Kept for older pages; not rendered in the editorial style. */
  eyebrowIcon?: ComponentType<{ className?: string }>
  title: ReactNode
  /** Word or phrase rendered in italic coral accent */
  titleAccent?: string
  titleEnd?: string
  description?: ReactNode
  align?: 'start' | 'center' | 'end'
  tone?: 'light' | 'dark'
  titleAs?: 'h1' | 'h2'
  className?: string
  titleClassName?: string
  descriptionClassName?: string
}

/**
 * La Femme–style section title:
 * eyebrow with hairline rules · serif headline · italic accent · soft lede
 */
export const SectionHeader = ({
  eyebrow,
  title,
  titleAccent,
  titleEnd = '.',
  description,
  align = 'center',
  tone = 'light',
  titleAs = 'h2',
  className = '',
}: SectionHeaderProps) => {
  const isCenter = align !== 'start'
  const isDark = tone === 'dark'

  return (
    <div
      className={[
        'crissel-section-header',
        isCenter ? 'crissel-section-header--center' : 'crissel-section-header--start',
        isDark ? 'crissel-section-header--dark' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow ? (
        <div className="crissel-section-header__eyebrow">
          <span className="crissel-section-header__rule" aria-hidden />
          <Text variant="label-default-s" className="crissel-section-header__eyebrow-text">
            {eyebrow}
          </Text>
          <span className="crissel-section-header__rule" aria-hidden />
        </div>
      ) : null}

      <Heading
        as={titleAs}
        variant="display-strong-s"
        align={isCenter ? 'center' : 'left'}
        className="font-display crissel-section-header__title"
      >
        {title}
        {titleAccent ? (
          <>
            {' '}
            <em className="crissel-italic">{titleAccent}</em>
            {titleEnd}
          </>
        ) : null}
      </Heading>

      {description ? (
        <Text
          variant="body-default-m"
          align={isCenter ? 'center' : 'left'}
          wrap="balance"
          className="crissel-section-header__desc"
        >
          {description}
        </Text>
      ) : null}
    </div>
  )
}
