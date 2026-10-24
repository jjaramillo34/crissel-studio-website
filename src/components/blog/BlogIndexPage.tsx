'use client'

import { Card, Column, Grid, Heading, Media, RevealFx, Row, Tag, Text } from '@once-ui-system/core'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { getMediaUrl } from '@/lib/payload'
import type { BlogPost } from '@/lib/blog'

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('es-EC', { year: 'numeric', month: 'short', day: 'numeric' })

const PostCard = ({ post }: { post: BlogPost }) => {
  const imageUrl = getMediaUrl(post.featuredImage)

  return (
    <Card
      href={`/blog/${String(post.slug)}`}
      fillHeight
      direction="column"
      radius="l"
      border="neutral-alpha-weak"
      background="surface"
      overflow="hidden"
    >
      <Column fillWidth>
        {imageUrl ? (
          <Media
            src={imageUrl}
            alt={post.title}
            aspectRatio="16 / 9"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized={imageUrl.startsWith('http://localhost')}
          />
        ) : (
          <Column fillWidth background="brand-alpha-weak" aspectRatio="16 / 9" />
        )}
        <Row position="absolute" top="16" left="16">
          <Tag variant="brand" size="s" prefixIcon="document" label={post.category} />
        </Row>
      </Column>

      <Column flex={1} padding="24" gap="12">
        <Heading as="h2" variant="heading-strong-xl">
          {post.title}
        </Heading>
        <Text variant="body-default-s" onBackground="neutral-medium">
          {post.excerpt}
        </Text>
        <Column flex={1} />
        <Text variant="label-default-s" onBackground="brand-medium">
          {formatDate(post.publishedAt)} · {post.readingTime} · {post.author}
        </Text>
        <Text variant="body-strong-s" onBackground="brand-strong">
          Leer artículo completo →
        </Text>
      </Column>
    </Card>
  )
}

const BlogIndexPage = ({ posts: allPosts, error }: { posts: BlogPost[]; error: boolean }) => {
  const posts = allPosts.filter((post) => post.slug && typeof post.slug === 'string')

  return (
    <Column as="main" fillWidth horizontal="center">
      <Column fillWidth maxWidth="l" paddingX="24" paddingTop="104" paddingBottom="80" gap="40">
        <SectionHeader
          titleAs="h1"
          eyebrow="Blog Crissel Studio"
          title="Tips y tendencias para realzar tu mirada"
          description="Explora nuestras guías profesionales sobre extensiones, cejas y maquillaje. Queremos que tu belleza resalte dentro y fuera del estudio."
          align="start"
        />

        {error || posts.length === 0 ? (
          <Text
            align="center"
            onBackground="neutral-weak"
            paddingY="48"
            role={error ? 'alert' : undefined}
          >
            {error
              ? 'No se pudieron cargar los artículos del blog'
              : 'No hay artículos disponibles en este momento.'}
          </Text>
        ) : (
          <Grid columns="2" s={{ columns: 1 }} gap="32">
            {posts.map((post, index) => (
              <RevealFx key={post.id} delay={Math.min(index, 6) * 0.1} translateY="16" fill>
                <PostCard post={post} />
              </RevealFx>
            ))}
          </Grid>
        )}
      </Column>
    </Column>
  )
}

export default BlogIndexPage
