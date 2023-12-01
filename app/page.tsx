import { fromEffect } from '@/lib/utils'
import { Effect, flow } from 'effect'
import type { Metadata } from 'next/types'
import { ModeToggle } from './_components/mode-toggle'

type Props = {
  params: {
    slug: string
  }
  searchParams: {
    logLevel?: string
  }
}

function ContributorPageEffect({ params, searchParams }: Props) {
  return Effect.gen(function* (_) {
    return (
      <main className="overflow-hidden">
        <h1>Use Opentelemetry</h1>
        <ModeToggle className="-my-2" />
      </main>
    )
  }).pipe(
    Effect.withSpan(`Render page 1`, {
      attributes: { slug: params.slug },
    })
  ) satisfies Effect.Effect<any, never, JSX.Element>
}

function generateMetadataEffect({ params, searchParams }: Props) {
  return Effect.succeed({
    title: 'Test using Otel',
    description: 'Using Otel in next.js with Effect',
  }).pipe(
    Effect.withSpan('Generate metadata for page 11', {
      attributes: { slug: params.slug },
    })
  ) satisfies Effect.Effect<any, never, Metadata>
}

const ContributorPage = fromEffect(ContributorPageEffect)
export default ContributorPage

export const generateMetadata = fromEffect(generateMetadataEffect)
