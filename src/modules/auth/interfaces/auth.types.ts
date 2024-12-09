export interface UserSession {
    id: string;
    email: string;
    roles: string[];
    permissions?: string[];
    tokens: TokenPayload
  }
  
  export interface TokenPayload {
    accessToken: string;
    refreshToken: string;
  }
  export interface AuthError extends Error {
    code: string;
    status?: number;
  }