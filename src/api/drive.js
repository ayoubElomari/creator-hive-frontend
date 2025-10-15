const BASE = __API_URL__;

export async function fetchFiles({ date = null }) {
  const res = await fetch(`${BASE}/api/list-files?date=${date}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Not authorized or something failed.");
  const data = await res.json();
  return data;
}

export async function fetchVideos({ date = null }) {
  const res = await fetch(`${BASE}/api/videos?date=${date}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Not authorized or something failed.");
  return await res.json();
}
