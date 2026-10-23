'use client'

import { Button, Column, Heading, Media, RevealFx, Text } from '@once-ui-system/core'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { getMediaUrl } from '@/lib/payload'
import type { BlogPost } from '@/lib/blog'

type Section = BlogPost['sections'][number]

/** List sections store one item per line */
const listItems = (content: Section['content']) => content.split('\n').filter(Boolean)

const PostSection = ({ section }: { section: Section }) => {
  if (section.type === 'paragraph') {
    return (
      <Text as="p" variant="body-default-l" onBackground="neutral-strong">
        {section.content as string}
      </Text>
    )
  }

  if (section.type === 'list') {
    return (
      <Column gap="12">
        {section.heading ? (
          <Heading as="h2" variant="heading-strong-l" onBackground="brand-strong">
            {section.heading}
          </Heading>
        ) : null}
        <Column as="ul" gap="8" paddingLeft="20" style={{ listStyleType: 'disc' }}>
          {listItems(section.content).map((item, itemIndex) => (
            <Text as="li" key={itemIndex} variant="body-default-l" onBackground="neutral-strong">
              {item}
            </Text>
          ))}
        </Column>
      </Column>
    )
  }

  if (section.type === 'quote') {
    return (
      <Column
        as="blockquote"
        margin="0"
        background="brand-alpha-weak"
        border="brand-alpha-medium"
        radius="l"
        padding="24"
      >
        <Text variant="heading-default-m" onBackground="brand-strong">
          “{section.content as string}”
        </Text>
      </Column>
    )
  }

  return null
}

const BlogPostPage = ({ post }: { post: BlogPost }) => {
  const imageUrl = getMediaUrl(post.featuredImage)
  const publishedLabel = new Date(post.publishedAt).toLocaleDateString('es-EC', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Column as="main" fillWidth horizontal="center">
      <Column
        as="article"
        fillWidth
        maxWidth="s"
        paddingX="24"
        paddingTop="104"
        paddingBottom="80"
        gap="32"
      >
        <Column gap="24" horizontal="start">
          <Button href="/blog" variant="tertiary" size="s" prefixIcon="arrowLeft" label="Volver al blog" />
          <SectionHeader
            titleAs="h1"
            eyebrow={`${post.category} • ${publishedLabel}`}
            title={post.title}
            description={`${post.author} • ${post.readingTime}`}
            align="start"
          />
        </Column>

        {imageUrl ? (
          <RevealFx fillWidth>
            <Media
              src={imageUrl}
              alt={post.title}
              aspectRatio="16 / 9"
              radius="l"
              border="neutral-alpha-weak"
              priority
              sizes="(max-width: 768px) 100vw, 640px"
              unoptimized={imageUrl.startsWith('http://localhost')}
            />
          </RevealFx>
        ) : null}

        <Column gap="32">
          {post.sections.map((section, index) => (
            <PostSection key={index} section={section} />
          ))}
        </Column>
      </Column>
    </Column>
  )
}

export default BlogPostPage
