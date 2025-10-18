export async function onRequest({ request, params }) {
  const path = params.path ? params.path : "";
  const backendBase = "https://creator-hive-backend.onrender.com/api";
  const targetUrl = `${backendBase}/${path}`;
  return fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.method !== "GET" ? await request.text() : undefined,
    redirect: "manual",
  });
}
