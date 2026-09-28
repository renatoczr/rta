import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  const body = await request.json();
  const id = 'rta_' + Date.now();

  // Pega a instância do KV da Cloudflare (configurado no painel)
  const KV = (locals.runtime.env as any).LISTAS_KV;

  // Salva na nuvem com validade (ex: expira em 30 dias)
  await KV.put(id, JSON.stringify(body), { expirationTtl: 60 * 60 * 24 * 30 });

  return new Response(JSON.stringify({ id }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};