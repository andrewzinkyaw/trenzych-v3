export async function onRequestPost(context) {
  const { request, env } = context;

  const { id, title, country, type, config, is_premium } =
    await request.json();

  await env.DB.prepare(`
    UPDATE vless_keys
    SET title=?, country=?, type=?, config=?, is_premium=?
    WHERE id=?
  `)
  .bind(title, country, type, config, is_premium, id)
  .run();

  return Response.json({
    success: true,
    message: "Key Updated!"
  });
}
