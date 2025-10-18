export async function onRequest({ request, params }) {
  const backendUrl = `https://creator-hive-backend.onrender.com/api/${params.path.join(
    "/"
  )}`;

  // Proxy request while preserving headers + credentials
  return fetch(backendUrl, {
    method: request.method,
    headers: request.headers,
    body: request.method !== "GET" ? await request.blob() : undefined,
    redirect: "manual",
  });
}
