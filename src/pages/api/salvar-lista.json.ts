import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const id = 'rta_' + Date.now();

    const runtime = (locals as any).runtime;
    const LISTAS_KV = runtime?.env?.LISTAS_KV;

    if (!LISTAS_KV) {
      return new Response(
        JSON.stringify({ error: 'O namespace LISTAS_KV não foi encontrado no ambiente.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Salva no KV local/nuvem por 30 dias
    await LISTAS_KV.put(id, JSON.stringify(body), { expirationTtl: 60 * 60 * 24 * 30 });

    return new Response(JSON.stringify({ id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Erro interno no servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};