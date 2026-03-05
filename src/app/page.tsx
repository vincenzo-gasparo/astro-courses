import { lessons } from '.velite'
import { ProgressBar } from '@/components/progress-bar'
import { DayCardList } from '@/components/day-card-list'

export default function Home() {
  const sorted = [...lessons].sort((a, b) => a.day - b.day)

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">fp-ts Course</h1>
      <p className="mb-8 text-zinc-500">15 structured days to confident functional TypeScript.</p>
      <ProgressBar total={sorted.length} />
      <DayCardList lessons={sorted} />
    </main>
  )
}
