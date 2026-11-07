export interface User {
  id: number;
  email: string;
  full_name: string | null;
  is_active: boolean;
  is_verified: boolean;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface ResearchRun {
  id: number;
  question: string;
  status: "pending" | "running" | "completed" | "failed";
  report_md: string | null;
  error: string | null;
  created_at: string;
  finished_at: string | null;
}

export interface ResearchRunSummary {
  id: number;
  question: string;
  status: "pending" | "running" | "completed" | "failed";
  created_at: string;
}

export interface SSEEvent {
  node: string;
  message?: string;
  sub_queries?: string[];
  count?: number;
  facts?: number;
  supported?: number;
  single?: number;
  contradicted?: number;
  decision?: string;
  length?: number;
  status?: string;
  run_id?: number;
  fatal?: boolean;
  errors?: { node: string; error: string; fatal: boolean }[];
}