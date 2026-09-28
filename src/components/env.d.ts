/// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/cloudflare" />

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals {
    runtime: Runtime;
  }
}

interface Env {
  LISTAS_KV: KVNamespace;
}