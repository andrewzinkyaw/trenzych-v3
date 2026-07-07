export async function onRequestGet(context) {
  const { env } = context;

  const { results } = await env.DB.prepare(
    "SELECT * FROM vless_keys ORDER BY id DESC"
  ).all();

  return Response.json(results);
}
