export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();

    const title = data.title;
    const country = data.country;
    const config = data.config;
    const is_premium = data.is_premium ? 1 : 0;

    if (!title || !country || !config) {
      return Response.json({
        success: false,
        message: "Missing fields"
      });
    }

    await env.DB.prepare(
      `INSERT INTO vless_keys
      (title, country, config, is_premium)
      VALUES (?, ?, ?, ?)`
    )
      .bind(title, country, config, is_premium)
      .run();

    return Response.json({
      success: true,
      message: "Key uploaded successfully"
    });

  } catch (e) {
    return Response.json({
      success: false,
      message: e.message
    });
  }
}
