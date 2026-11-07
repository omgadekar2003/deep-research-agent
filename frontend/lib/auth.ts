import { api, setTokens, clearTokens, getAccessToken } from "./api";
import { User } from "./types";

export async function loginUser(email: string, password: string): Promise<void> {
  const tokens = await api.login(email, password);
  setTokens(tokens.access_token, tokens.refresh_token);
}

export async function signupUser(
  email: string,
  password: string,
  fullName?: string
): Promise<void> {
  const tokens = await api.register(email, password, fullName);
  setTokens(tokens.access_token, tokens.refresh_token);
}

export async function logoutUser(): Promise<void> {
  await api.logout();
  clearTokens();
}

export async function getCurrentUser(): Promise<User | null> {
  if (!getAccessToken()) return null;
  try {
    return await api.me();
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return !!getAccessToken();
}