'use client'
import { useState } from 'react'

interface QuizItem {
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface QuizProps {
  items: QuizItem[]
}

export function Quiz({ items }: QuizProps) {
  const [chosen, setChosen] = useState<(number | null)[]>(items.map(() => null))

  function choose(qIdx: number, oIdx: number) {
    setChosen((prev) => {
      if (prev[qIdx] !== null) return prev
      const next = [...prev]
      next[qIdx] = oIdx
      return next
    })
  }

  return (
    <section aria-label="Quiz" className="mt-12 space-y-8 border-t pt-8">
      {items.map((item, qIdx) => {
        const answeredWith = chosen[qIdx]
        const isAnswered = answeredWith !== null

        return (
          <div key={qIdx}>
            <p className="mb-3 font-medium">{item.question}</p>
            <div className="space-y-2">
              {item.options.map((option, oIdx) => {
                const isCorrect = oIdx === item.correct
                let variant: 'default' | 'correct' | 'wrong' = 'default'
                if (isAnswered) {
                  if (isCorrect) {
                    variant = 'correct'
                  } else if (oIdx === answeredWith) {
                    variant = 'wrong'
                  }
                }

                return (
                  <button
                    key={oIdx}
                    data-variant={variant}
                    data-correct={isCorrect ? 'true' : 'false'}
                    onClick={() => choose(qIdx, oIdx)}
                    className="w-full text-left rounded border px-4 py-2 transition
                      data-[variant=default]:border-zinc-300 data-[variant=default]:hover:bg-zinc-100
                      data-[variant=correct]:border-green-500 data-[variant=correct]:bg-green-50 data-[variant=correct]:text-green-800
                      data-[variant=wrong]:border-red-500 data-[variant=wrong]:bg-red-50 data-[variant=wrong]:text-red-800
                      dark:data-[variant=default]:border-zinc-600 dark:data-[variant=default]:hover:bg-zinc-800
                      dark:data-[variant=correct]:border-green-500 dark:data-[variant=correct]:bg-green-950 dark:data-[variant=correct]:text-green-200
                      dark:data-[variant=wrong]:border-red-500 dark:data-[variant=wrong]:bg-red-950 dark:data-[variant=wrong]:text-red-200"
                  >
                    {option}
                  </button>
                )
              })}
            </div>
            {isAnswered && (
              <p data-testid="explanation" className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                {item.explanation}
              </p>
            )}
          </div>
        )
      })}
    </section>
  )
}
