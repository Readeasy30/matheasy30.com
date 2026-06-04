export function onRequest({ request }) {
  const url = new URL(request.url);
  url.pathname = '/app.html';
  return Response.redirect(url.toString(), 301);
}
