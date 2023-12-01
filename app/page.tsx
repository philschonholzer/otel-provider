import { NodeSdkLive } from '@/infra/tracing/NodeSdkLive'
import { Effect, flow } from 'effect'
import type { Metadata } from 'next/types'

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
      </main>
    )
  }).pipe(
    Effect.withSpan(`Render page 4`, {
      attributes: { slug: params.slug },
    })
  ) satisfies Effect.Effect<any, never, JSX.Element>
}

function generateMetadataEffect({ params, searchParams }: Props) {
  return Effect.succeed({
    title: 'Test using Otel',
    description: 'Using Otel in next.js with Effect',
  }).pipe(
    Effect.withSpan('Generate metadata for page 4', {
      attributes: { slug: params.slug },
    })
  ) satisfies Effect.Effect<any, never, Metadata>
}

const ContributorPage = flow(
  ContributorPageEffect,
  Effect.provide(NodeSdkLive),
  Effect.runPromise
)
export default ContributorPage

export const generateMetadata = flow(
  generateMetadataEffect,
  Effect.provide(NodeSdkLive),
  Effect.runPromise
)
