export interface UserSession {
  user: User
  tokens: Tokens
}

export interface User {
  id: string
  email: string
}

export interface Tokens {
  token: Token
  refreshToken: RefreshToken
}

export interface Token {
  token: string
  expiresIn: string
}

export interface RefreshToken {
  token: string
  expiresIn: string
}

export interface AuthError extends Error {
  code: string;
  status?: number;
}