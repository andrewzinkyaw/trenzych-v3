export async function onRequestPost({ request, env }) {

    try {

        const body = await request.json();

        const { id } = body;

        if (!id) {

            return Response.json({
                success: false,
                message: "VPN ID is required."
            });

        }

        await env.DB.prepare(`
            DELETE FROM vless_keys
            WHERE id = ?
        `)
        .bind(Number(id))
        .run();

        return Response.json({
            success: true,
            message: "VPN Deleted Successfully!"
        });

    } catch (err) {

        return Response.json({
            success: false,
            message: err.message
        });

    }

}
