import { apiPost } from './client'
import { ENDPOINTS } from './endpoints'

interface AuthResponse {
  token: string
  user: { id: string; email: string; name: string }
}

export const login = (payload: { email: string; password: string }) =>
  apiPost<AuthResponse>(ENDPOINTS.auth.login, payload)

export const register = (payload: { name: string; email: string; password: string }) =>
  apiPost<AuthResponse>(ENDPOINTS.auth.register, payload)

export const googleLogin = (googleToken: string) =>
  apiPost<AuthResponse>(ENDPOINTS.auth.googleLogin, { token: googleToken })
