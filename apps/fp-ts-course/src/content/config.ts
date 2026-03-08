import { defineCollection, z } from 'astro:content'

const quizItem = z.object({
  question: z.string(),
  options: z.array(z.string()),
  correct: z.number(),
  explanation: z.string(),
})

const lessons = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    day: z.number(),
    description: z.string().optional(),
    quiz: z.array(quizItem).optional(),
  }),
})

export const collections = { lessons }
