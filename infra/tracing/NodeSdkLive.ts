import { NodeSdk } from '@effect/opentelemetry'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { Config, ConfigSecret, Duration, Effect, Layer, Option } from 'effect'

export const NodeSdkLive = Layer.unwrapEffect(
  Effect.gen(function* ($) {
    const traceExporter = new OTLPTraceExporter({
      url: 'http://127.0.0.1:4318/v1/traces',
    })

    return NodeSdk.layer(() => ({
      resource: {
        serviceName: 'nextjs',
      },
      spanProcessor: new BatchSpanProcessor(traceExporter, {
        scheduledDelayMillis: Duration.toMillis('1 seconds'),
      }),
    }))
  })
)
