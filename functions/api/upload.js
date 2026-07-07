export async function onRequestPost(context) {

    const { request, env } = context;

    const body = await request.json();

    const {
        title,
        country,
        type,
        config,
        is_premium
    } = body;

    await env.DB.prepare(`
        INSERT INTO vless_keys
        (
            title,
            country,
            type,
            config,
            is_premium
        )
        VALUES
        (?, ?, ?, ?, ?)
    `)
    .bind(
        title,
        country,
        type,
        config,
        is_premium
    )
    .run();

    return Response.json({
        success: true,
        message: "VPN Saved Successfully!"
    });

}
