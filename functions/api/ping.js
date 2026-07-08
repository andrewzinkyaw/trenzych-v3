export async function onRequestGet() {

  const ping = {
    Singapore: Math.floor(Math.random() * 8) + 28,
    Japan: Math.floor(Math.random() * 10) + 65,
    USA: Math.floor(Math.random() * 15) + 170
  };

  return Response.json(ping, {
    headers: {
      "Cache-Control": "no-store"
    }
  });

}
