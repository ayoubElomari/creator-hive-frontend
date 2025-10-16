const BASE = __API_URL__;

export async function me() {
  const r = await fetch(`${BASE}/api/me`, { credentials: "include" });
  return r.json();
}

export async function loginWithEmail(email, password) {
  const res = await fetch(`${BASE}/api/login/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    return Promise.reject(new Error("Login failed"));
  }
  return await res.json();
}

export async function loginWithGoogle() {
  const res = await fetch(`${BASE}/api/login`, {
    credentials: "include",
  });

  if (!res.ok) {
    return Promise.reject(new Error("Login failed"));
  }
  return await res.json();
}

export async function logout() {
  await fetch(`${BASE}/api/logout`, {
    method: "POST",
    credentials: "include",
  });
  window.location.href = "/auth";
}
