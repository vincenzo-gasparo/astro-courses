// Source: https://velite.js.org/guide/using-mdx
import * as runtime from 'react/jsx-runtime'

export function getMDXComponent(code: string) {
  const fn = new Function(code)
  return fn({ ...runtime }).default as React.ComponentType<{ components?: Record<string, React.ComponentType<any>> }>
}
