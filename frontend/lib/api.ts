import { TokenResponse, User, ResearchRun, ResearchRunSummary } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const ACCESS_KEY = "dr_access_token";
const REFRESH_KEY = "dr_refresh_token";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_KEY);
}

export function setTokens(access: string, refresh: string) {
  localStorage.setItem(ACCESS_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

async function refreshAccessToken(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  try {
    const r = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refresh }),
    });
    if (!r.ok) {
      clearTokens();
      return null;
    }
    const tokens: TokenResponse = await r.json();
    setTokens(tokens.access_token, tokens.refresh_token);
    return tokens.access_token;
  } catch {
    clearTokens();
    return null;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  retry = true
): Promise<T> {
  const token = getAccessToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const r = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (r.status === 401 && retry) {
    const newToken = await refreshAccessToken();
    if (newToken) return request<T>(path, options, false);
    clearTokens();
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new Error("Session expired");
  }

  if (!r.ok) {
    const text = await r.text();
    let detail = text;
    try {
      const j = JSON.parse(text);
      detail = typeof j.detail === "string" ? j.detail : JSON.stringify(j.detail);
    } catch {}
    throw new Error(detail || `Request failed: ${r.status}`);
  }

  if (r.status === 204) return undefined as T;
  return r.json();
}

export const api = {
  register: (email: string, password: string, full_name?: string) =>
    request<TokenResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, full_name }),
    }),

  login: (email: string, password: string) =>
    request<TokenResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  me: () => request<User>("/auth/me"),

  logout: async () => {
    const refresh = getRefreshToken();
    if (refresh) {
      try {
        await request("/auth/logout", {
          method: "POST",
          body: JSON.stringify({ refresh_token: refresh }),
        });
      } catch {}
    }
    clearTokens();
  },

  startResearch: (question: string) =>
    request<ResearchRun>("/research/start", {
      method: "POST",
      body: JSON.stringify({ question }),
    }),

  getRun: (id: number) => request<ResearchRun>(`/research/${id}`),

  history: (limit = 20) =>
    request<ResearchRunSummary[]>(`/research/history?limit=${limit}`),

  streamUrl: (id: number) => `${API_URL}/research/${id}/stream`,

  pdfUrl: (id: number) => `${API_URL}/research/${id}/pdf`,
};

export { API_URL };