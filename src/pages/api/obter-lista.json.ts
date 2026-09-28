import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url, locals }) => {
  const id = url.searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ error: 'ID não fornecido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const runtime = (locals as any).runtime;
  const LISTAS_KV = runtime?.env?.LISTAS_KV;

  if (!LISTAS_KV) {
    return new Response(JSON.stringify({ error: 'KV Namespace não encontrado' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const dados = await LISTAS_KV.get(id);

  if (!dados) {
    return new Response(JSON.stringify({ error: 'Lista não encontrada' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(dados, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};