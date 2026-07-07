export async function onRequestPost(context) {
  return Response.json({
    success: true,
    test: "API OK"
  });
}
