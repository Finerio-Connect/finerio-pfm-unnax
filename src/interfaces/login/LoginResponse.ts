export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  id: number;
  username: string;
  roles: string[];
  api_key: string;
}
