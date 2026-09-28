import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url, locals }) => {
  const id = url.searchParams.get('id');
  if (!id) return new Response('ID ausente', { status: 400 });

  const KV = (locals.runtime.env as any).LISTAS_KV;
  const dados = await KV.get(id);

  if (!dados) return new Response('Lista não encontrada', { status: 444 });

  return new Response(dados, {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};