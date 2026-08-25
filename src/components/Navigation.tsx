'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  Button,
  Column,
  Logo,
  NavIcon,
  Row,
  SmartLink,
  Text,
} from '@once-ui-system/core'

const logoImage = '/assets/images/logo_photo.png'

const navItems = [
  { id: 'servicios', label: 'Servicios', path: '/' },
  { id: 'sobre-nosotros', label: 'Sobre nosotras', path: '/' },
  { id: 'galeria', label: 'Galería', path: '/galeria' },
  { id: 'productos', label: 'Productos', path: '/productos' },
  { id: 'tienda', label: 'Tienda', path: '/tienda' },
  { id: 'promos', label: 'Promos', path: '/promos' },
  { id: 'contacto', label: 'Contacto', path: '/' },
]

const isStandaloneRoute = (path: string) => path !== '/' && path.startsWith('/')

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSectionNav = (itemId: string) => {
    if (pathname !== '/') {
      window.location.href = itemId === 'hero' ? '/' : `/#${itemId}`
      return
    }
    if (itemId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.getElementById(itemId)?.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <Row
        as="nav"
        fillWidth
        horizontal="center"
        paddingX="16"
        paddingTop="12"
        position="fixed"
        top="0"
        zIndex={9}
        className={isScrolled ? 'crissel-nav--scrolled' : 'crissel-nav--over-hero'}
      >
        <Row
          as="header"
          fillWidth
          maxWidth="l"
          height="56"
          paddingX="20"
          vertical="center"
          horizontal="between"
          radius="l"
          border="neutral-alpha-weak"
          background="overlay"
        >
          <Row gap="8" vertical="center" fitWidth>
            <Logo icon={logoImage} size="s" href="/" />
            <SmartLink href="/">
              <Text variant="label-strong-m" className="font-display">
                Crissel Studio
              </Text>
            </SmartLink>
          </Row>

          <Row
            s={{ hide: true }}
            textVariant="label-default-s"
            gap="20"
            vertical="center"
            paddingX="16"
          >
            {navItems.map((item) =>
              isStandaloneRoute(item.path) ? (
                <SmartLink key={item.id} href={item.path}>
                  <Text onBackground="neutral-medium">{item.label}</Text>
                </SmartLink>
              ) : (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSectionNav(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    font: 'inherit',
                  }}
                >
                  <Text onBackground="neutral-medium">{item.label}</Text>
                </button>
              ),
            )}
          </Row>

          <Row fitWidth gap="8" vertical="center">
            <Row s={{ hide: true }}>
              <Button size="s" href="https://bit.ly/crisselstudio" label="Reservar" />
            </Row>
            <Row hide s={{ hide: false }}>
              <NavIcon
                isActive={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              />
            </Row>
          </Row>
        </Row>
      </Row>

      {isMobileMenuOpen && (
        <Column
          position="fixed"
          top={72}
          left="0"
          fillWidth
          paddingX="16"
          zIndex={8}
          hide
          s={{ hide: false }}
        >
          <Column
            padding="20"
            gap="12"
            background="overlay"
            border="neutral-alpha-weak"
            radius="l"
          >
            {navItems.map((item) =>
              isStandaloneRoute(item.path) ? (
                <SmartLink
                  key={item.id}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Text variant="label-default-m">{item.label}</Text>
                </SmartLink>
              ) : (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSectionNav(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '4px 0',
                    textAlign: 'left',
                    cursor: 'pointer',
                    font: 'inherit',
                    width: '100%',
                  }}
                >
                  <Text variant="label-default-m">{item.label}</Text>
                </button>
              ),
            )}
            <Button
              href="https://bit.ly/crisselstudio"
              label="Reservar cita"
              fillWidth
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </Column>
        </Column>
      )}
    </>
  )
}

export default Navigation
