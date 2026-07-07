export async function onRequestGet({ env }) {

    try {

        const { results } = await env.DB.prepare(`
            SELECT
                id,
                title,
                country,
                type,
                config,
                is_premium
            FROM vless_keys
            ORDER BY id DESC
        `).all();

        return Response.json(results);

    } catch (err) {

        return Response.json({
            success: false,
            message: err.message
        });

    }

}
