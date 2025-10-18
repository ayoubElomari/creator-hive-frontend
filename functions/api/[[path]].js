export async function onRequest({ request, params }) {
  const path = params.path ? params.path : ""; // catch-all
  const backendBase = "https://creator-hive-backend.onrender.com/api"; // <-- your backend URL
  const targetUrl = `${backendBase}/${path}`;

  // Proxy request to backend with headers preserved
  return fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.method !== "GET" ? await request.text() : undefined,
    redirect: "manual",
  });
}
