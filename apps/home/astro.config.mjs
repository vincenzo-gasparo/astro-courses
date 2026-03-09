import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

const base = process.env.CI ? '/astro-courses/' : '/'

export default defineConfig({
  output: 'static',
  base,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
})
