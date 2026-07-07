export async function onRequestPost(context) {
  const { request, env } = context;

  const data = await request.json();

  await env.DB.prepare(
    `INSERT INTO vless_keys (title, country, config)
     VALUES (?, ?, ?)`
  )
    .bind(
      data.title,
      data.country,
      data.config
    )
    .run();

  return Response.json({
    success: true
  });
}
