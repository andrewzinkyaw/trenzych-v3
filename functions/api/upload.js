export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();

    const { title, country, type, config } = data;

    if (!title || !country || !type || !config) {
      return Response.json({
        success: false,
        message: "All fields are required"
      });
    }

    await env.DB.prepare(`
      INSERT INTO vless_keys
      (title, country, type, config, is_premium)
      VALUES (?, ?, 'VLESS', ?, ?)
    `)
    .bind(
      title,
      country,
      config,
      type === "Premium" ? 1 : 0
    )
    .run();

    return Response.json({
      success: true,
      message: "VLESS Key Uploaded Successfully"
    });

  } catch (e) {
    return Response.json({
      success: false,
      message: e.message
    });
  }
}
