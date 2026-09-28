import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  const body = await request.json();
  const id = 'rta_' + Date.now();

  // Acessa o ambiente do Cloudflare KV via locals
  const runtime = (locals as any).runtime;
  const LISTAS_KV = runtime?.env?.LISTAS_KV;

  if (!LISTAS_KV) {
    return new Response(JSON.stringify({ error: 'KV Namespace não encontrado' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Salva na nuvem com validade de 30 dias
  await LISTAS_KV.put(id, JSON.stringify(body), { expirationTtl: 60 * 60 * 24 * 30 });

  return new Response(JSON.stringify({ id }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};