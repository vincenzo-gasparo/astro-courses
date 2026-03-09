import type { AstroIntegration } from 'astro'

export interface CourseConfig {
  title: string
  description?: string
  storageKey: string
}

export function courseIntegration(config: CourseConfig): AstroIntegration {
  const virtualModuleId = 'virtual:course-config'
  const resolvedId = '\0' + virtualModuleId

  return {
    name: '@courses/ui',
    hooks: {
      'astro:config:setup': ({ injectRoute, updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [
              {
                name: 'virtual-course-config',
                resolveId(id) {
                  if (id === virtualModuleId) return resolvedId
                },
                load(id) {
                  if (id === resolvedId) {
                    return `export default ${JSON.stringify(config)}`
                  }
                },
              },
            ],
          },
        })

        injectRoute({
          pattern: '/',
          entrypoint: '@courses/ui/pages/index.astro',
        })

        injectRoute({
          pattern: '/lessons/[slug]',
          entrypoint: '@courses/ui/pages/lesson.astro',
        })
      },
    },
  }
}
