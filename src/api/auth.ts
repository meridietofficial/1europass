import { apiPost } from './client'
import { ENDPOINTS } from './endpoints'

export interface AuthUser {
  id: string
  full_name: string
  email: string
  phone_code: string | null
  phone_number: string | null
  is_email_verified: boolean
  is_active: boolean
  profile_picture: string | null
  country: string | null
  state: string | null
  city: string | null
  dob: string | null
  language: string | null
  role: string
  created_at: string
}

interface AuthApiResponse {
  success: boolean
  message: string
  data: {
    token: string
    user: AuthUser
  }
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  full_name: string
  email: string
  password: string
  phone_code: string
  phone_number: string
  country: string
  state: string
  city: string
}

export const login = async (payload: LoginPayload) => {
  const res = await apiPost<AuthApiResponse>(ENDPOINTS.auth.login, payload)
  return res.data
}

export const register = async (payload: RegisterPayload) => {
  const res = await apiPost<AuthApiResponse>(ENDPOINTS.auth.register, payload)
  return res.data
}

export const googleLogin = async (googleToken: string) => {
  const res = await apiPost<AuthApiResponse>(ENDPOINTS.auth.googleLogin, { token: googleToken })
  return res.data
}
