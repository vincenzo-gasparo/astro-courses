import Link from 'next/link'
import { ThemeProvider } from './theme-provider'
import { ThemeToggle } from './theme-toggle'
import { ProgressProvider } from './progress-provider'

interface Props {
  title: string
  storageKey: string
  fontClassName?: string
  children: React.ReactNode
}

export function CourseLayout({ title, storageKey, fontClassName, children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontClassName ?? ''} antialiased bg-white dark:bg-zinc-900`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ProgressProvider storageKey={storageKey}>
            <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-zinc-900">
              <Link href="/" className="font-semibold text-lg">
                {title}
              </Link>
              <ThemeToggle />
            </header>
            {children}
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
