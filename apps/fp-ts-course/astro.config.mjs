import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
import expressiveCode from 'astro-expressive-code'

const base = process.env.CI ? '/fp-ts-course' : ''

export default defineConfig({
  output: 'static',
  base,
  integrations: [
    expressiveCode({
      themes: ['one-dark-pro'],
    }),
    mdx(),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
