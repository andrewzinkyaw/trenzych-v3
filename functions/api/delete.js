export async function onRequestPost({ request, env }) {

    try {

        const body = await request.json();

        await env.DB.prepare(`
            DELETE FROM vless_keys
            WHERE id=?
        `)
        .bind(body.id)
        .run();

        return Response.json({
            success:true,
            message:"VPN Deleted Successfully!"
        });

    } catch(err){

        return Response.json({
            success:false,
            message:err.message
        });

    }

}
