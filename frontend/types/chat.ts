export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  planner: string;
  architecture: string;
  database: string;
  api: string;
  folder: string;
  blueprint: string;
  readme: string;
  sql: string;
  package_json: string;
}

export interface ChatState {
  isLoading: boolean;
  error: string | null;
  response: ChatResponse | null;
}