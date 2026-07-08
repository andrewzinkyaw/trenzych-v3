export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    const body = await request.json();

    const username = (body.username || "").trim();
    const password = body.password || "";

    if (
      username === env.ADMIN_USER &&
      password === env.ADMIN_PASS
    ) {
      return Response.json({
        success: true,
        token: crypto.randomUUID(),
        message: "Login successful."
      });
    }

    return Response.json({
      success: false,
      message: "Invalid username or password."
    }, { status: 401 });

  } catch (err) {
    return Response.json({
      success: false,
      message: err.message
    }, { status: 500 });
  }
}
