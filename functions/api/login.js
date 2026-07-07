export async function onRequestPost(context) {
  const { request, env } = context;

  const data = await request.json();
  const password = data.password;

  const result = await env.DB.prepare(
    "SELECT password FROM admin LIMIT 1"
  ).first();

  if (!result) {
    return Response.json({
      success: false,
      message: "Admin password not found"
    });
  }

  if (password === result.password) {
    return Response.json({
      success: true
    });
  }

  return Response.json({
    success: false,
    message: "Wrong password"
  });
}
