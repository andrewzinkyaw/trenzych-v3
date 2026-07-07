export async function onRequestPost({ request, env }) {

    try {

        const body = await request.json();

        const {
            title,
            country,
            type,
            config,
            is_premium
        } = body;

        if (
            !title ||
            !country ||
            !type ||
            !config
        ) {

            return Response.json({
                success: false,
                message: "All fields are required."
            });

        }

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
            Number(is_premium)
        )
        .run();

        return Response.json({
            success: true,
            message: "VPN Saved Successfully!"
        });

    } catch (err) {

        return Response.json({
            success: false,
            message: err.message
        });

    }

}
