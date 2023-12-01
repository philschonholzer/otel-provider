import { NodeSdkLive } from '@/infra/tracing/NodeSdkLive'
import { Effect, flow } from 'effect'

export function cn(...inputs: string[]) {
  return inputs.join(' ')
}

export function fromEffect<P, A>(
  effect: (arg: P) => Effect.Effect<never, never, A>
) {
  return flow(effect, Effect.provide(NodeSdkLive), Effect.runPromise)
}
