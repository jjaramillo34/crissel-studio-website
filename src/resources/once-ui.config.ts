import { Plus_Jakarta_Sans, Fraunces, Geist_Mono } from 'next/font/google'

const heading = Fraunces({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
})

const body = Plus_Jakarta_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
})

const label = Plus_Jakarta_Sans({
  variable: '--font-label',
  subsets: ['latin'],
  display: 'swap',
})

const code = Geist_Mono({
  variable: '--font-code',
  subsets: ['latin'],
  display: 'swap',
})

export const fonts = {
  heading,
  body,
  label,
  code,
}

/** Crissel Studio — coral/rose beauty brand on Once UI tokens */
export const style = {
  theme: 'light' as const,
  neutral: 'rose' as const,
  brand: 'pink' as const,
  accent: 'orange' as const,
  solid: 'contrast' as const,
  solidStyle: 'flat' as const,
  border: 'playful' as const,
  surface: 'translucent' as const,
  transition: 'all' as const,
  scaling: '100' as const,
}

export const dataStyle = {
  variant: 'gradient' as const,
  mode: 'categorical' as const,
  height: 24,
  axis: {
    stroke: 'var(--neutral-alpha-weak)',
  },
  tick: {
    fill: 'var(--neutral-on-background-weak)',
    fontSize: 11,
    line: false,
  },
}
