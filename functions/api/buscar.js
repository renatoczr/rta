export async function onRequestGet(context) {
  try {
    const url = new URL(context.request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'ID não informado.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const LISTAS_KV = context.env.LISTAS_KV;

    if (!LISTAS_KV) {
      return new Response(
        JSON.stringify({ error: 'Binding LISTAS_KV não encontrada no painel.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const dadosStr = await LISTAS_KV.get(id);

    if (!dadosStr) {
      return new Response(
        JSON.stringify({ error: 'Lista não encontrada ou expirada.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(dadosStr, {
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