export async function onRequestGet() {

  const sg = Math.floor(Math.random() * 8) + 28;
  const jp = Math.floor(Math.random() * 10) + 65;
  const us = Math.floor(Math.random() * 15) + 170;

  return Response.json({
    Singapore: sg,
    Japan: jp,
    USA: us,
    average: Math.round((sg + jp + us) / 3)
  });

}
