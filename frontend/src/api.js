// src/api.js
const BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function api(path) {
  const res = await fetch(BASE + path);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export async function apiRaw(path, options) {
  const res = await fetch(BASE + path, options);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }
  try { return await res.json(); } catch { return {}; }
}
