export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const id = 'rta_' + Date.now();

    // Acessa o KV configurado no painel da Cloudflare
    const LISTAS_KV = context.env.LISTAS_KV;

    if (!LISTAS_KV) {
      return new Response(
        JSON.stringify({ error: 'Binding LISTAS_KV não encontrada no painel da Cloudflare.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Salva no KV por 30 dias
    await LISTAS_KV.put(id, JSON.stringify(body), { expirationTtl: 60 * 60 * 24 * 30 });

    return new Response(JSON.stringify({ id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}