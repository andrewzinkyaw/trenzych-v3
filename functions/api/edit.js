export async function onRequestPost({ request, env }) {

    try {

        const body = await request.json();

        const {
            id,
            title,
            country,
            type,
            config,
            is_premium
        } = body;

        if (
            !id ||
            !title ||
            !country ||
            !type ||
            !config
        ) {

            return Response.json({
                success: false,
                message: "Missing required fields."
            });

        }

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
            Number(is_premium),
            Number(id)
        )
        .run();

        return Response.json({
            success: true,
            message: "VPN Updated Successfully!"
        });

    } catch (err) {

        return Response.json({
            success: false,
            message: err.message
        });

    }

}
