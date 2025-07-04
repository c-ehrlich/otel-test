import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource, resourceFromAttributes } from "@opentelemetry/resources";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";

console.log("tktk vars", {
  AXIOM_URL: process.env.AXIOM_URL,
  AXIOM_TOKEN: process.env.AXIOM_TOKEN,
  AXIOM_DATASET: process.env.AXIOM_DATASET,
});

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: "next-app",
  }) satisfies Resource,
  // spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter()),
  spanProcessor: new SimpleSpanProcessor(
    new OTLPTraceExporter({
      url: `${process.env.AXIOM_URL}/v1/traces`,
      headers: {
        Authorization: `Bearer ${process.env.AXIOM_TOKEN}`,
        "X-Axiom-Dataset": process.env.AXIOM_DATASET!,
      },
    })
  ),
});
sdk.start();
