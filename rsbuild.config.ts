import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: 'Scramble Word!',
    tags: [
      {
        tag: 'link',
        attrs: {
          rel: 'icon',
          href: '/favicon.ico',
        },
      },
      {
        tag: 'link',
        attrs: {
          rel: 'icon',
          href: '/favicon.png',
          type: 'image/png',
          sizes: '32x32',
        },
      },
      {
        tag: 'link',
        attrs: {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
        },
      },
      {
        tag: 'link',
        attrs: {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
      },
      {
        tag: 'link',
        attrs: {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
      },
      {
        tag: 'link',
        attrs: {
          href: 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap',
          rel: 'stylesheet',
        },
      },
      {
        tag: 'link',
        attrs: {
          href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..900;1,100..900&display=swap',
          rel: 'stylesheet',
        },
      },
      {
        tag: 'meta',
        attrs: {
          property: 'og:type',
          content: 'website',
        },
      },
      {
        tag: 'meta',
        attrs: {
          property: 'og:title',
          content: 'Scramble Word!',
        },
      },
      {
        tag: 'meta',
        attrs: {
          property: 'og:description',
          content: 'Guess the scrambled word!',
        },
      },
      {
        tag: 'meta',
        attrs: {
          property: 'og:url',
          content: 'https://scramble.takea.cafe',
        },
      },
      {
        tag: 'meta',
        attrs: {
          property: 'og:image',
          content: 'https://scramble.takea.cafe/preview.jpg',
        },
      },
      {
        tag: 'meta',
        attrs: {
          property: 'twitter:card',
          content: 'summary_large_image',
        },
      },
      {
        tag: 'meta',
        attrs: {
          property: 'twitter:url',
          content: 'https://scramble.takea.cafe',
        },
      },
      {
        tag: 'meta',
        attrs: {
          property: 'twitter:title',
          content: 'Scramble Word!',
        },
      },
      {
        tag: 'meta',
        attrs: {
          property: 'twitter:description',
          content: 'Guess the Chaos!',
        },
      },
      {
        tag: 'meta',
        attrs: {
          property: 'twitter:image',
          content: 'https://scramble.takea.cafe/preview.jpg',
        },
      },
      {
        tag: 'meta',
        attrs: {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
        },
      },
    ],
  },
})
