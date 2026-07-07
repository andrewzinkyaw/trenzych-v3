export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    const data = await request.json();

    return Response.json({
      success: true,
      received: data,
      dbExists: !!env.DB
    });

  } catch (e) {
    return Response.json({
      success: false,
      error: e.toString()
    });
  }
}
