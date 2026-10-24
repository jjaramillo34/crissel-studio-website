'use client'

import { useLayoutEffect, useRef, useState, type ComponentType, type ReactNode } from 'react'
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
  /** id on the heading, for `aria-labelledby` on the section */
  titleId?: string
  /** `compact` for titles in a half-width column (e.g. next to a photo) */
  size?: 'default' | 'compact'
  className?: string
  titleClassName?: string
  descriptionClassName?: string
}

/**
 * Reveal state, kept off until JS decides:
 * - `static`: already on screen at mount (or reduced motion) — never animate, so no flicker
 * - `hidden`: below the fold — words wait, then animate in on `shown`
 */
type RevealState = 'static' | 'hidden' | 'shown'

const useScrollReveal = <T extends HTMLElement>() => {
  const ref = useRef<T>(null)
  const [state, setState] = useState<RevealState>('static')

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return

    setState('hidden')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, state }
}

/** Splits plain-string titles into words so each can animate in turn */
const Words = ({ text, start = 0 }: { text: string; start?: number }) => (
  <>
    {text.split(/(\s+)/).map((part, i) =>
      part.trim() ? (
        <span
          key={i}
          className="crissel-word"
          style={{ ['--i' as string]: start + Math.floor(i / 2) }}
        >
          {part}
        </span>
      ) : (
        part
      ),
    )}
  </>
)

const wordCount = (text: string) => text.split(/\s+/).filter(Boolean).length

/**
 * La Femme–style section title:
 * ✦ coral eyebrow ✦ · large serif headline with word-by-word reveal ·
 * italic accent with brush underline · soft lede
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
  titleId,
  size = 'default',
  className = '',
}: SectionHeaderProps) => {
  const isCenter = align !== 'start'
  const isDark = tone === 'dark'
  const { ref, state } = useScrollReveal<HTMLDivElement>()
  const titleWords = typeof title === 'string' ? wordCount(title) : 0

  return (
    <div
      ref={ref}
      data-reveal={state}
      className={[
        'crissel-section-header',
        isCenter ? 'crissel-section-header--center' : 'crissel-section-header--start',
        isDark ? 'crissel-section-header--dark' : '',
        size === 'compact' ? 'crissel-section-header--compact' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow ? (
        <Text as="p" variant="label-strong-s" className="crissel-section-header__eyebrow">
          <span className="crissel-section-header__spark" aria-hidden>
            ✦
          </span>
          {eyebrow}
          <span className="crissel-section-header__spark" aria-hidden>
            ✦
          </span>
        </Text>
      ) : null}

      <Heading
        as={titleAs}
        id={titleId}
        variant="display-strong-m"
        align={isCenter ? 'center' : 'left'}
        className="font-display crissel-section-header__title"
      >
        {typeof title === 'string' ? <Words text={title} /> : title}
        {titleAccent ? (
          <>
            {' '}
            <em className="crissel-italic crissel-accent">
              <Words text={titleAccent} start={titleWords} />
            </em>
            {titleEnd}
          </>
        ) : null}
      </Heading>

      {description ? (
        <Text
          variant="body-default-l"
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
