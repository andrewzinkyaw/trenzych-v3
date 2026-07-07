export async function onRequestPost(context) {

    const { request, env } = context;

    const body = await request.json();

    const {
        id,
        title,
        country,
        type,
        config,
        is_premium
    } = body;

    await env.DB.prepare(`
        UPDATE vless_keys
        SET
            title = ?,
            country = ?,
            type = ?,
            config = ?,
            is_premium = ?
        WHERE id = ?
    `)
    .bind(
        title,
        country,
        type,
        config,
        is_premium,
        id
    )
    .run();

    return Response.json({
        success: true,
        message: "Key Updated Successfully!"
    });

}
